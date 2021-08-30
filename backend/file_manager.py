import ftplib
username = ""
password = ""
storage_dir = "storage:4500/episodes"


def send_file(filename, file):
    session = ftplib.FTP(storage_dir, 'USERNAME', 'PASSWORD')
    file = open(filename, 'rb')
    session.storbinary('STOR ' + filename, file)
    file.close()
    session.quit()


def get_file(filename):
    session = ftplib.FTP(storage_dir, 'USERNAME', 'PASSWORD')
    file = session.retrbinary('RETR ' + filename)
    file.close()
    session.quit()
