import os
from flask.helpers import url_for
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage


class Utils():
    def __init__(self, app) -> None:
        self.app = app

    def uploadImage(self, img : FileStorage, filename : str) -> str:
        filename = secure_filename(filename)
        print(type(img))
        img.save(os.path.join(self.app.config['UPLOAD_FOLDER_IMAGE'], filename))
        url = url_for('uploaded_img', imgname=filename)
        print(url)
        return url

    def uploadVideo(self, video : FileStorage, filename : str) -> str:
        filename = secure_filename(filename)
        print(type(video))
        video.save(os.path.join(self.app.config['UPLOAD_FOLDER_VIDEO'], filename))
        url = url_for('uploaded_video', videoname=filename)
        print(url)
        return url
     