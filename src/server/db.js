var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var fs = require('fs');
var sd = require('silly-datetime');
var path = require("path");
var url = require('url');
var express = require('express');
var app = express();
//图片上传接口
app.post('/upload',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
       var form = new formidable.IncomingForm();
    //执行里面的回调函数的时候，表单已经全部接受完毕了
    //设置文件上传的地址
    form.uploadDir = "./upload";
    form.parse(req, function(err, fields, files) {
      //所有的文本域、单选框都在fields存放
      //所有的文件域都在files 存放
      if(err){
        throw err;
      }
      console.log(util.inspect({fields:fields,files:files}));
      //时间
      //新的路径由三部分组成，时间戳，随机数，扩展名
      var ttt = sd.format(new Date(), 'YYYYMMDDHHmm');
      var ran = parseInt(Math.random()*89999+10000);
      var extname = path.extname(files.img.name);
      //执行改名
      var oldpath = __dirname +"/"+files.img.path;
      var newpath = __dirname + "/upload/"+ttt+ran+extname;
      fs.rename(oldpath,newpath,function(err){
        if(err){
          throw Error("改名失败");
        }
        res.write('<head><meta charset = "utf-8"/><head>');
      res.end("成功");
      });
    });
});
//获取数据接口
app.get('/gets',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.readFile('db.json','utf8',function(err,data){
    res.end(data);
});
});
//添加数据接口
app.get('/change',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
    fs.readFile('db.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var randomss = Math.random().toString(36).slice(2); // 截取小数点后的字符串

        var datas = {
          studentid:req.query.studentid,
          name:req.query.name,
          hobbies:req.query.hobbies,
          id:randomss,
          edit:0
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.students.push(datas);//将传来的对象push进数组对象中
        person.total = person.students.length;//定义一下总条数，为以后的分页打基础
        console.log(person.students);
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('db.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
            res.end("success");
        })
    })
});
//删除数据接口
app.get('/delete',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.readFile('db.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var id = req.query.id;
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来删除
        for(var i = 0; i < person.students.length;i++){
            if(id == person.students[i].id){
                //console.log(person.data[i])
                person.students.splice(i,1);
            }
        }
        console.log(person.students);
        person.total = person.students.length;
        var str = JSON.stringify(person);
        //然后再把数据写进去
        fs.writeFile('db.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log("----------删除成功------------");
            res.end("success");
        })
    })
})
//修改数据接口
app.get('/update',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.readFile('db.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        var id = req.query.id;
        var params = {
          studentid:req.query.studentid,
          name:req.query.name,
          hobbies:req.query.hobbies
        }
        //把数据读出来,然后进行修改
        for(var i = 0; i < person.students.length;i++){
            if(id == person.students[i].id){
                console.log('id一样的');
                for(var key in params){
                    if(person.students[i][key]){
                        person.students[i][key] = params[key];
                    }
                }
            }
        }
        person.total = person.students.length;
        var str = JSON.stringify(person);
        //console.log(str);
        fs.writeFile('db.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('--------------------修改成功');
            console.log(person.students);
            res.end("success");
        })
    })
});
//数据可视化接口
app.get('/please',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  fs.readFile('view.json','utf8',function(err,data){
    res.end(data);
});
})
app.listen(3000);
  
  