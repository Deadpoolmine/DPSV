import sys
from typing import List

from sqlalchemy.sql.expression import text
from models import User
from flask import Flask
import config
from sqlalchemy import create_engine
from sqlhelper import SQLStmtCreator

global engine, app

app = Flask(__name__)
app.config.from_object(config)
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
SQLStmtCreator()
print(engine)
    


@app.route('/users')
def getUsers():
    stmt = SQLStmtCreator.createSQLQueryStmt(User)
    results = engine.execute(stmt)
    users : List[User] = [] 
    for res in results:
        users.append(User(res))
    
    return users[0].toJson()

if __name__=='__main__':
    app.run()