var MongoClient = require('mongodb').MongoClient;
var DB = 'mongodb://localhost:27017/icelyDB'; // 数据库为 icelyDB
var COLLECTION = 'col'; // 连接的表 col

// 插入数据
var insertData = function ( collection, callback ) {
    var _data = [
        { "name": "icely", "age": 23 },
        { "name": "momo", "age": 24 },
    ];
    collection.insert( _data, function ( err, result ) {
        if( err ) console.log( err );
        else callback( result );
    });
};

// 读取数据
getData = function ( collection, callback ) {
    var _whereData = { "name": "icely" };
    collection.find( _whereData ).toArray( function ( err, result ) {
        if( err ) console.log( err );
        else callback( result );
    });
};

// 更新数据
updateData = function ( collection, callback ) {
  var _whereData = { "name": "icely" };
  var _updateData = { $set: { "age": "25" } };
  collection.update( _whereData, _updateData, function ( err, result ) {
      if( err ) console.log( err );
      else callback( result );
  });
};

// 删除数据
delData = function ( collection, callback ) {
  var _whereData = { "name": "icely" };
  collection.remove( _whereData, function ( err, result ) {
      if( err ) console.log( err );
      else callback( result );
  });
};


MongoClient.connect( DB, function ( err, db ) {
    console.log('连接成功！');
    var collection = db.collection(COLLECTION);// 连接到表 col

    insertData( collection, callback ); // 插入
    // getData( collection, callback ); // 读取
    // updateData( collection, callback ); // 更新
    // delData( collection, callback ); // 删除

    // 回调函数
    function callback( result ) {
        console.log( result );
        db.close();
    }
});

