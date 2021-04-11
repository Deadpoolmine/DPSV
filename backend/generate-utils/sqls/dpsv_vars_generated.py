
#!VAR_FOR Bgm
bgm_id = "''"
bgmgenre_id = "''"
bgm_title = "''"
bgm_src = "''"
bgm_duration = "''"
bgm_author = "''"


# VAR_CONSTRUCTOR
new_bgm = (bgm_id,bgmgenre_id,bgm_title,bgm_src,bgm_duration,bgm_author,)
#!VAR_FOR BgmGenre
bgmgenre_id = "''"
bgmgenre_name = "''"
bgmgenre_description = "''"


# VAR_CONSTRUCTOR
new_bgmgenre = (bgmgenre_id,bgmgenre_name,bgmgenre_description,)
#!VAR_FOR Comment
comment_id = "''"
video_id = "''"
user_id = "''"
comment_content = "''"
comment_date = "''"
comment_time = "''"
comment_reply_cnt = "''"


# VAR_CONSTRUCTOR
new_comment = (comment_id,video_id,user_id,comment_content,comment_date,comment_time,comment_reply_cnt,)
#!VAR_FOR Favorites
id = "''"
user_id = "''"
video_id = "''"
favorites_time = "''"
favorites_date = "''"


# VAR_CONSTRUCTOR
new_favorites = (id,user_id,video_id,favorites_time,favorites_date,)
#!VAR_FOR Follow
id = "''"
user_id = "''"
follow_user_id = "''"
follow_time = "''"
follow_date = "''"


# VAR_CONSTRUCTOR
new_follow = (id,user_id,follow_user_id,follow_time,follow_date,)
#!VAR_FOR Message
id = "''"
user_id = "''"
message_user_id = "''"
message_content = "''"
message_dt = "''"


# VAR_CONSTRUCTOR
new_message = (id,user_id,message_user_id,message_content,message_dt,)
#!VAR_FOR Reply
id = "''"
reply_comment_id = "''"
comment_id = "''"


# VAR_CONSTRUCTOR
new_reply = (id,reply_comment_id,comment_id,)
#!VAR_FOR Search
research_id = "''"
user_id = "''"
research_content = "''"


# VAR_CONSTRUCTOR
new_search = (research_id,user_id,research_content,)
#!VAR_FOR Thumb
id = "''"
user_id = "''"
video_id = "''"
thumb_time = "''"
thumb_date = "''"
thumb_cnt = "''"


# VAR_CONSTRUCTOR
new_thumb = (id,user_id,video_id,thumb_time,thumb_date,thumb_cnt,)
#!VAR_FOR User
user_id = "''"
user_name = "''"
user_passwd = "''"
user_description = "''"
user_nickname = "''"
user_avatar = "''"
user_bg = "''"
user_followers_cnt = "''"
user_subscribers_cnt = "''"


# VAR_CONSTRUCTOR
new_user = (user_id,user_name,user_passwd,user_description,user_nickname,user_avatar,user_bg,user_followers_cnt,user_subscribers_cnt,)
#!VAR_FOR Video
video_id = "''"
bgm_id = "''"
user_id = "''"
video_title = "''"
video_description = "''"
video_src = "''"
video_cover = "''"
video_create_dt = "''"
video_update_dt = "''"
video_delete_dt = "''"
video_duration = "''"
video_height = "''"
video_width = "''"
video_like_cnt = "''"
video_comment_cnt = "''"
video_watched_cnt = "''"


# VAR_CONSTRUCTOR
new_video = (video_id,bgm_id,user_id,video_title,video_description,video_src,video_cover,video_create_dt,video_update_dt,video_delete_dt,video_duration,video_height,video_width,video_like_cnt,video_comment_cnt,video_watched_cnt,)
#!VAR_FOR VideoGenre
videogenre_id = "''"
videogenre_name = "''"
videogenre_description = "''"


# VAR_CONSTRUCTOR
new_videogenre = (videogenre_id,videogenre_name,videogenre_description,)
#!VAR_FOR Video_VideoGenre
id = "''"
videogenre_id = "''"
video_id = "''"


# VAR_CONSTRUCTOR
new_video_videogenre = (id,videogenre_id,video_id,)
#!VAR_FOR Watch
id = "''"
user_id = "''"
video_id = "''"
watch_time = "''"
watch_date = "''"
watch_duration = "''"


# VAR_CONSTRUCTOR
new_watch = (id,user_id,video_id,watch_time,watch_date,watch_duration,)
