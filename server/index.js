const SERVERPORT ='8001';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
// var index = require('./controller/index');
var session = require('express-session')
var mongoConnect = require('connect-mongo')(session)
var Server = require('mongodb').Server
var Db = require('mongodb').Db
var mongoDb = new Db('nightPost', new Server('localhost', 27017, { safe: true }));

var User = require('./entities/User')
var Post = require('./entities/Post')
var Comment = require('./entities/Comment')
var Dao = require('./dao/index');

var constants = require('./constants');

//设置maxlistener
require('events').EventEmitter.prototype._maxListeners = 100;

var app = express();
app.use(cookieParser())
app.use(session({
    secret: 'night', //用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
    key: 'nightPost', //字符串,用于指定用来保存session的cookie名称,默认为coomect.sid.
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7200000,secure: false},
    //session存入mongodb而非内存
    store: new mongoConnect({ //属性值为一个用来保存session数据的第三方存储对象
        url: 'mongodb://localhost/nightPost'
    })
}))

app.use(bodyParser.urlencoded({ limit:'5mb',extended: true }));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type=application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method == 'OPTIONS') {
    console.log('option');
    //res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
 

app.post('/register', function (req, res) {
  const username=req.body.username;
  const password=req.body.password;

  Dao.userIsExist(mongoDb,'users',username,function(err,result){
    if(err)
      res.send(JSON.stringify({ result })).end();
    else{
      var user = new User(username,password);
      Dao.saveData(mongoDb,'users',user,function(result){
        res.send(JSON.stringify({ result })).end();
      });
    }
  });
})

app.post('/login', function (req, res) {
  const username=req.body.username;
  const password=req.body.password;

  var user = new User(username,password);
  Dao.getData(mongoDb,'users',username,function(result,user){
    if(result.code === '1002'){
      if(user){
        if(password === user.password){
          var result = constants.LOGINSUCCESS;
          req.session.user = user
          result['userInfo']=user;
          res.send(JSON.stringify(result)).end();
        }
        else
          res.send(JSON.stringify(constants.WRONGPASSWORD)).end();
        }
      else
        res.send(JSON.stringify(constants.UNEXISTEDNAME)).end();
    }
    else
      res.send(JSON.stringify({ code: result.code, messgage: result.msg})).end();
  });
})


app.post('/checkIsLogin', function (req, res) {
  if (req.session.user) {
      var result = constants.USERALREADYLOGIN;
      result['userInfo'] = req.session.user;
      return res.json(result);
    } else {
       // return res.json({ code: 1001, messgage: "未登录" })
       //console.log('req.session.user is null');
       return res.json(constants.USERNOTLOGIN);
    }
})

app.post('/logOut', function (req, res) {
  req.session.user = null;
  return res.json(constants.USERALREADYLOGOUT);
})

app.post('/recordPost',function (req, res) {
  var post = new Post(req.body.title,req.body.category,req.body.content,req.body.author,req.body.file);
  Dao.saveData(mongoDb,'posts',post,function(result){
     res.send(JSON.stringify({ result })).end();
  });
})

app.post('/getList',function(req,res){
  var currentPage = req.body.currentPage;
  var pageSize = req.body.pageSize;
  var data = {'currentPage':currentPage,'pageSize':pageSize};
  Dao.getList(mongoDb,'posts',data,function(err, list, page){
    var result = {};
    result["data"] = list;
    result["page"] = page;
    res.send(JSON.stringify({ result })).end();
  });
})

app.post('/:title/:day',function(req,res){
  var date = new Date(req.body.date)
  var data = {'title':req.body.title,'date':date}
  Dao.getDetail(mongoDb,'posts',data,function(err,detail,result){
    if(!err){
      if(detail){
        result["detail"] = detail;
        res.send(JSON.stringify( result )).end();
      }
      else{
        res.send(JSON.stringify( result )).end();
      }
    }
    else{
      res.send(JSON.stringify( err )).end();
    }
  });
})

app.post('/submitComment',function(req,res){
  var comment = new Comment(req.body.user,req.body.comment);
  var articleId = req.body.articleId;
  Dao.saveComment(mongoDb,'posts',articleId,comment,function(err,result){
    if(!err){
      res.send(JSON.stringify( result )).end();
    }
    else{
      console.log('submit comment occurs error,msg is ',err);
      res.send(JSON.stringify( result )).end();
    }
  });
})



app.post('/countCategoryData',function(req,res){
  Dao.countCategoryData(mongoDb,'posts',function(err,result,data){
    if(err)
      res.send(JSON.stringify( data )).end();
    if(data === null)
      res.send(JSON.stringify( result )).end();
    else{
      result['data']=data;
      res.send(JSON.stringify( result )).end();
    }
  });
})

app.post('/getPostNoByDate',function(req,res){
  var interval = req.body.interval;
  interval = 0 - interval;

  var now = new Date(); 
  now.setDate(now.getDate()+interval); 
  // var month=now.getMonth()+1; 
  // var day = now.getDate(); 
  // if(month<10){ 
  //   month = "0"+month; 
  // } 
  // if(day<10){ 
  //   day = "0"+day; 
  // } 
  // var val = d.getFullYear()+""+month+""+day; 

  Dao.getPostNoByDate(mongoDb,'posts',now,function(err,result,data){
    if(err)
      res.send(JSON.stringify( data )).end();
    if(data === null)
      res.send(JSON.stringify( result )).end();
    else{
      result['data']=data;
      res.send(JSON.stringify( result )).end();
    }
  });
})


 
var server = app.listen(SERVERPORT, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})	




















