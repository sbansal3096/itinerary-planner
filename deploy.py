from flask import Flask, render_template, request, jsonify
from threading import Thread
from DetectEmotion import func
from graph import grph

app = Flask(__name__)

@app.route('/',methods=['POST','GET'])
def main():
    thread1=Thread(target=flaskThread,args=())
    thread1.start()
    return render_template("index.html")

@app.route('/background',methods=['POST','GET'])
def a():
    if request.method == 'GET':
        print(val)
        data = request.args.get('data')
        print (data)
        return jsonify({})

@app.route('/plan',methods=['GET','POST'])
def b():
    if request.method=='GET':
        data=request.args.get('data')
        print(data)
        res=grph([0,1,2,3,4])
        return render_template("dir.html",fixedpts=res['fixedpts'],waypts=res['waypts'])
    else:
        data=request.get_json()
        print(data['val'])
        res=grph([0,1,2,3,4])
        return render_template("dir.html",fixedpts=res['fixedpts'],waypts=res['waypts'])

def flaskThread():
    func()

@app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)


    if(req.get("result").get("action")=="ask_time"):

        param=req.get("result").get("parameters")
        #budget
        print(param['unit-currency']['amount'])
    elif(req.get("result").get("action")=="thank"):
        param=req.get("result").get("parameters")
        #time
        print(param['duration']['amount'])
    res = {}

    res = json.dumps(res, indent=4)
    # print(res)
    r = make_response(res)
    r.headers['Content-Type'] = 'application/json'
    return r



if __name__ == '__main__':
   app.run(debug=False)
