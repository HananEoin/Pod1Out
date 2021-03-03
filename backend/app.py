from flask import Flask, jsonify
from sql_manager import *
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello WAP'

#
# @app.route('/check')
# def check_db():
#     return test_get()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
