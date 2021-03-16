import mysql.connector


def check_login(username, password):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from User where name = %s AND password = %s;"
    db_cursor.execute(statement, (username, password, ))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_friends_for_user(user_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from User join Friend_Relationship on user2_ID = User.id where user1_ID = %s;"
    db_cursor.execute(statement, (user_id,))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_squad_for_user(user_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from Squad join Squad_User SU on Squad.ID = SU.squad_ID where user_ID = %s;"
    db_cursor.execute(statement, (user_id, ))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_episodes_for_user(user_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from Episode inner join User_Episode_Audio EUR on Episode.ID" \
                " = EUR.episode_id where user_id = %s;"
    db_cursor.execute(statement, (user_id,))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_episode_with_epid(episode_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from Episode where id = %s"
    db_cursor.execute(statement, (episode_id,))
    db_result = db_cursor.fetchone()
    # db_cursor.close()
    return db_result


def make_new_audio_track(audio_track):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "INSERT into Episode_User_Relationship (user_id, episode_id, location) values (%s,%s,%s)"
    db_cursor.execute(statement, (audio_track.user_id, audio_track.episode_id, audio_track.location,))
    db_cursor.close()


def make_new_episode(episode):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "INSERT into Episode_User_Relationship (user_id, episode_id, location) values (%s,%s,%s)"
    db_cursor.execute(statement, (episode.name, episode.record_date, episode.file_location, episode.participants))
    db_cursor.close()


def get_user_audio_for_episode(episode_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='user1',
                                   password='Password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from User_Episode_Audio join User on User_Episode_Audio.user_id = User.ID where episode_id = %s;"
    db_cursor.execute(statement, (episode_id,))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result
