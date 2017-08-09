基本查询语句  http://www.cnblogs.com/zgx/archive/2012/05/17/2505841.html
mongo shell命令行官网：https://docs.mongodb.com/manual/reference/method/#user-management-methods

### 判断数组中是否存在某字段
即把数组当做对象来看待
db.course.find( { "lectures.lectures_count": { $exists: true } } )

### 内嵌文档的查询与更新
db.demo.find({"people_id" : 1, "albums.privilege": 5})
db.demo.update({people_id:2, "albums.id":2}, { $set : {"albums.$.name":6 }})
db.demo.update({people_id:2, "albums.id":2},{ '$push': { 'clockIn': { 'date': date, 'login': time } } ) //往数组中添加数据

### 只获取数组中的特定元素$elemMatch
db.test.find({'favorite_shards.sid': 577}, {favorite_shards:{$elemMatch:{sid:577 }  } }).pretty()


### Mongo.js基本API
# db.close();   关闭数据库连接，
# db.listDatabases(fun(){})     列出所有数据库
# db.authenticate       进行用户登录
# db.shutdownServer() 关闭服务



### Mongo Shell基本命令
# show dbs      查看数据库
# show collections      查看数据集合
# 对应的还有，db.getCollectionNames()
# use name  如果数据库不存在，则创建数据库，否则切换到指定数据库。
# db    查看当前数据库名
# db.dropDatabase()     删除当前数据库
# db.addUser('sa','sa')     在当前数据库下添加用户
# db.<collectName>.insert({name:'momo2'})   在当前数据库中的collect集合中添加一个文档
# db.<collectName>.drop()       删除当前数据库的特定数据集
# db.<collectName>.find()       列出集合中的文档
# db.<collectName>.findOne()    只列出集合中匹配的第一项文档
# db.<collectName>.find().pretty()       以JSON格式化列出集合中的文档
# db.<collectName>.find().limit(NUMBER)  返回特定数量的数据
# db.<collectName>.find({},{"title":1,_id:0}).limit(1).skip(1)       跳过特定行后返回特定行。即相当于只返回特定位置的数据
# db.<collectName>.find({},{"title":1,_id:0}).sort({"likes":-1})     将返回的数据，以特定方式排序。其中1为升序，-1为降序
# db.<collectName>.show()       插入文档你也可以使用 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。
# db.<collectName>.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}}，true,ture)      寻找title为MongoDB的文档，并设置为新的数据.当有多个匹配项时;当无匹配项是否插入;替换找到的第一个还是替换所有找到的匹配项
# db.<collectName>.save()    方法通过传入的文档来替换已有文档。db.collection.save({"_id" : ObjectId("56064f89ade2f21f36b03136"),})      注意：要填入_id值来进行唯一标示
# db.<collectName>.remove({'title':'MongoDB 教程'},true)    用法和update类似，但是默认是删除匹配到的全部;只删除匹配到的第一项
# db.<collectName>.ensureIndex({KEY:1})     语法中 Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可。


# find操作的条件设置，如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：
操作              	格式              	范例                                       	RDBMS中的类似语句
等于	{<key>:<value>}	                    db.col.find({"by":"菜鸟教程"}).pretty()	    where by = '菜鸟教程'
小于	{<key>:{$lt:<value>}}	            db.col.find({"likes":{$lt:50}}).pretty()	where likes < 50
小于或等于	{<key>:{$lte:<value>}}	    db.col.find({"likes":{$lte:50}}).pretty()	where likes <= 50
大于	{<key>:{$gt:<value>}}	            db.col.find({"likes":{$gt:50}}).pretty()	where likes > 50
大于或等于	{<key>:{$gte:<value>}}	    db.col.find({"likes":{$gte:50}}).pretty()	where likes >= 50
不等于	{<key>:{$ne:<value>}}	        db.col.find({"likes":{$ne:50}}).pretty()	where likes !=
匹配数据类型{<key>:{$type:<1~9>}}         db.col.find({"title" : {$type : 2}})
判断字段是否存在                           db.course.find( { "lectures.lectures_count": { $exists: true } } )
# MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，及常规 SQL 的 AND 条件
db.col.find({key1:value1, key2:value2}).pretty()
# MongoDB OR 条件语句使用了关键字 $or,语法格式如下：
db.col.find(
   {
      $or: [
	     {key1: value1}, {key2:value2}
      ]
   }
).pretty()
# AND 和 OR 联合使用
db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()




### mongoDB用户及权限管理
# 官网介绍：https://docs.mongodb.com/manual/reference/method/#user-management-methods

### 创建完全权限的角色和账号。
# 需要先定义角色组，并授予角色组权限
>use admin      // 切换到对应的数据库
switched to db admin
> db.createRole({role:'sysadmin',roles:[],
privileges:[
{resource:{anyResource:true},actions:['anyAction']}     //重点是在 anyResource:true 表示该角色拥有所有数据库的权限
]})
【】db.createRole({role:'QYJK_admin',roles:[],privileges:[{resource:'QYJK',actions:['anyAction']}]})
# 创建特定角色的用户
> use momo  切换到特定数据库
switched to db momo
> db.createUser({
user:'sa',
pwd:'sufeinet.com',
roles:[
{role:'sysadmin',db:'admin'}            // 这里的是 role 就是上面创建的角色， 而db 则是该种角色所在的数据库，（即这个角色是在那个数据库时创建的）
]})
【】 db.createUser({user:'xxx',pwd:'xxx',roles:[{role:'QYJK_admin',db:'QYJK'}]})



### 对应的创建本只在本数据库使用的角色，
# 在创建role前，先切换到对应的数据库。 并将resource:'本数据集名'
db.createRole({role:'QYJK_admin',roles:[],privileges:[{resource:{db:'QYJK',collection:''},actions:['anyAction']}]})
# 在创建user时，{role:'sysadmin',db:'admin'}            // 这里的是 role 就是上面创建的角色， 而db 则是本数据库



# use momo  重新登陆后，需要切换到特定数据库才能进行登陆
# db.auth("sa","sufeinet.com)
# 登陆完成后，可以对任意数据库进行操作

### 查看某个用户的信息
# 修改密码
【】切换到特定数据库  use admin
【】修改该数据库下的用户密码  db.changeUserPassword("username", "xxx")
# 查看用户信息
【】切换到特定数据库  use admin
【】db.runCommand({usersInfo:"userName"})

# 只要其中一个数据库设置了密码，那么登陆所有的数据库都需要先验证。


### 启动认证功能
mongod启动的时候加上 –auth 就可以添加用户验证功能。或者在启动配置文件里加上 auth=true 配置。
>./mongod –auth –dbpath XXX –logpath XXX –fork
>./mongod -f /xx/mongo.cnf




### MongoDB基本概念解释
# 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。
# 层级关系database(数据库)->collection（集合）->document（文档）->field（域）
# 文档是一个键值(key-value)对(即BSON：BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON。)
# 集合就是 MongoDB 文档组，是一组MongoDB的文件,即多个JSON对象。如{}{}{}。无需逗号或分号分隔开
# 如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
  索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

# 保留的数据库：有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库（show dbs）或者关闭服务器(db.shutDown())。当Mongod启用auth选项时，用户需要创建数据库帐号，访问时根据帐号信息来鉴权，而数据库帐号信息就存储在admin数据库下。
local: local数据库，从名字可以看出，它只会在本地存储数据，即local数据库里的内容不会同步到副本集里其他节点上去；目前local数据库主要存储副本集的配置信息、oplog信息，这些信息是每个Mongod进程独有的，不需要同步到副本集种其他节点。
config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。
# 保留的特殊集合：在MongoDB数据库中名字空间 <dbname>.system.* 是包含多种系统信息的特殊集合(Collection)，如下:
dbname.system.namespaces	列出所有名字空间。
dbname.system.indexes	列出所有索引。
dbname.system.profile	包含数据库概要(profile)信息。
dbname.system.users	    列出所有可访问数据库的用户。
dbname.local.sources	包含复制对端（slave）的服务器信息和状态。






### 基本概念
# mongod:mongo软件命令
# mongo:mongo的数据库操作命令，即mongo的Shell环境


### MongoDB特定
# 使用方便，没有表结构改变，使用的是JSON格式
# 方便扩展
# 性能更好


### 安全退出mongo
# 【使用mongo shell中的命令行】
use admin;
db.shutdownServer();
# 【终极方法】
mongod -f conf/mongo.conf
在输出中，找到forked process: 2123
再直接kill 2123
# 是指所有连接他的链接都退出以后，再关闭mongo服务。否则会锁住数据库，无法再次访问
# 包括图形管理工具中，退出该数据库的链接



### lock不能简单地删除，还需要通过垃圾桶进行完全删除才可以重新登录



### Mongo创建服务
# mkdir test
# cd test
# mkdir data
# mkdir bin
# mkdir conf
# mkdir log
# cd log
# touch mongo.log
# ..
# cd conf
# vim mongo.conf
 port = 12345
 dbpath = data
 logpath = log/mongod.log
 fork = true
# mongod -f conf/mongod.conf        启动服务
# mongo 127.0.0.1:12345/test        链接刚刚启动的服务

