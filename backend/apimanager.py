
from typing import List
from sqlalchemy.engine.base import Engine
from models import * 
from sqlhelper import SQLStmtHelper


API_GET_USER = "/get_user/<user_id>"
# http://127.0.0.1:5000/add_user?user_name=%27ZX%27&user_passwd=%27xxx%27
API_ADD_USER = "/add_user"

API_GET_VIDEO = "/get_video/<video_id>"


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

class APIManager():
    def __init__(self, engine : Engine) -> None:
        self.engine = engine
        
    @staticmethod
    def jsonifyList(res_list : List[BaseDBObject]):
        """ 
            json化BaseDBObject列表
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


    def createGetItemAPI(self, target : type ,id : str):
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