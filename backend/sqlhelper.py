from itertools import count
from typing import List
from models import BaseDBObject

class SQLStmtCreator():
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
            pass
        stmt += ";"
        return stmt

    @staticmethod
    def createSQLInsertStmt(targetRecord: BaseDBObject) -> str:
        target_table_name = type(targetRecord).__name__
        stmt = "INSERT INTO " + target_table_name + " "
        """ 生成的过程不需要添加primary id，即跳过第一个 """
        counter = 0
        attr_name_to_insert = []
        attr_values_to_insert = []
        for attr_name, attr_value in targetRecord.__dict__.items():
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
                    attr_value = str("\"" + attr_value + "\"")
            if index != last_attr_index:
                stmt = stmt + attr_value + ","
            else:
                stmt = stmt + attr_value + ")\n"

        stmt += ";"
        stmt = stmt.replace("User", "`User`", -1)
        stmt = stmt.replace("Comment", "`Comment`", -1)
        return stmt

    @staticmethod
    def createSQLDeleteStmt() -> str:
        pass

    @staticmethod
    def createSQLUpdateStmt() -> str:
        pass