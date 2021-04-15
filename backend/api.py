from werkzeug.datastructures import FileStorage
from utils import Utils
from flask.helpers import send_from_directory
from apimanager import *
from typing import List
from models import User
from flask import Flask, request
import config
from sqlalchemy import create_engine
from sqlhelper import SQLStmtHelper

""" 
    初始化
"""
app = Flask(__name__)
app.config.from_object(config)
utils = Utils(app)
print(app.config)
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
SQLStmtHelper()
api_manager = APIManager(engine)
print(engine)

""" 
    API区
"""
@app.route(API_UPLOAD_IMAGE, methods=['POST', 'GET'])
def uploaded_img(imgname):
    return send_from_directory(app.config['UPLOAD_FOLDER_IMAGE'], imgname)

@app.route(API_UPLOAD_VIDEO, methods=['POST', 'GET'])
def uploaded_video(videoname):
    return send_from_directory(app.config['UPLOAD_FOLDER_VIDEO'], videoname)

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

@app.route(API_GET_FAVORITE_VIDEO, methods=['GET', 'POST'])
def getFavoritesVideo(user_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Video, Favorites], """
        Favorites.user_id = {user_id} and
        Video.video_id = Favorites.video_id
    """.format(user_id = int(user_id)))
    print(stmt)
    res_list : List[Video] = SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    
    return res

@app.route(API_ADD_VIDEO, methods=['GET', 'POST'])
def addVideo():
    now = datetime.datetime.now()
    body : dict = request.form.to_dict()

    print(body)

    img_video_cover : FileStorage = request.files.get("video_cover")
    video_cover_url = utils.uploadImage(img_video_cover, img_video_cover.filename)
    
    video_video_src : FileStorage = request.files.get("video_src")
    video_src_url = utils.uploadVideo(video_video_src, video_video_src.filename)

    video_id = 0
    bgm_id = body['bgm_id']     # 1
    user_id = body['user_id']  
    video_title = "'" + body['video_title'] + "'"  
    video_description ="'" +  body['video_description'] + "'"  
    video_src = "'" + video_src_url + "'"
    video_cover = "'" + video_cover_url + "'"
    video_create_dt = "'" + str(now) +"'" 
    video_update_dt = "'" + str(now) +"'"
    video_delete_dt = "null"
    video_duration = "'" + body['video_duration'] + "'"  
    video_height = body['video_height']   #TODO: body['video_height']  
    video_width = body['video_width']   #TODO: body['video_width']  
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
    if request.method == 'POST':
        body: dict = request.form.to_dict()
        video_id = body['video_id']

    stmt = SQLStmtHelper.createSQLDeleteStmt(Video, video_id)
    print(stmt)
    SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)

    return APIManager.generateResponse(STAT_OK, "", STATEMENT_RECORD_DELETE)

@app.route(API_UPDATE_VIDEO, methods=['GET', 'POST'])
def updateVideo():
    now = datetime.datetime.now()
    body : dict = request.form.to_dict()
    video_id = body['video_id']
    video_title = "'" + body['video_title'] + "'"  
    video_description = "'" + body['video_description'] + "'" 
    video_update_dt = str(now) 

    stmt = SQLStmtHelper.createSQLQueryStmt([Video], """
        Video.video_id = {video_id} 
    """.format(video_id = video_id))

    print(stmt)
    res_list : List[Video] = SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)
    #!必须找到该视频
    if len(res_list) != 0:
        video = res_list[0]
        # VAR_CONSTRUCTOR
        new_video = (video_id, video.bgm_id, video.user_id, video_title, video_description, video.video_src,
                     video.video_cover, str(video.video_create_dt), video_update_dt, None, str(video.video_duration),
                     video.video_height, video.video_width, video.video_like_cnt, video.video_comment_cnt, video.video_watched_cnt)
        return api_manager.genericUpdateItemAPI(Video, new_video)
    else:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_NOT_FOUND_RECORD) 


@app.route(API_FAVORITE_VIDEO, methods=['GET','POST'])
def favoriteVideo(user_id = 1, video_id = 1):
    now = datetime.datetime.now() 
    id = 0
    if request.method == 'POST':
        body : dict = request.form.to_dict()
        user_id = body['user_id']
        video_id = body['video_id']
    else:
        user_id = user_id
        video_id = video_id
    favorites_time = "'" + str(now.time()) + "'"
    favorites_date = "'" + str(now.date()) + "'"
    # VAR_CONSTRUCTOR
    new_favorites = (id, user_id, video_id, favorites_time, favorites_date)
    return api_manager.genericAddItemAPI(Favorites, new_favorites)

@app.route(API_SEARCH_VIDEO, methods=['GET', 'POST'])
def searchVideo():
    body : dict = request.form.to_dict()
    search_content = body['search_content']
    stmt = SQLStmtHelper.createSQLQueryStmt([Video], """
        Video.video_title LIKE '%{search_content}%' or
        Video.video_description LIKE '%{search_content}%'
    """.format(search_content = search_content))
    print(stmt)
    res_list : List[Video] = SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    return res
#!---------------------------------------------------------------------------------------------
#!用户相关API
@app.route(API_LOGIN_USER, methods=['GET', 'POST'])
def loginUser():
    if request.method == 'POST':
        body : dict = request.form.to_dict()
        user_name = "'" + body['user_name'] + "'"
        user_passwd = "'" + body['user_passwd'] + "'"
    else:
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


@app.route(API_ADD_USER, methods=['GET', 'POST'])
def addUser():
    body : dict = request.form.to_dict()

    img_user_avatar : FileStorage = request.files.get("user_avatar")
    user_avatar_url = utils.uploadImage(img_user_avatar, img_user_avatar.filename)

    user_id = 0
    user_name = "'" + body['user_name'] + "'"
    user_passwd = "'" + body['user_passwd'] + "'"
    user_description = "'" + body['user_description'] + "'"
    user_nickname = "'" + body['user_nickname'] + "'"
    user_avatar = "'" + user_avatar_url + "'"
    user_bg =  "'" + body['user_bg'] + "'"  
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
        new_user = (user_id, user_name, user_passwd, user_description, user_nickname,
                    user_avatar, user_bg, user_followers_cnt, user_subscribers_cnt)
        return api_manager.genericAddItemAPI(User, new_user)


@app.route(API_UPDATE_USER, methods=['GET', 'POST'])
def updateUser():
    body : dict = request.form.to_dict()

    user_id = body['user_id']
    user_description = "'" + body['user_description'] + "'"
    user_nickname = "'" + body['user_nickname'] + "'"

    stmt = SQLStmtHelper.createSQLQueryStmt([User], """
        user_id = {user_id} 
    """.format(user_id = user_id))

    print(stmt)
    res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
    #!必须找到该用户
    if len(res_list) != 0:
        user = res_list[0]
        new_user = (user.user_id, user.user_name, user.user_passwd, user_description, user_nickname,
                    user.user_avatar, user.user_bg, user.user_followers_cnt, user.user_subscribers_cnt)
        return api_manager.genericUpdateItemAPI(User, new_user)
    else:
        return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_NOT_FOUND_RECORD) 
    
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

@app.route(API_GET_FOLLOWERS, methods=['GET', 'POST'])
def getFollowers(user_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([User, Follow], """
        (Follow.user_id = {user_id} and User.user_id = Follow.follow_user_id) or 
        (Follow.follow_user_id = {user_id} and User.user_id = Follow.user_id)
    """.format(user_id = int(user_id)))
    print(stmt)
    res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
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
    
@app.route(API_GET_COMMENT_BY_ID, methods=['GET', 'POST'])
def getCommentById(comment_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Comment], """
        Comment.comment_id = {comment_id}
    """.format(comment_id = int(comment_id)))
    res_list : List[Comment] = SQLStmtHelper.parseSQLExecuteStmt(engine, Comment, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    return res

@app.route(API_GET_REPLY, methods=['GET', 'POST'])
def getReply(comment_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Reply], """
        Reply.comment_id = {comment_id}
    """.format(comment_id = int(comment_id)))
    res_list : List[Reply] = SQLStmtHelper.parseSQLExecuteStmt(engine, Reply, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                       APIManager.jsonifyList(res_list), 
                                       STATEMENT_FOUND_RECORD)
    return res


@app.route(API_COMMENT_VIDEO, methods=['GET', 'POST'])
def commentVideo():
    now = datetime.datetime.now()
    body : dict = request.form.to_dict() 
    comment_id = 0  
    video_id = body['video_id']  
    user_id = body['user_id']  
    comment_content = "'" + body['comment_content'] + "'"
    comment_date = "'" + str(now.date()) + "'"  
    comment_time = "'" + str(now.time()) + "'"  
    comment_reply_cnt = 0
    # VAR_CONSTRUCTOR
    new_comment = (comment_id, video_id,user_id,comment_content,comment_date,
                   comment_time,comment_reply_cnt,)
    return api_manager.genericAddItemAPI(Comment, new_comment)

@app.route(API_REPLY_COMMENT, methods=['GET', 'POST'])
def replyComment():
    """ 
        1. 先评论
        2. 再插入Reply
    """
    now = datetime.datetime.now()
    body : dict = request.form.to_dict() 

    comment_id = 0  
    video_id = body['video_id']  
    user_id = body['user_id']  
    comment_content = "'" + body['comment_content'] + "'"  
    comment_date = "'" + str(now.date()) + "'"  
    comment_time = "'" + str(now.time()) + "'"  
    comment_reply_cnt = 0
    
    # VAR_CONSTRUCTOR
    new_comment = (comment_id, video_id, user_id, comment_content, comment_date,
                   comment_time, comment_reply_cnt,)

    stmt = SQLStmtHelper.createSQLInsertStmt(Comment(new_comment))
    SQLStmtHelper.parseSQLExecuteStmt(engine, Comment, stmt)

    stmt = SQLStmtHelper.createSQLLastIdStmt(Comment)
    res_list = SQLStmtHelper.parseSQLExecuteStmt(engine, int, stmt)
    
    reply_id = 0
    reply_comment_id = body['reply_comment_id']
    comment_id = res_list[0][0]
    print(res_list)
    # VAR_CONSTRUCTOR
    new_reply = (reply_id, reply_comment_id, comment_id)
    return api_manager.genericAddItemAPI(Reply, new_reply)

#!---------------------------------------------------------------------------------------------
#!私信相关
@app.route(API_GET_MESSAGE, methods=['GET', 'POST'])
def getMessage(user_id = 1, message_user_id = 1):
    stmt = SQLStmtHelper.createSQLQueryStmt([Message], """
        (Message.user_id = {user_id} and Message.message_user_id = {message_user_id}) or
        (Message.user_id = {message_user_id} and Message.message_user_id = {user_id})
        order by Message.message_dt ASC
    """.format(user_id = int(user_id), message_user_id= int(message_user_id)))

    res_list : List[Message] = SQLStmtHelper.parseSQLExecuteStmt(engine, Message, stmt)
    res = APIManager.generateResponse(STAT_OK, 
                                      APIManager.jsonifyList(res_list), 
                                      STATEMENT_FOUND_RECORD)
    return res

@app.route(API_ADD_MESSAGE, methods=['GET', 'POST'])
def addMessage():
    now = datetime.datetime.now()
    body : dict = request.form.to_dict() 
    id = 0
    user_id = body['user_id']  
    message_user_id = body['message_user_id']  
    message_content = "'" + body['message_content'] + "'"  
    message_dt = "'" + str(now) + "'"
    # VAR_CONSTRUCTOR
    new_message = (id, user_id, message_user_id, message_content, message_dt)
    return api_manager.genericAddItemAPI(Message, new_message)

#!---------------------------------------------------------------------------------------------
#!搜索相关API
@app.route(API_ADD_SEARCH, methods=['GET', 'POST'])
def addSearch():
    body : dict = request.form.to_dict() 
    search_id = 0  
    user_id = body['user_id']  
    search_content = "'" + body['search_content'] + "'"  
    # VAR_CONSTRUCTOR
    new_search = (search_id,user_id,search_content)
    return api_manager.genericAddItemAPI(Search, new_search)

if __name__=='__main__':
    app.run()