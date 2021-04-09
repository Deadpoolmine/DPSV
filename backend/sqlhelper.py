from typing import List

from sqlalchemy.engine.base import Engine
from models import BaseDBObject

class SQLStmtHelper():
    def __init__(self) -> None:
        self.user_table = "User"
        self.video_table = "Video"
        self.bgm_table = "Bgm"
        self.bgm_genre_table = "BgmGenre"
        self.comment_table = "Comment"
        self.favorites_table = "Favorites"
        self.follow_table = "Follow"
        self.message_table = "Message"
        self.reply_table = "Reply"
        self.search_table = "Search"
        self.thumb_table = "Thumb"
        self.video_genre_table = "VideoGenre"
        self.video_video_genre_table = "Video_VideoGenre"
        self.watch_table = "Watch"

    """ 
        SELECT * FROM [target1, target2 ... ] 
        Where filter
        ;
    """
    @staticmethod
    def createSQLQueryStmt(targets: List[type], filter : str = None) -> str:
        stmt = "SELECT * FROM "
        total_target = len(targets)
        counter = 0
        for target in targets:
            counter += 1
            if counter != total_target:
                stmt += (target.__name__ + ",")
            else:
                stmt += target.__name__ + "\n"
        if filter != None:
            stmt += "WHERE \n"
            stmt += filter
        stmt += ";"
        stmt = stmt.replace("User", "`User`", -1)
        stmt = stmt.replace("Comment", "`Comment`", -1)
        return stmt
    """ 
        INSERT INTO target_table 
        VALUES (target_value.xx, ...)
        ;
    """
    @staticmethod
    def createSQLInsertStmt(target_record: BaseDBObject) -> str: 
        """ 
            生成的过程不需要添加primary id，即跳过第一个 
        """
        target_table_name = type(target_record).__name__
        stmt = "INSERT INTO " + target_table_name + " "
        counter = 0
        attr_name_to_insert = []
        attr_values_to_insert = []
        for attr_name, attr_value in target_record.__dict__.items():
            if counter == 0:
                counter += 1
                continue
            else:
                attr_name_to_insert.append(attr_name)
                attr_values_to_insert.append(attr_value)
        
        stmt += "("
        last_attr_index = len(attr_name_to_insert) - 1
        index = -1
        for attr_name in attr_name_to_insert:
            index += 1
            if index != last_attr_index:
                stmt = stmt + attr_name + ","
            else:
                stmt = stmt + attr_name + ")\n"
        
        stmt += "VALUES ("
        index = -1
        for attr_value in attr_values_to_insert:
            index += 1
            if attr_value == None:
                attr_value = "null"
            else:
                if isinstance(attr_value, int):
                    attr_value = str(attr_value)
                else:
                    attr_value = attr_value
            if index != last_attr_index:
                stmt = stmt + attr_value + ","
            else:
                stmt = stmt + attr_value + ")\n"

        stmt += ";"
        stmt = stmt.replace("User", "`User`", -1)
        stmt = stmt.replace("Comment", "`Comment`", -1)
        return stmt

    """
        DELETE FROM table_name
        WHERE id = xx 
    """
    @staticmethod
    def createSQLDeleteStmt(target_record: BaseDBObject) -> bool:
        stmt = "DELETE FROM " + type(target_record).__name__ + "\nWHERE "
        (target_id_attr, target_id_value) = [item for item in target_record.__dict__.items()][0]
        stmt += (target_id_attr + " = " + str(target_id_value))
        stmt = stmt.replace("User", "`User`", -1)
        stmt = stmt.replace("Comment", "`Comment`", -1)
        return stmt

    @staticmethod
    def createSQLUpdateStmt(target_record: BaseDBObject) -> str:
        stmt = "UPDATE " + type(target_record).__name__ + "\nSET\n"
        attrs = [item for item in target_record.__dict__.items()]
        total_attrs_cnt = len(attrs)
        counter = 0
        for attr_name, attr_value in attrs:
            if counter == 0:
                counter += 1
                continue

            if attr_value == None:
                stmt += ("\t" + attr_name + " = null")
            else:
                if isinstance(attr_value, int):
                    stmt += ("\t" + attr_name + " = " + str(attr_value))
                else:
                    stmt += ("\t" + attr_name + " = " + "\"" + attr_value + "\"")
            if counter != total_attrs_cnt - 1:
                stmt += ","
            stmt += "\n"
            counter += 1
        
        stmt += ("WHERE " + attrs[0][0] + " = " + str(attrs[0][1]))
        stmt = stmt.replace("User", "`User`", -1)
        stmt = stmt.replace("Comment", "`Comment`", -1)
        return stmt

    @staticmethod
    def parseSQLExecuteStmt(engine : Engine, target : type, stmt : str) -> List[BaseDBObject]:
        res_list : List[BaseDBObject] = []
        if not issubclass(target, BaseDBObject):
            if target.__name__ != None:
                print("< " + target.__name__ + " is not " + BaseDBObject.__name__ + " > ")
            else:
                print("< " + target.__class__.__name__ + " is not " + BaseDBObject.__name__ + " > ")
            return
        if stmt.strip().find("SELECT") != -1:
            results = engine.execute(stmt)
        else:
            results = []
            engine.execute(stmt)
        print(results)
        for res in results:
            res_list.append(target(res))
        return res_list