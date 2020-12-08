from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from json import dumps
import json
import pandas as pd

app = Flask(__name__)
api = Api(app)
CORS(app)



@app.route('/')
def index():
    return jsonify('Software effort Estimation Tool - Flask backEnd is working properly')

@app.route('/setTotalStoryPoint', methods=['POST'])
def set_storypoint():
    req = json.loads(request.data.decode())
    print(req)
    total_story_point = req['storyPoint']

    dataset=pd.read_csv("DataSources/data.csv")
    print(dataset)
    x=dataset.iloc[:,1:-1].values
    y=dataset.iloc[:,2:].values

    from sklearn.preprocessing import StandardScaler
    sc=StandardScaler()
    x=sc.fit_transform(x)
    sc_y=StandardScaler()
    y=sc_y.fit_transform(y)

    y = y.ravel()
    from sklearn.svm import SVR
    r=SVR(kernel="rbf")
    r.fit(x,y)

    estimated_time = sc_y.inverse_transform(r.predict(sc.transform([[total_story_point]])))

    return jsonify(round(estimated_time[0].item()))

@app.route('/setCostDrivers', methods=['POST'])
def set_cost_drivers():
    req = json.loads(request.data.decode())
    print(req)

    costs = []
    for i in req:
        costs.append(req[i])

    team_salary = costs[0]
    cost_driver = 0 
    for i in costs:
        cost_driver = cost_driver + (i/team_salary)

    return jsonify(round(cost_driver, 2))

@app.route('/getPrediction', methods=['POST'])
def get_prediction():
    req = json.loads(request.data.decode())
    print(req)

    estimated_time = req['estimatedTime']
    cost_driver = req['costDriver']
    team_salary = req['teamSalary']

    estimated_cost = estimated_time*cost_driver*team_salary

    return jsonify(round(estimated_cost,2))


if __name__ == '__main__':
    app.run(debug=True)