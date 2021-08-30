import mysql.connector


def check_login(username, password):
    conn = mysql.connector.connect(host="localhost",
                                   user='poduser',
                                   password='password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from User where name = %s AND password = %s;"
    db_cursor.execute(statement, (username, password, ))
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_all_episodes():
    conn = mysql.connector.connect(host="localhost",
                                   user='poduser',
                                   password='password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from Episode"
    db_cursor.execute(statement, ())
    db_result = db_cursor.fetchall()
    db_cursor.close()
    return db_result


def get_episode_with_epid(episode_id):
    conn = mysql.connector.connect(host="localhost",
                                   user='poduser',
                                   password='password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "select * from Episode where id = %s"
    db_cursor.execute(statement, (episode_id,))
    db_result = db_cursor.fetchone()
    db_cursor.close()
    return db_result


def make_new_episode(episode):
    conn = mysql.connector.connect(host="localhost",
                                   user='poduser',
                                   password='password',
                                   database='pod1out',
                                   auth_plugin='mysql_native_password')
    db_cursor = conn.cursor()
    statement = "INSERT into Episode (record_date, length, file_location) values (%s,%s,%s)"
    db_cursor.execute(statement, (episode.record_date, episode.length, episode.file_location, ))
    db_cursor.close()

