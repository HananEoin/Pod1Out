import os

from flask import Flask, jsonify, request, send_from_directory, flash, request, redirect, url_for
from flask_cors import cross_origin, CORS
from werkzeug.utils import secure_filename

from sql_manager import *
from dict_helper import *
from file_manager import *
import json
app = Flask(__name__)
cors = CORS(app)
app.config["CLIENT_AUDIO"] = "/home/eoin/Programming/Thesis/backend/audio"

uploads_dir = "/home/eoin/Programming/Thesis/backend/audio"


UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    response = check_login(username, password)

    if not response:
        return json_response([(-1, 'NoUser', 'empty')])

    user = response[0]

    user_dict = user_to_dict(user)
    return json_response(user_dict)


@app.route('/episode/<int:episode_id>', methods=['GET'])
@cross_origin()
def get_episode(episode_id):
    episode = get_episode_with_epid(episode_id)
    episode_dict = episode_to_dict(episode)
    return json_response(episode_dict)


@app.route('/episode/', methods=['GET'])
@cross_origin()
def get_episodes():
    episodes = get_all_episodes();
    episodes_dict = episodes_to_dict(episodes)
    return json_response(episodes_dict)


@app.route('/episode/audio/file/<string:audio_location>', methods=['GET'])
@cross_origin()
def get_audio_file(audio_location):
    file = get_file(audio_location)

    return json_response(file)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/audio/<string:audio_location>', methods=['POST'])
@cross_origin()
def make_audio(audio_location, file):
    user_id = request.args.get('user_id')
    episode_id = request.args.get('episode_id')

    send_file(file, audio_location)

    make_new_episode(user_id, episode_id)

    return json_response("File saved")


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
