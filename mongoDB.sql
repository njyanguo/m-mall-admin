#mongo脚本
#创建数据库
use mall
# 插入数据
db.users.insert({
	username : 'admin',
	password : 'e10adc3949ba59abbe56e057f20f883e',
	avatar   : '',
	tel      : 15924587741,
	email    : '12700001@qq.com',
	nickname : 'zhansfd',
	gender   : 'M',
	birthday : ISODate("1989-02-22T03:03:37.312Z"),
	loginAttempts: 0,
    lockUntil: 0,
	create_at: new Date(),
	update_at: new Date()
});
{
    "_id" : ObjectId("5915beb9b393551a840bb244"),
    "username" : "admin",
    "password" : "e10adc3949ba59abbe56e057f20f883e",
    "create_at" : ISODate("2017-05-12T13:55:02.922Z"),
    "loginAttempts" : 0,
    "__v" : 0,
    "avatar" : "uploads/MUDkekMQkcAhtmwwILS5cwfoma4RdjXKuEg7hsehn9MB1SRUAPuKx6V5XTh6Pn3sb6qEyChkNhc614lP5NttQFZfDumXxk21504705311000.JPG",
    "update_at" : ISODate("2017-09-06T13:42:28.550Z"),
    "birthday" : ISODate("2017-09-06T13:41:58.690Z"),
    "email" : "sdfdd@163.com",
    "gender" : "male",
    "nickname" : "团你",
    "tel" : 12345678901.0
}