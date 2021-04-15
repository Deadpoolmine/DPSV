
from typing import Tuple
import json
import datetime

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    elif isinstance(o, datetime.timedelta):
        return o.total_seconds()
		
class BaseDBObject(object):
    def __init__(self) -> None:
        pass
    
    def __repr__(self) -> str:
        return "< Base DB OBject " + str(self.__class__) + " >"

    def toJson(self):
        return json.dumps(self.__dict__, ensure_ascii=False, default=default)

class Bgm(BaseDBObject): 
	def __init__(self, bgm: Tuple) -> None: 
		super().__init__()
		self.bgm_id = bgm[0]
		self.bgmgenre_id = bgm[1]
		self.bgm_title = bgm[2]
		self.bgm_src = bgm[3]
		self.bgm_duration = bgm[4]
		self.bgm_author = bgm[5]

class BgmGenre(BaseDBObject): 
	def __init__(self, bgmgenre: Tuple) -> None: 
		super().__init__()
		self.bgmgenre_id = bgmgenre[0]
		self.bgmgenre_name = bgmgenre[1]
		self.bgmgenre_description = bgmgenre[2]

class Comment(BaseDBObject): 
	def __init__(self, comment: Tuple) -> None: 
		super().__init__()
		self.comment_id = comment[0]
		self.video_id = comment[1]
		self.user_id = comment[2]
		self.comment_content = comment[3]
		self.comment_date = comment[4]
		self.comment_time = comment[5]
		self.comment_reply_cnt = comment[6]

class Favorites(BaseDBObject): 
	def __init__(self, favorites: Tuple) -> None: 
		super().__init__()
		self.id = favorites[0]
		self.user_id = favorites[1]
		self.video_id = favorites[2]
		self.favorites_time = favorites[3]
		self.favorites_date = favorites[4]

class Follow(BaseDBObject): 
	def __init__(self, follow: Tuple) -> None: 
		super().__init__()
		self.id = follow[0]
		self.user_id = follow[1]
		self.follow_user_id = follow[2]
		self.follow_time = follow[3]
		self.follow_date = follow[4]

class Message(BaseDBObject): 
	def __init__(self, message: Tuple) -> None: 
		super().__init__()
		self.id = message[0]
		self.user_id = message[1]
		self.message_user_id = message[2]
		self.message_content = message[3]
		self.message_dt = message[4]

class Reply(BaseDBObject): 
	def __init__(self, reply: Tuple) -> None: 
		super().__init__()
		self.id = reply[0]
		self.reply_comment_id = reply[1]
		self.comment_id = reply[2]

class Search(BaseDBObject): 
	def __init__(self, search: Tuple) -> None: 
		super().__init__()
		self.search_id = search[0]
		self.user_id = search[1]
		self.search_content = search[2]

class Thumb(BaseDBObject): 
	def __init__(self, thumb: Tuple) -> None: 
		super().__init__()
		self.id = thumb[0]
		self.user_id = thumb[1]
		self.video_id = thumb[2]
		self.thumb_time = thumb[3]
		self.thumb_date = thumb[4]
		self.thumb_cnt = thumb[5]

class User(BaseDBObject): 
	def __init__(self, user: Tuple) -> None: 
		super().__init__()
		self.user_id = user[0]
		self.user_name = user[1]
		self.user_passwd = user[2]
		self.user_description = user[3]
		self.user_nickname = user[4]
		self.user_avatar = user[5]
		self.user_bg = user[6]
		self.user_followers_cnt = user[7]
		self.user_subscribers_cnt = user[8]

class Video(BaseDBObject): 
	def __init__(self, video: Tuple) -> None: 
		super().__init__()
		self.video_id = video[0]
		self.bgm_id = video[1]
		self.user_id = video[2]
		self.video_title = video[3]
		self.video_description = video[4]
		self.video_src = video[5]
		self.video_cover = video[6]
		self.video_create_dt = video[7]
		self.video_update_dt = video[8]
		self.video_delete_dt = video[9]
		self.video_duration = video[10]
		self.video_height = video[11]
		self.video_width = video[12]
		self.video_like_cnt = video[13]
		self.video_comment_cnt = video[14]
		self.video_watched_cnt = video[15]

class VideoGenre(BaseDBObject): 
	def __init__(self, videogenre: Tuple) -> None: 
		super().__init__()
		self.videogenre_id = videogenre[0]
		self.videogenre_name = videogenre[1]
		self.videogenre_description = videogenre[2]

class Video_VideoGenre(BaseDBObject): 
	def __init__(self, video_videogenre: Tuple) -> None: 
		super().__init__()
		self.id = video_videogenre[0]
		self.videogenre_id = video_videogenre[1]
		self.video_id = video_videogenre[2]

class Watch(BaseDBObject): 
	def __init__(self, watch: Tuple) -> None: 
		super().__init__()
		self.id = watch[0]
		self.user_id = watch[1]
		self.video_id = watch[2]
		self.watch_time = watch[3]
		self.watch_date = watch[4]
		self.watch_duration = watch[5]

