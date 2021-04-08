"""
    数据库测试
"""
from flask import helpers
from sqlalchemy import create_engine
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
from sqlhelper import SQLStmtCreator

SQLStmtCreator()
results = engine.execute('SELECT * FROM USER')
for result in results:
    #print(result)
    user = User(result)
    #print(user)
    #print(user.toJson())
    
    """ 测试插入语句，成功了 """
    # stmt = SQLStmtCreator().createSQLInsertStmt(user)
    # engine.execute(stmt)


print("\n")
stmt = SQLStmtCreator.createSQLQueryStmt([User], "user_followers_cnt > 1")
print(stmt)
results = engine.execute(stmt)
for res in results:
    print(res)

