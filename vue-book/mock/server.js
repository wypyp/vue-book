let http = require('http');
let fs = require('fs');
let url = require('url');
// 获取轮播图 sliders;
let sliders = require('./sliders.js');
let hot = require('./book.json');
function read(cd) {
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err || data.length == 0){
      cd([]); // 如果有错误，或者文件灭有长度，就是空数据
    }else{
      cd(JSON.parse(data)); // 将都出来的内容转换成对象
    }
  })
}
function write(data,cb) {
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}
let pageSize = 5;// 每页显示5
http.createServer((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');


  if(req.method=="OPTIONS") {
     return res.end();
  }
  let {pathname,query} = url.parse(req.url,true); // true  转换成对象
  if(pathname === '/page'){
    let offset = parseInt(query.offset) || 0; // 拿到前端传递的值
    read(function (books) {
      // 每次偏移量 在偏移的基础上增加五条
      let result = books.reverse().slice(offset,offset+pageSize);
      let hasMore = true;// 默认有更多；
      if(books.length<=offset+pageSize){ // 已经显示的数目大于总共条数
        hasMore = false;
      }
      setTimeout(()=>{
        res.end(JSON.stringify({hasMore,books:result}))
      },2)
    })
    return
  }
  if(pathname === '/sliders'){
    res.setHeader('Content-Type','application/json;charset=utf8');
    return res.end(JSON.stringify(sliders));
  }
  if(pathname === '/hot'){
      read(function (books) {
        let hot = books.reverse().slice(0,6);
        res.setHeader('Content-Type','application/json;charset-utf8');
        setTimeout(()=>{
          res.end(JSON.stringify(hot));
          },1000)
      })
    return
  }
  if(pathname == '/book'){ // 书的增删改查
    let id= parseInt(query.id);// 取出的是字符串
    if(typeof id!=='undefined' && !isNaN(id)){ // 查询一个
      read(function (books) {
        let book = books.find(item=>item.bookId===id);
        if(!book) book = {};
        res.setHeader('Content-Type','application/json;charset-utf8');
        res.end(JSON.stringify(book))
      })
    }else{ // 获取所有图书
      read(function (books) {
        res.setHeader('Content-Type','application/json;charset-utf8');
        res.end(JSON.stringify(books.reverse()))
      })
    }
    switch(req.method){
      case 'GET':
        break;
      case "POST":
        let str = '';
        req.on('data',chunk=>{
          str+=chunk;
        });
        req.on('end',function () {
          let book = JSON.parse(str); //转成对象
          read(function (books) { // 添加id
            book.bookId = books.length ? books[books.length-1].bookId+1 :1;
            books.push(book); // 放到内存中书的集合，将数据放到books ,books 在内存
            write(books,function () {
                res.end(JSON.stringify(book))
            })
          })
        })
        break;
      case 'PUT':
        if(id){ // 获取了当前要修改的ID
          let str = '';
          req.on('data',chunk=>{
            str+=chunk;
          });
          req.on('end',()=>{
            let book = JSON.parse(str); // book 要该车个什么样子
            read(function (books) {
              books = books.map(item=>{
                if(item.bookId === id){ // 找到id 相同的拿一本书
                  return book;
                }
                return item; // 正常返回
              })
              write(books,function () {// 将数据写回JSON  中
                res.end(JSON.stringify(book));
              })
            })
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item =>item.bookId !==id);
          write(books,function () {
            res.end(JSON.stringify({})); // 删除返回空对象
          })
        })
        break;
    }
    return
  }
  // 读取一个路径
  // fs.stat('.'+pathname,function (err,stats) {
  //   if(err){
  //     // res.statusCode = 404;
  //     // res.end('not found');
  //     fs.createReadStream('index.html').pipe(res);
  //   }else{
  //     fs.createReadStream('.'+pathname).pipe(res);
  //     // if(stats.isDirectory){
  //     //   let p = require('path').join('.'+pathname,'./index.html');
  //     //   fs.createReadStream(p).pipe(res);
  //     // }else{
  //     //   fs.createReadStream('.'+pathname).pipe(res);
  //     // }
  //   }
  // });
}).listen(7000);
