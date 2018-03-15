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
        res=grph([0,1,2,3,4])
        return render_template("dir.html",fixedpts=res['fixedpts'],waypts=res['waypts'])

def flaskThread():
    func()



if __name__ == '__main__':
   app.run(debug=False)
