import io
from werkzeug import datastructures
from apimanager import *
from typing import List
from models import User
from flask import Flask, request
import config
from sqlalchemy import create_engine
from sqlhelper import SQLStmtHelper
from PIL import Image

""" 
    初始化
"""
app = Flask(__name__)
app.config.from_object(config)
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
SQLStmtHelper()
api_manager = APIManager(engine)
print(engine)

""" 
    API区
"""
#!---------------------------------------------------------------------------------------------
#!视频相关API
@app.route(API_GET_VIDEO, methods=['GET', 'POST'])
def getVideo(video_id = 1):
    res = api_manager.genericGetItemAPI(Video, video_id)
    return res

@app.route(API_GET_VIDEO_BY_USER, methods=['GET', 'POST'])
def getVideoByUser(user_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Video], """
        Video.user_id = {user_id}
    """.format(user_id = int(user_id)))
    res_list : List[Video] = SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    return res

@app.route(API_ADD_VIDEO, methods=['GET', 'POST'])
def addVideo():
    now = datetime.datetime.now()
    video_id = 0
    bgm_id = 1
    user_id = 1
    video_title = "'电音智造'"
    video_description = "'掉的不谈'"
    video_src = "'http://caonima.com'"
    video_cover = "'xx'"
    video_create_dt = "'" + str(now) +"'"
    video_update_dt = "'" + str(now) +"'"
    video_delete_dt = "null"
    video_duration = "'00:03:11'"
    video_height = 100
    video_width = 200
    video_like_cnt = 0
    video_comment_cnt = 0
    video_watched_cnt = 0

    # VAR_CONSTRUCTOR
    new_video = (video_id, bgm_id,user_id, video_title, video_description, video_src,
                 video_cover, video_create_dt, video_update_dt, video_delete_dt, video_duration,
                 video_height, video_width, video_like_cnt, video_comment_cnt, video_watched_cnt)

    return api_manager.genericAddItemAPI(Video, new_video)

@app.route(API_LIKE_VIDEO, methods=['GET', 'POST'])
def likeVideo(user_id = 1, video_id = 1):
    now = datetime.datetime.now()
    id = 0
    user_id = user_id
    video_id = video_id
    thumb_time = "'" + str(now.time()) + "'"
    thumb_date = "'" + str(now.date()) + "'"
    thumb_cnt = 1
    # VAR_CONSTRUCTOR
    new_thumb = (id,user_id,video_id,thumb_time,thumb_date,thumb_cnt)
    return api_manager.genericAddItemAPI(Thumb, new_thumb)

@app.route(API_WATCH_VIDEO, methods=['GET', 'POST'])
def watchVideo(user_id, video_id, duration):
    now = datetime.datetime.now()
    id = 0
    user_id = user_id
    video_id = video_id
    watch_time = "'" + str(now.time()) + "'"
    watch_date = "'" + str(now.date()) + "'"
    watch_duration = duration
    # VAR_CONSTRUCTOR
    new_watch = (id,user_id,video_id,watch_time,watch_date,watch_duration)
    return api_manager.genericAddItemAPI(Watch, new_watch)

@app.route(API_DELETE_VIDEO, methods=['GET', 'POST'])
def deleteVideo(video_id = 1):
    """ 
        记得修改on delete restrict为on delete cascade 
    """
    stmt = SQLStmtHelper.createSQLDeleteStmt(Video, video_id)
    print(stmt)
    SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)

    return APIManager.generateResponse(STAT_OK, "", STATEMENT_RECORD_DELETE)

@app.route(API_UPDATE_VIDEO, methods=['GET', 'POST'])
def updateVideo():
    now = datetime.datetime.now()
    video_id = 1
    bgm_id = 1
    user_id = 1
    video_title = "'电音智造'"
    video_description = "'掉的不谈'"
    video_src = "'http://caonima.com'"
    video_cover = "'xx'"
    video_create_dt = "'" + str(now) +"'"
    video_update_dt = "'" + str(now) +"'"
    video_delete_dt = "null"
    video_duration = "'00:03:11'"
    video_height = 100
    video_width = 200
    video_like_cnt = 0
    video_comment_cnt = 0
    video_watched_cnt = 0

    # VAR_CONSTRUCTOR
    new_video = (video_id, bgm_id, user_id, video_title, video_description, video_src,
                 video_cover, video_create_dt, video_update_dt, video_delete_dt, video_duration,
                 video_height, video_width, video_like_cnt, video_comment_cnt, video_watched_cnt)

    return api_manager.genericUpdateItemAPI(Video, new_video)

@app.route(API_FAVORITE_VIDEO, methods=['GET','POST'])
def favoriteVideo(user_id = 1, video_id = 1):
    now = datetime.datetime.now() 
    id = 0
    user_id = user_id
    video_id = video_id
    favorites_time = "'" + str(now.time()) + "'"
    favorites_date = "'" + str(now.date()) + "'"
    # VAR_CONSTRUCTOR
    new_favorites = (id, user_id, video_id, favorites_time, favorites_date)
    return api_manager.genericAddItemAPI(Favorites, new_favorites)

#!---------------------------------------------------------------------------------------------
#!用户相关API
@app.route(API_LOGIN_USER, methods=['GET', 'POST'])
def loginUser():
    user_name = str(request.args.get('user_name', None))
    user_passwd = str(request.args.get('user_passwd', None))
    stmt = SQLStmtHelper.createSQLQueryStmt([User], """
        user_name = {user_name} and 
        user_passwd = {user_passwd}
    """.format(user_name = user_name, user_passwd = user_passwd))
    res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
    if len(res_list) == 0:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_NOT_FOUND_RECORD)
    else:
        return APIManager.generateResponse(STAT_OK, res_list[0].toJson(), STATEMENT_FOUND_RECORD) 

@app.route(API_GET_USER, methods=['GET', 'POST'])
def getUser(user_id = 1):
    res = api_manager.genericGetItemAPI(User, user_id)
    return res
 
def savefile(data, filepath, filename):
    file = filepath + '\\' + filename
    with open(file, 'wb') as f:
        f.write(data)


@app.route(API_ADD_USER, methods=['GET','POST'])
def addUser():
    stmt = ""
    payload = request.form.to_dict()
    print(payload)
    img = request.files.get("myFile")
    img_byte = Image.open(img.stream)
    print(img_byte.width)
    """ request.args.to_dict() """
    #TODO: 改为接受表单
    new_user = ()
    user_name = "'hello'"
    user_passwd = "'helllll'"
    user_description = "''"
    user_nickname = "''"
    user_avatar = img_byte
    user_bg = None
    user_followers_cnt = 0
    user_subscribers_cnt = 0

    stmt = SQLStmtHelper.createSQLQueryStmt([User], """
        user_name = {user_name} 
    """.format(user_name = user_name))

    print(stmt)
    res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
    #!无法插入相同用户名
    if len(res_list) != 0:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_FOUND_RECORD) 
    else:
        new_user = (0, user_name, user_passwd, user_description, user_nickname,
                    user_avatar, user_bg, user_followers_cnt, user_subscribers_cnt)
        return api_manager.genericAddItemAPI(User, new_user)
    
@app.route(API_FOLLOW_USER, methods=['GET', 'POST'])
def followUser(user_id = 1, follow_user_id = 2):
    stmt = ""
    now = datetime.datetime.now()
    user_id = user_id
    follow_user_id = follow_user_id
    follow_date= "'" + str(now.date()) + "'"
    follow_time= "'" + str(now.time()) + "'"

    new_follow = (0, user_id, follow_user_id, follow_time, follow_date)
    #! 无法自己关注自己
    if user_id == follow_user_id:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_FOLLOW_CANT_RESOLVE)
    

    stmt = SQLStmtHelper.createSQLQueryStmt([Follow], """
        Follow.user_id = {user_id} and
        Follow.follow_user_id = {follow_user_id}
    """.format(user_id = user_id, follow_user_id = follow_user_id))
    res_list : List[Follow] = SQLStmtHelper.parseSQLExecuteStmt(engine, Follow, stmt)
    #! 已经关注过该用户了
    if len(res_list) != 0:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_FOUND_RECORD)

    res = api_manager.genericAddItemAPI(Follow, new_follow)
    return res

#!---------------------------------------------------------------------------------------------
#!评论相关API
@app.route(API_GET_COMMENT, methods=['GET', 'POST'])
def getComments(video_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Comment], """
        Comment.video_id = {video_id}
    """.format(video_id = int(video_id)))
    res_list : List[Comment] = SQLStmtHelper.parseSQLExecuteStmt(engine, Comment, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    return res

@app.route(API_COMMENT_VIDEO, methods=['GET', 'POST'])
def commentVideo():
    now = datetime.datetime.now()
    video_id = 2
    user_id = 1
    comment_content = "'应该从那个地方取'"
    comment_date = "'" + str(now.date()) + "'"
    comment_time = "'" + str(now.time()) + "'"
    comment_reply_cnt = 0
    # VAR_CONSTRUCTOR
    new_comment = (0,video_id,user_id,comment_content,comment_date,
                   comment_time,comment_reply_cnt,)
    return api_manager.genericAddItemAPI(Comment, new_comment)

@app.route(API_REPLY_COMMENT, methods=['GET', 'POST'])
def replyComment():
    """ 
        1. 先评论
        2. 再插入Reply
    """
    now = datetime.datetime.now()
    video_id = 1
    user_id = 1
    comment_content = "'应该从那个地方取'"
    comment_date = "'" + str(now.date()) + "'"
    comment_time = "'" + str(now.time()) + "'"
    comment_reply_cnt = 0
    # VAR_CONSTRUCTOR
    new_comment = (0,video_id,user_id,comment_content,comment_date,
                   comment_time,comment_reply_cnt,)

    stmt = SQLStmtHelper.createSQLInsertStmt(Comment(new_comment))
    SQLStmtHelper.parseSQLExecuteStmt(engine, Comment, stmt)

    stmt = SQLStmtHelper.createSQLLastIdStmt()
    res_list = SQLStmtHelper.parseSQLExecuteStmt(engine, int, stmt)
    
    reply_comment_id = 1
    comment_id = res_list[0]

    # VAR_CONSTRUCTOR
    new_reply = (0,reply_comment_id,comment_id,)
    return api_manager.genericAddItemAPI(Reply, new_reply)

if __name__=='__main__':
    app.run()