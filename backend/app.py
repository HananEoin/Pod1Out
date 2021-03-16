from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS

from sql_manager import *
from dict_helper import *
import json
app = Flask(__name__)
cors = CORS(app)


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
def get_audio_files(episode_id):
    user_audio = get_user_audio_for_episode(episode_id)
    main_audio = get_episode_with_epid(episode_id)
    audio_dict = audio_to_dict(user_audio, main_audio)
    print(audio_dict)
    return json_response(audio_dict)


# @app.route('/audio/master/<int:user_id>', methods=['POST'])
# @cross_origin()
# def make_audio(user_id):
#     print(request.files.get('recording.mp3'))
#     print(request.files)
#
#     print(request)
#
#     return str(0)


@app.route('/audio/<int:user_id>', methods=['POST'])
@cross_origin()
def make_audio(user_id):
    # print(type(request.json))
    print("Posted file: {}".format(request.files))

    return str(0)


def check_notification(user_id):
    return "Working"


def invite_user(to_id, from_id):
    return "Working"


def json_response(payload, status=200):
    return json.dumps(payload), status, {'content-type': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
