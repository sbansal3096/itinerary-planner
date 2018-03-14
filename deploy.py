from flask import Flask, render_template, request, jsonify
from threading import Thread
app = Flask(__name__)

val='1'

@app.route('/',methods=['POST','GET'])
def main():
    return render_template("index.html")

@app.route('/background',methods=['POST','GET'])
def a():
    if request.method == 'GET':
        print(val)
        data = request.args.get('data')
        print (data)
        return jsonify({})

def flaskThread(a):
    global val
    for i in range(1,5):
        val='2';
        print(a)


if __name__ == '__main__':
   thread1=Thread(target=flaskThread,args=(val))
   thread1.start()
   app.run(debug=False)
