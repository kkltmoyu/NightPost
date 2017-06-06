class Post{
	constructor(title,category,content,author,file){
		this.title = title;
		this.category = category;
		this.content = content;
		this.author = author;
		this.file = file;
		this.date = new Date();
		//date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes()
	}

 	toString(){
		console.log('title is ',this.title,',category is ',this.category);
	}
}

module.exports = Post;