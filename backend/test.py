"""
    数据库测试
"""
import datetime
from typing import List
from flask import helpers
from sqlalchemy import create_engine
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.functions import cume_dist
from models import BaseDBObject, Video
import config


db_uri = config.SQLALCHEMY_DATABASE_URI
engine = create_engine(db_uri)
print(engine)

    

# engine.execute('CREATE TABLE EX1 ('
#                'id INTEGER NOT NULL,'
#                'name VARCHAR(10), '
#                'PRIMARY KEY (id));')
               
# # insert a raw
# engine.execute('INSERT INTO EX1 '
#                '(id, name) '
#                'VALUES (1,"raw1")')

# # select *
# result = engine.execute('SELECT * FROM '
#                         'EX1')
# for _r in result:
#    print(_r)

# # delete *
# engine.execute('DELETE from EX1 where id=1;')
# result = engine.execute('SELECT * FROM EX1')
# print(result.fetchall())

"""
    数据模型测试
"""

from models import User
from sqlhelper import SQLStmtHelper

SQLStmtHelper()
results = engine.execute('SELECT * FROM USER')
user = None
for result in results:
    #print(result)
    user = User(result)
    #print(user)
    #print(user.toJson())
    
    """ 测试插入语句，成功了 """
    # stmt = SQLStmtHelper().createSQLInsertStmt(user)
    # engine.execute(stmt)


print("\n")
# stmt = SQLStmtHelper.createSQLQueryStmt([User], "user_followers_cnt > 1")
# stmt = SQLStmtHelper.createSQLDeleteStmt(user)
stmt = SQLStmtHelper.createSQLQueryStmt([User])
print(stmt)
# results = engine.execute(stmt)
# for res in results:
#     print(res)

res_list : List[User] = SQLStmtHelper.parseSQLExecuteStmt(engine, User, stmt)
for user in res_list:
    print(user.user_name)


def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    elif isinstance(o, datetime.timedelta):
        return o.total_seconds()

stmt = SQLStmtHelper.createSQLQueryStmt([Video])
print(stmt)
# results = engine.execute(stmt)
# for res in results:
#     print(res)

res_list : List[Video] = SQLStmtHelper.parseSQLExecuteStmt(engine, Video, stmt)
for video in res_list:
    print(video.toJson())