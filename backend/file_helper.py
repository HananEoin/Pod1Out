import ftplib
# TODO get file location, USERNAME and PASSWORD
temp_dir = "/home/eoin/Programming/Thesis/backend/audio"
storage_dir = "/home/eoin/Programming/Thesis/backend/audio"


def move_file(filename, foldername):
    session = ftplib.FTP(storage_dir + '/' + foldername, 'USERNAME', 'PASSWORD')
    file = open(filename, 'rb')  # file to send
    session.storbinary('STOR ' + filename, file)  # send the file
    file.close()  # close file and FTP
    session.quit()
