from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from json import dumps
import json

app = Flask(__name__)
api = Api(app)
CORS(app)


@app.route('/')
def index():
    return jsonify('Software effort Estimation Tool - Flask backEnd is working properly')

@app.route('/setTotalStoryPoint', methods=['POST'])
def setTotalStoryPoint():
    req = json.loads(request.data.decode())
    print(req)

    return jsonify('sucess')


if __name__ == '__main__':
    app.run(debug=True)