from apimanager import *
from typing import List
from models import User
from flask import Flask, request
import config
from sqlalchemy import create_engine
from sqlhelper import SQLStmtHelper
import json
from varname import nameof

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
@app.route(API_GET_USER, methods=['GET', 'POST'])
def getUser(user_id = 1):
    res = api_manager.createGetItemAPI(User, user_id)
    return res

@app.route(API_GET_VIDEO, methods=['GET', 'POST'])
def getVideo(video_id = 1):
    res = api_manager.createGetItemAPI(Video, video_id)
    return res


@app.route(API_ADD_USER, methods=['GET','POST'])
def addUser():
    stmt = ""
    """ request.args.to_dict() """
    #TODO: 改为接受表单
    user_name = str(request.args.get('user_name', None))
    user_passwd = str(request.args.get('user_passwd', None))
    user_description = "''"
    user_nickname = "''"
    user_avatar = None
    user_bg = None
    user_followers_cnt = 0
    user_subscribers_cnt = 0

    stmt = SQLStmtHelper.createSQLQueryStmt([User], "user_name = " + user_name)
    print(stmt)
    res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
    #!无法插入相同用户名
    if len(res_list) != 0:
        return api_manager.generateResponse(STAT_FAIL, "", STATEMENT_FOUND_RECORD) 
    else:
        new_user = User((
            0,
            user_name,
            user_passwd,
            user_description,
            user_nickname,
            user_avatar,
            user_bg,
            user_followers_cnt,
            user_subscribers_cnt            
        ))
        
        stmt = SQLStmtHelper.createSQLInsertStmt(new_user)
        SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)

        stmt = SQLStmtHelper.createSQLQueryStmt([User], "user_name = " + user_name)
        res_list = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)

        return APIManager.generateResponse(STAT_OK, res_list[0].toJson(), STATEMENT_RECORD_INSERT)
    

if __name__=='__main__':
    app.run()