##### 【运行】
&gt; 启动MongoDB：     
    1）配置存储数据 的地址：       
    cmd -> MongoDB\bin      
    `mongod --dbpath d:\data`（浏览器打开 http://localhost:27017）        
    2）cmd -> mongo      
    （执行命令 如：`show dbs`，`db`，`use dbName`，`show tables`，`db.tableName.find()`）       

&gt; `npm run MongoDB`

##### 【文件结构】
        
**index.js**：入口程序      

&gt; 定义了增、删、改、查方法。       
&gt; 顶部定义了 数据库 和 连接的表的表名。          
  

