//db
const DBWRITEINSUCCESS ={code:'1001',msg:'数据库写入成功'}
const DBGETUSERSUCCESS ={code:'1002',msg:'数据库获取用户名密码成功'}
const LOGINSUCCESS ={code:'1003',msg:'用户登录成功'}
const REGISTERSUCCESS ={code:'1004',msg:'用户注册成功'}
const USERALREADYLOGIN ={code:'1005',msg:'用户已登录'}
const USERALREADYLOGOUT ={code:'1006',msg:'用户已注销登录'}
const SAVESUCESS = {code:'1007',msg:'信息保存成功'}
const QUERYSUCCESS = {code:'1008',msg:'信息查询成功'}
const FINDNOTHING = {code:'1009',msg:'无法找到相关记录'}
const USERISEXIST = {code:'1010',msg:'该用户已存在'}

const DBCONNECTFAIL ={code:'0010',msg:'数据库连接失败'}
const DBCOLLECTIONFAIL ={code:'0011',msg:'数据库获取指定collection失败'}
const DBWRITEINFAIL ={code:'0012',msg:'数据库写入失败'}
const WRONGPASSWORD ={code:'0013',msg:'用户密码错误'}
const UNEXISTEDNAME ={code:'0014',msg:'该用户不存在'}
const USERNOTLOGIN ={code:'0015',msg:'该用户未登录'}
const SAVEFAIL = {code:'0016',msg:'信息保存失败'}
const QUERYFAIL = {code:'0017',msg:'信息查询失败'}
const DBUNKNOWNERROR ={code:'0019',msg:'数据库遇到未知错误'}
const SERVEREXCEPTION ={code:'0020',msg:'服务器出现异常'}
// 0010:数据库连接失败
// 0011:数据库写入失败
// 0012:数据库获取指定collection失败
// 0019:数据库遇到未知错误
// 
module.exports = {SERVEREXCEPTION,USERISEXIST,FINDNOTHING,QUERYSUCCESS,QUERYFAIL,DBWRITEINSUCCESS,DBGETUSERSUCCESS,LOGINSUCCESS,REGISTERSUCCESS,USERALREADYLOGIN,USERALREADYLOGOUT,SAVESUCESS,DBCONNECTFAIL,DBWRITEINFAIL,DBCOLLECTIONFAIL,WRONGPASSWORD,UNEXISTEDNAME,USERNOTLOGIN,SAVEFAIL,DBUNKNOWNERROR}