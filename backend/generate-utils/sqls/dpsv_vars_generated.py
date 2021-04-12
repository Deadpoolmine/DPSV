
body = dict()
#!VAR_FOR Bgm
bgm_id = body['bgm_id']  
bgmgenre_id = body['bgmgenre_id']  
bgm_title = body['bgm_title']  
bgm_src = body['bgm_src']  
bgm_duration = body['bgm_duration']  
bgm_author = body['bgm_author']  
# VAR_CONSTRUCTOR
new_bgm = (bgm_id,bgmgenre_id,bgm_title,bgm_src,bgm_duration,bgm_author,)

#!VAR_FOR BgmGenre
bgmgenre_id = body['bgmgenre_id']  
bgmgenre_name = body['bgmgenre_name']  
bgmgenre_description = body['bgmgenre_description']  
# VAR_CONSTRUCTOR
new_bgmgenre = (bgmgenre_id,bgmgenre_name,bgmgenre_description,)

#!VAR_FOR Comment
comment_id = body['comment_id']  
video_id = body['video_id']  
user_id = body['user_id']  
comment_content = body['comment_content']  
comment_date = body['comment_date']  
comment_time = body['comment_time']  
comment_reply_cnt = body['comment_reply_cnt']  
# VAR_CONSTRUCTOR
new_comment = (comment_id,video_id,user_id,comment_content,comment_date,comment_time,comment_reply_cnt,)

#!VAR_FOR Favorites
id = body['id']  
user_id = body['user_id']  
video_id = body['video_id']  
favorites_time = body['favorites_time']  
favorites_date = body['favorites_date']  
# VAR_CONSTRUCTOR
new_favorites = (id,user_id,video_id,favorites_time,favorites_date,)

#!VAR_FOR Follow
id = body['id']  
user_id = body['user_id']  
follow_user_id = body['follow_user_id']  
follow_time = body['follow_time']  
follow_date = body['follow_date']  
# VAR_CONSTRUCTOR
new_follow = (id,user_id,follow_user_id,follow_time,follow_date,)

#!VAR_FOR Message
id = body['id']  
user_id = body['user_id']  
message_user_id = body['message_user_id']  
message_content = body['message_content']  
message_dt = body['message_dt']  
# VAR_CONSTRUCTOR
new_message = (id,user_id,message_user_id,message_content,message_dt,)

#!VAR_FOR Reply
id = body['id']  
reply_comment_id = body['reply_comment_id']  
comment_id = body['comment_id']  
# VAR_CONSTRUCTOR
new_reply = (id,reply_comment_id,comment_id,)

#!VAR_FOR Search
research_id = body['research_id']  
user_id = body['user_id']  
research_content = body['research_content']  
# VAR_CONSTRUCTOR
new_search = (research_id,user_id,research_content,)

#!VAR_FOR Thumb
id = body['id']  
user_id = body['user_id']  
video_id = body['video_id']  
thumb_time = body['thumb_time']  
thumb_date = body['thumb_date']  
thumb_cnt = body['thumb_cnt']  
# VAR_CONSTRUCTOR
new_thumb = (id,user_id,video_id,thumb_time,thumb_date,thumb_cnt,)

#!VAR_FOR User
user_id = body['user_id']  
user_name = body['user_name']  
user_passwd = body['user_passwd']  
user_description = body['user_description']  
user_nickname = body['user_nickname']  
user_avatar = body['user_avatar']  
user_bg = body['user_bg']  
user_followers_cnt = body['user_followers_cnt']  
user_subscribers_cnt = body['user_subscribers_cnt']  
# VAR_CONSTRUCTOR
new_user = (user_id,user_name,user_passwd,user_description,user_nickname,user_avatar,user_bg,user_followers_cnt,user_subscribers_cnt,)

#!VAR_FOR Video
video_id = body['video_id']  
bgm_id = body['bgm_id']  
user_id = body['user_id']  
video_title = body['video_title']  
video_description = body['video_description']  
video_src = body['video_src']  
video_cover = body['video_cover']  
video_create_dt = body['video_create_dt']  
video_update_dt = body['video_update_dt']  
video_delete_dt = body['video_delete_dt']  
video_duration = body['video_duration']  
video_height = body['video_height']  
video_width = body['video_width']  
video_like_cnt = body['video_like_cnt']  
video_comment_cnt = body['video_comment_cnt']  
video_watched_cnt = body['video_watched_cnt']  
# VAR_CONSTRUCTOR
new_video = (video_id,bgm_id,user_id,video_title,video_description,video_src,video_cover,video_create_dt,video_update_dt,video_delete_dt,video_duration,video_height,video_width,video_like_cnt,video_comment_cnt,video_watched_cnt,)

#!VAR_FOR VideoGenre
videogenre_id = body['videogenre_id']  
videogenre_name = body['videogenre_name']  
videogenre_description = body['videogenre_description']  
# VAR_CONSTRUCTOR
new_videogenre = (videogenre_id,videogenre_name,videogenre_description,)

#!VAR_FOR Video_VideoGenre
id = body['id']  
videogenre_id = body['videogenre_id']  
video_id = body['video_id']  
# VAR_CONSTRUCTOR
new_video_videogenre = (id,videogenre_id,video_id,)

#!VAR_FOR Watch
id = body['id']  
user_id = body['user_id']  
video_id = body['video_id']  
watch_time = body['watch_time']  
watch_date = body['watch_date']  
watch_duration = body['watch_duration']  
# VAR_CONSTRUCTOR
new_watch = (id,user_id,video_id,watch_time,watch_date,watch_duration,)

