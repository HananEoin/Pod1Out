def user_to_dict(user):
    user_dict = {
        'id': str(user[0]),
        'name': user[1],
        'location': user[3]
    }
    return user_dict


def users_to_dict(users):
    user_dict_list = []
    for user in users:
        user_dict = {
            'id': str(user[0]),
            'name': user[1],
            'location': user[3]
        }
        user_dict_list.append(user_dict)

    return {'users': user_dict_list}


def episodes_to_dict(episodes):
    episode_dict_list = []
    for episode in episodes:
        episode_dict = {
            'id': str(episode[0]),
            'name': episode[1],
            'record_date': episode[2].strftime("%m/%d/%Y, %H:%M:%S"),
            'file_location': str(episode[3]),
            'participants': episode[4],
        }
        episode_dict_list.append(episode_dict)

    return {'episodes': episode_dict_list}


def episode_to_dict(episode):
    episode_dict = {
        'id': str(episode[0]),
        'name': episode[1],
        'record_date': episode[2].strftime("%m/%d/%Y, %H:%M:%S"),
        'file_location': str(episode[3]),
        'participants': episode[4],
    }
    return {'episode': episode_dict}


def audio_to_dict(user_audio, episode):
    audio_dict_list = []
    audio_dict = {
        'id': 0,
        'name': 'Main',
        'file_location': str(episode[3])
    }
    audio_dict_list.append(audio_dict)
    for audio in user_audio:
        audio_dict = {
            'id': str(audio[0]),
            'name': str(audio[5]),
            'file_location': str(audio[4])
        }
        audio_dict_list.append(audio_dict)

    return {'audio': audio_dict_list}


def squads_to_dict(squads):
    squads_dict_list = []
    for squad in squads:
        squads_dict = {
            'id': squad[0],
            'name': squad[1],
            'image_location': str(squad[2])
        }
        squads_dict_list.append(squads_dict)
    return {'squads': squads_dict_list}