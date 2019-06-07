<template>
  <div>
      <div class="upload_image">
         <h3>图片上传预览实现</h3>
         <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg"
       ref="new_company_image">
       <br>
       <img src="" alt="" id="portrait" />
       <el-button @click = "upload" type="primary" plain>确认上传</el-button>
      </div>
  </div>
</template>
<style scoped>
   .upload_image{
    color: #999999;
    width: 300px;
    height: 400px;
    margin: 50px auto;
    padding: 20px 20px;
    background-color: #f2f6fc;
    border-radius: 10px;
   }
   img{
    margin-top: 20px;
    width: 200px;
    height: 200px;
    background-color: #eeeeee;
   }
   .el-button{
    margin-top: 50px;
   }
</style>
<script>

import axios from 'axios'
  export default {
    methods: {
        
    great: function () {
    document.getElementById('saveImage').onchange = function () {
        var imgFile = this.files[0];
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('portrait').src = fr.result;
        };
        fr.readAsDataURL(imgFile);
      }
    },
    upload:function(){
      
    var file = document.getElementById("saveImage").files[0];
    var formdata1=new FormData();// 创建form对象
    formdata1.append('img',file,file.name);
      axios.post('http://127.0.0.1:3000/upload',formdata1)
      .then(function (response) {
        console.log(response);
       if(response.status==200){
        alert("图片上传成功");
       }else{
        alert("上传失败"+response.status);
       }
      })
      .catch(function (error) {
       console.log(error);
      });
    }
  },
    mounted:function(){
      this.great();
    }
}
</script>