#encoding:utf-8

import os

DEBUG=True

SECRET_KEY = os.urandom(24)

# 数据库配置
HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'dpsv'
USERNAME = 'root'
PASSWORD = 'root'

# https://dev.to/blankgodd/connecting-to-a-mysql-database-with-sqlalchemy-lmc
# 需要安装mysqlconnector
DB_URI = 'mysql+mysqlconnector://{}:{}@{}:{}/{}'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)

SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = False
