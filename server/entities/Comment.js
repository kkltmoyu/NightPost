class Comment{
	constructor(author,comment){
		this.author = author;
		this.comment = comment;
		this.date = new Date();
		//date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes()
	}

 	toString(){
		console.log('author is ',this.author,',comment is ',this.comment);
	}
}

module.exports = Comment;