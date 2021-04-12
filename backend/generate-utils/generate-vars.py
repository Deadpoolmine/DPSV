import os
THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(THIS_FOLDER, 'sqls/dpsv_create_table.sql')
dst = os.path.join(THIS_FOLDER, 'sqls/dpsv_vars_generated.py')

with open(src, 'r', encoding='UTF-8') as f:
    with open(dst, 'w') as vars_f:
        sql_stmts = f.readlines()
        total_stmts_count = len(sql_stmts)
        line = -1
        
        while line != total_stmts_count:
            sql_stmts[line] = sql_stmts[line].strip()
            line += 1
        
        line = -1
        vars_stack = []
        vars_stack.append("\n")
        while line < total_stmts_count - 1:
            line += 1
            sql_stmt = sql_stmts[line]

            table_name = ""
            if(sql_stmt.find("create table") != -1):
                items = sql_stmt.split(" ")
                table_name = items[len(items) - 1]
                vars_stack.append("#!VAR_FOR " + table_name + "\n")
                variable_index = 0
                cons_stack = []
                cons_stack.append("# VAR_CONSTRUCTOR" + "\n")
                cons_stack.append("new_" + table_name.lower() + " = (")
                while(1):
                    line += 1
                    if line >= total_stmts_count:
                        break
                    sql_stmt = sql_stmts[line]
                    
                    if(sql_stmt.find(");") != -1):
                        # vars_stack.append("\n\n")
                        break
                    
                    if sql_stmt.find("(") == -1 or sql_stmt.find("(") != 0:
                        if(sql_stmt.find("primary key") != -1):
                            continue
                        variable_name = sql_stmt.split(" ")[0]
                        vars_stack.append(variable_name + " = body[" + "'" + variable_name + "'" + "]  \n")
                        cons_stack.append(variable_name + ",")
                        variable_index += 1
                cons_stack.append(")\n\n")
                for cons in cons_stack:
                    vars_stack.append(cons)

        for var_line in vars_stack:
            vars_f.write(var_line)