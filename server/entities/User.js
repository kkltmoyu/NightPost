class User{
	constructor(username,password){
		this.username = username;
		this.password = password;
	}

 	toString(){
		console.log('username is ',this.username,',password is ',this.password);
	}
}

module.exports = User;