var constants = require('../constants');
var ObjectID = require('mongodb').ObjectID;

function saveData(mongoDb, collectionName, data, callback) {
    try{
        mongoDb.open(function(err, db) {
            if (err) {
                mongoDb.close();
                console.log('An error has occurred in function saveData ,msg is ', err);
                return callback(constants.DBCONNECTFAIL);
            }
            db.collection(collectionName, function(err, collection) {
                if (err) {
                    console.log('An error has occurred in function saveData,msg is ', err);
                    mongoDb.close();
                    return callback(constants.DBCOLLECTIONFAIL);
                }
                collection.insert(data, function(err, data) {
                    mongoDb.close();
                    if (err) {
                        console.log('An error has occurred in function saveData,msg is ', err);
                        return callback(constants.DBWRITEINFAIL);
                    }
                    return callback(constants.SAVESUCESS);
                })
            })
        })
    }
    catch(e){
        return callback(constants.SERVEREXCEPTION);
    }
}

function getData(mongoDb, collectionName, username, callback) {
    try{
        mongoDb.open(function(err, db) {
            if (err) {
                mongoDb.close();
                console.log('An error has occurred in function getData,msg is ', err);
                return callback(constants.DBCONNECTFAIL, null);
            }
            db.collection(collectionName, function(err, collection) {
                if (err) {
                    console.log('An error has occurred in function getData,msg is ', err);
                    mongoDb.close();
                    return callback(constants.DBCONNECTFAIL, null);
                }
                collection.findOne({ username: username }, function(err, user) {
                    mongoDb.close();
                    if (err) {
                        console.log('An error has occurred in function getData,msg is ', err);
                        return callback(constants.DBCONNECTFAIL, null);
                    }
                    return callback(constants.DBGETUSERSUCCESS, user);
                })
            })
        })
    }
    catch(e){
        return callback(constants.SERVEREXCEPTION);
    }
}

function userIsExist(mongoDb, collectionName, username, callback){
    try{
        mongoDb.open(function(err, db) {
            if (err) {
                console.log('An error has occurred in function userIsExist,msg is ',err);
                return callback(err,constants.QUERYFAIL);
            }
            db.collection(collectionName, function(err, collection) {
                if (err) {
                    mongoDb.close();
                    console.log('An error has occurred in function userIsExist,msg is ',err);
                    return callback(err,constants.QUERYFAIL);
                }
                collection.findOne({ username: username }, function(err, user) {
                    mongoDb.close();
                    if (err) {
                        console.log('An error has occurred in function userIsExist,msg is ',err);
                        return callback(err,constants.QUERYFAIL);
                    }
                    if(user!==null&&user!==undefined){
                        return callback('exist',constants.USERISEXIST);
                    }
                    else{
                        return callback(null,constants.UNEXISTEDNAME);
                    }
                })
            })
        })
    }
    catch(e){
        return callback(e,constants.SERVEREXCEPTION);
    }
}


function getList(mongoDb,collectionName,data, callback) {
    try{
        mongoDb.open(function(err, db) {
            if (err) {
                mongoDb.close();
                console.log('An error has occurred in function getList,msg is ',err);
                return callback(err,constants.DBCONNECTFAIL);
            }
            db.collection(collectionName, function(err, collection) {
                if (err) {
                    mongoDb.close();
                    console.log('An error has occurred in function getList,msg is ',err);
                    return callback(err,constants.DBCONNECTFAIL);
                }   
                collection.count({}, function(err, count) {
                    collection.find({}, {
                        limit: parseInt(data.pageSize),
                        skip: (parseInt(data.currentPage) - 1) * parseInt(data.pageSize)
                    }).sort({
                        date: -1
                    }).toArray(function(err, list) {
                        mongoDb.close();
                        var page = {};
                        page["count"] = count;
                        page["pageSize"] = data.pageSize;
                        page["currentPage"] = data.currentPage;
                        return callback(null, list, page);
                    })
                });
            })
        })
    }
    catch(e){
        return callback(e,constants.SERVEREXCEPTION);
    }
}

function getDetail(mongoDb,collectionName,params,callback){
    try{
        mongoDb.open(function(err, db) {
            if (err) {
                mongoDb.close();
                console.log('An error has occurred in function getDetail,msg is ',err);
                return callback(err,constants.DBCONNECTFAIL);
            }
            db.collection(collectionName
                    , function(err, collection) {
                    collection.findOne({
                        "date": params.date,
                        "title": params.title
                    }, function(err, oneDoc) {
                        if(!err){
                            if (oneDoc) {
                                mongoDb.close();
                                //var test = new Buffer(oneDoc.file,'base64').toString();
                                return callback(null, oneDoc,constants.QUERYSUCCESS);
                            }
                            else{
                                return callback(null, oneDoc,constants.FINDNOTHING);
                            }
                        }
                        else{
                            return callback(constants.QUERYFAIL);
                        }
                })
            })
        })
    }
    catch(e){
        return callback(constants.SERVEREXCEPTION);
    }
}

function saveComment(mongoDb,collectionName,target,data, callback){
    try{
        var date = new Date()
        mongoDb.open(function(err, db) {
            db.collection(collectionName, function(err, collection) {
                collection.update({
                    "_id": ObjectID(target),
                }, { $push: { "comments": data } }, function(err) {
                    if (err) {
                        mongoDb.close();
                        console.log('An error has occurred in function saveComment,msg is ',err);
                        return callback(err,constants.SAVEFAIL);
                    }
                    mongoDb.close();
                    return callback(null,constants.SAVESUCESS)
                })
            })
        })
    }
    catch(e){
        return callback(e,constants.SERVEREXCEPTION);
    }
}

function countCategoryData(mongoDb,collectionName,callback){
    try{
        mongoDb.open(function(err, db) {
            db.collection(collectionName, function(err, collection) {
                var condition = [{'$group':{'_id':'$category','count':{'$sum':1}}},{'$project': {'category':'$_id','_id':0,'count':1}}];
                collection.aggregate(condition, function(err,result) {
                    if (err) {
                        mongoDb.close();
                        console.log('An error has occurred in function countCategoryData,msg is ',err);
                        return callback(err,constants.QUERYFAIL,null);
                    }
                    if(result.length === 0){
                        mongoDb.close();
                        return callback(null,constants.FINDNOTHING,null);
                    }
                    mongoDb.close();
                    return callback(null,constants.QUERYSUCCESS,result)
                })
            })
        })
    }
    catch(e){
        return callback(e,constants.SERVEREXCEPTION);
    }
}

function getPostNoByDate(mongoDb,collectionName,date,callback){
    try{
        mongoDb.open(function(err, db) {
            db.collection(collectionName, function(err, collection) {
                var condition = [{'$match':{'date':{'$gt':date}}},{'$sort': { date : -1 }} ,{$group:{_id:{$dateToString: { format: '%Y-%m-%d', date: '$date' }},count:{$sum:1}}},{'$project': {'date':'$_id','_id':0,'count':1}}];
                collection.aggregate(condition, function(err,result) {
                    if (err) {
                        mongoDb.close();
                        console.log('An error has occurred in function getPostNoByDate,msg is ',err);
                        return callback(err,constants.QUERYFAIL,null);
                    }
                    if(result.length === 0){
                        mongoDb.close();
                        return callback(null,constants.FINDNOTHING,null);
                    }
                    mongoDb.close();
                    return callback(null,constants.QUERYSUCCESS,result)
                })
            })
        })  
    }
    catch(e){
        return callback(e,constants.SERVEREXCEPTION);
    }
}


module.exports = {getPostNoByDate,countCategoryData,saveData, getData, getList, getDetail,saveComment,userIsExist };
