import pymysql.cursors

connection = pymysql.connect(host='mysql-controller.thesis.svc.cluster.local',
                             user='root',
                             password='',
                             database='pod1out',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


def test_get():
    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT * FROM `User`"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
