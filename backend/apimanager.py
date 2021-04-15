
from typing import List
from sqlalchemy.engine.base import Engine
from models import * 
from sqlhelper import SQLStmtHelper


API_UPLOAD_IMAGE = "/upload_img/<imgname>"
API_UPLOAD_VIDEO = "/upload_video/<videoname>"

""" 
    用户相关
"""
API_LOGIN_USER = "/login_user"
API_GET_USER = "/get_user/<user_id>"
# http://127.0.0.1:5000/add_user?user_name=%27ZX%27&user_passwd=%27xxx%27
API_ADD_USER = "/add_user"
API_UPDATE_USER = "/update_user"
# http://127.0.0.1:5000/follow_user?user_id=%1%27&follow_user_id=%272%27
API_FOLLOW_USER = "/follow_user/<user_id>/<follow_user_id>"
API_GET_FOLLOWERS = "/get_followers/<user_id>"

""" 
    视频相关
"""
API_ADD_VIDEO = "/add_video"
API_GET_VIDEO = "/get_video/<video_id>"
API_GET_FAVORITE_VIDEO = "/get_favorite_video/<user_id>"
API_GET_VIDEO_BY_USER = "/get_video_by_user_id/<user_id>"
API_LIKE_VIDEO = "/like_video/<user_id>/<video_id>"
API_WATCH_VIDEO = "/watch_video/<user_id>/<video_id>/<duration>"
API_DELETE_VIDEO = "/delete_video/<video_id>"
API_UPDATE_VIDEO = "/update_video"
API_FAVORITE_VIDEO = "/favorite_video/<user_id>/<video_id>"
API_SEARCH_VIDEO = "/search_video"
"""
    评论相关
"""
API_GET_COMMENT = "/get_comments/<video_id>"
API_GET_COMMENT_BY_ID = "/get_comments_by_id/<comment_id>"
API_GET_REPLY = "/get_replys/<comment_id>"
API_COMMENT_VIDEO = "/comment_video/"
API_REPLY_COMMENT = "/comment_comment/"

"""
    私信相关
"""
API_ADD_MESSAGE = "/add_message"
API_GET_MESSAGE = "/get_messages/<user_id>/<message_user_id>"

""" 
    搜索相关
"""
API_ADD_SEARCH = "/add_search"

""" 
    状态码
"""
STAT_OK = 200
STAT_FAIL = 404

""" 
    提示信息
"""
STATEMENT_NOT_FOUND_RECORD = "not found record"
STATEMENT_FOUND_RECORD = "found record"
STATEMENT_RECORD_INSERT = "record inserted"
STATEMENT_RECORD_DELETE = "record deleted"
STATEMENT_RECORD_UPDATE = "record update"

STATEMENT_FOLLOW_CANT_RESOLVE = "can't follow myself"

class APIManager():
    def __init__(self, engine : Engine) -> None:
        self.engine = engine
        self.relation_type = [Favorites, Follow, Message, Reply, 
                              Thumb, Video_VideoGenre, Watch]
        
    @staticmethod
    def jsonifyList(res_list : List[BaseDBObject]):
        """ 
            json化BaseDBObject列表
            - res_list : 目标列表
        """
        res_list_json = []
        print("jsonfy")
        print(res_list)
        for res in res_list:
            res_list_json.append(json.loads(res.toJson()))
        print(res_list_json)
        return json.dumps(res_list_json, ensure_ascii = False)

    @staticmethod
    def generateResponse(stat, data : str, statement: str):
        """ 
            response生成器
            - stat: 状态
            - data: 内容
            - statement: 描述
        """
        try:
            res = {
                "state" : stat,
                "data" : json.loads(data) ,
                "statement" : statement
            }
            return json.dumps(res, ensure_ascii=False)
        except:
            res = {
                "state" : stat,
                "data" : data ,
                "statement" : statement
            }
            return json.dumps(res, ensure_ascii=False)


    def genericGetItemAPI(self, target : type ,id : str) -> str:
        """ 
            - target : 目标表
            - id : 带获取物品ID
        """
        id_name = target.__name__.lower() + "_id"
        if(int(id) > 0):
            stmt = SQLStmtHelper.createSQLQueryStmt([target], id_name + " = " + id)
        else:
            stmt = SQLStmtHelper.createSQLQueryStmt([target])
        print(stmt)    
        res_list : List[target] = SQLStmtHelper.parseSQLExecuteStmt(self.engine, target, stmt)
        print(res_list)
        if(len(res_list) > 0):
            return APIManager.generateResponse(STAT_OK, APIManager.jsonifyList(res_list), STATEMENT_FOUND_RECORD)
        else:
            return APIManager.generateResponse(STAT_FAIL, "", STATEMENT_NOT_FOUND_RECORD)

    def genericAddItemAPI(self, target: type, item : Tuple) -> str:
        """
            - target: 目标表
            - item: 记录元组
        """
        
        new_item = target(item)

        stmt = SQLStmtHelper.createSQLInsertStmt(new_item)
        SQLStmtHelper.parseSQLExecuteStmt(self.engine, target, stmt)

        if target in self.relation_type:
            new_item_id_attr = target.__name__ + ".id"
        else:
            new_item_id_attr = target.__name__.lower() + "_id" 
        new_item_id_value = 1

        stmt = SQLStmtHelper.createSQLLastIdStmt(target)
        res_list = SQLStmtHelper.parseSQLExecuteStmt(self.engine, int, stmt)
        new_item_id_value = res_list[0][0]

        stmt = SQLStmtHelper.createSQLQueryStmt([target], new_item_id_attr + " = " +str(new_item_id_value))
        res_list = SQLStmtHelper.parseSQLExecuteStmt(self.engine, target, stmt)

        return APIManager.generateResponse(STAT_OK, res_list[0].toJson(), STATEMENT_RECORD_INSERT)

    def genericUpdateItemAPI(self, target: type, item : Tuple) -> str:
        """
            - target: 目标表
            - item: 记录元组
        """
        new_item : BaseDBObject = target(item)

        stmt = SQLStmtHelper.createSQLUpdateStmt(new_item)
        SQLStmtHelper.parseSQLExecuteStmt(self.engine, target, stmt)
        
        (new_item_id_attr, new_item_id_value) = [item for item in new_item.__dict__.items()][0]
        stmt = SQLStmtHelper.createSQLQueryStmt([target], """
            {new_item_id_attr} = {new_item_id_value}
        """.format(new_item_id_attr = new_item_id_attr, new_item_id_value = new_item_id_value))

        res_list : List[target] = SQLStmtHelper.parseSQLExecuteStmt(self.engine, target, stmt)
        print(res_list)

        return APIManager.generateResponse(STAT_OK, res_list[0].toJson(), STATEMENT_RECORD_UPDATE)