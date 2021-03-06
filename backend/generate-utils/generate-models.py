""" 
    此脚本用于自动生成Model
"""
import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(THIS_FOLDER, 'sqls/dpsv_create_table.sql')
dst = os.path.join(THIS_FOLDER, 'sqls/dpsv_model_generated.py')

with open(src, 'r', encoding='UTF-8') as f:
    with open(dst, 'w') as models_f:
        sql_stmts = f.readlines()
        total_stmts_count = len(sql_stmts)
        line = -1
        
        while line != total_stmts_count:
            sql_stmts[line] = sql_stmts[line].strip()
            line += 1
        
        line = -1
        model_stack = []
        model_stack.append("""
from typing import Tuple
import json
import datetime 

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    elif isinstance(o, datetime.timedelta):
        return o.total_seconds()

class BaseDBObject():
    def __init__(self) -> None:
        pass
    
    def __repr__(self) -> str:
        return "< Base DB OBject " + str(self.__class__) + " >"

    def toJson(self):
        return json.dumps(self.__dict__, ensure_ascii=False, default=default)

""")
        while line != total_stmts_count:
            line += 1
            if line >= total_stmts_count:
                break
            sql_stmt = sql_stmts[line]

            table_name = ""
            if(sql_stmt.find("create table") != -1):
                items = sql_stmt.split(" ")
                table_name = items[len(items) - 1]
                model_stack.append("class " + table_name + "(BaseDBObject): \n\t"
                                "def __init__(self, "+ table_name.lower() +": Tuple) -> None: \n\t\t"
                                "super().__init__()")
                variable_index = 0
                
                while(1):
                    line += 1
                    if line >= total_stmts_count:
                        break
                    sql_stmt = sql_stmts[line]
                    
                    if(sql_stmt.find(");") != -1):
                        model_stack.append("\n\n")
                        break
                    
                    if sql_stmt.find("(") == -1 or sql_stmt.find("(") != 0:
                        if(sql_stmt.find("primary key") != -1):
                            continue
                        variable_name = sql_stmt.split(" ")[0]
                        model_stack.append("\n\t\tself."+variable_name + " = " + table_name.lower() + 
                                        "[" + str(variable_index) +"]")
                        variable_index += 1
                    

            
        for model_line in model_stack:
            models_f.write(model_line)