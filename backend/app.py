import os

from flask import Flask, jsonify, request, send_from_directory, flash, request, redirect, url_for
from flask_cors import cross_origin, CORS
from werkzeug.utils import secure_filename

from sql_manager import *
from dict_helper import *
from file_helper import *
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


@app.route('/friends/<int:user_id>', methods=['GET'])
@cross_origin()
def get_friends(user_id):
    users = get_friends_for_user(user_id)
    users_dict = users_to_dict(users)
    return json_response(users_dict)


@app.route('/squads/<int:user_id>', methods=['GET'])
@cross_origin()
def get_squad(user_id):
    squads = get_squad_for_user(user_id)
    squads_dict = squads_to_dict(squads)
    return json_response(squads_dict)


@app.route('/episode/<int:episode_id>', methods=['GET'])
@cross_origin()
def get_episode(episode_id):
    episode = get_episode_with_epid(episode_id)
    episode_dict = episode_to_dict(episode)
    return json_response(episode_dict)


@app.route('/episodes/<int:user_id>', methods=['GET'])
@cross_origin()
def get_episodes(user_id):
    episodes = get_episodes_for_user(user_id)
    episodes_dict = episodes_to_dict(episodes)
    return json_response(episodes_dict)


@app.route('/episode/audio/<int:episode_id>', methods=['GET'])
@cross_origin()
def get_audio_info(episode_id):
    user_audio = get_user_audio_for_episode(episode_id)
    main_audio = get_episode_with_epid(episode_id)
    audio_dict = audio_to_dict(user_audio, main_audio)
    return json_response(audio_dict)


@app.route('/episode/audio/file/<string:audio_location>', methods=['GET'])
@cross_origin()
def get_audio_file(audio_location):
    audio_name = "test.mp3"

    #TODO Make particular file

    try:
        return send_from_directory(app.config["CLIENT_AUDIO"], filename=audio_name, as_attachment=True)
    except FileNotFoundError:
        os.abort(404)

# @app.route('/audio/master/<int:user_id>', methods=['POST'])
# @cross_origin()
# def make_audio(user_id):
#     print(request.files.get('recording.mp3'))
#     print(request.files)
#
#     print(request)
#
#     return str(0)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/audio', methods=['POST'])
@cross_origin()
def make_user_audio():
    # Taking input
    user_id = request.args.get('user_id')
    episode_id = request.args.get('episode_id')

    # Saving File
    saved_file = request.files['audio']
    saved_file.save(os.path.join(uploads_dir, secure_filename(saved_file.filename)))

    # Transfer file to
    # Add file details to database

    # Create in Database
    create_user_audio_for_episode(user_id, episode_id)

    return json_response("File saved")


def check_notification(user_id):
    return "Working"


def invite_user(to_id, from_id):
    return "Working"


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
