from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@localhost/project_db"
    JWT_SECRET_KEY = "project"