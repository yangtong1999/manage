<template>
	<div class="forms" id="handle">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学号" prop="studentid">
          <el-input v-model="ruleForm.studentid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
  	       <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="爱好" prop="hobby">
  	     <el-input v-model="ruleForm.hobby"></el-input>
         </el-form-item>
         <el-form-item>
         	<el-col :span="11">
                <el-button type = "primary" @click= "submitForm('ruleForm')">添加</el-button>
            </el-col>
            <el-col :span="11">
                <el-button @click="hideForm" type = "primary">关闭</el-button>
            </el-col>
         </el-form-item>
        </el-form>
	  </div>
  </template>
 <style scoped>
  	.forms{
  		width: 500px;
  		height: 300px;
  		box-shadow: 5px 5px 5px 5px #e1e1e1;
  		/*margin-top: -300px;*/
  		margin: -300px 0  0 300px;
  		background-color: white;
  		z-index: 1000;
  	}
  	.el-form{
  		padding: 40px 80px 20px 0px;
  	}
 </style>
 <script>
 	import axios from 'axios'
  export default {
    data() {
      return {
        ruleForm: {
          studentid: '',
          name:'',
          hobby:''
        },
        rules: {
          studentid: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 10, max: 10, message: '长度为10个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      	var ss = this;
      	var param = {
      		name:'ss.ruleForm.name' 
      	}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://127.0.0.1:3000/change',param).then(function(response){
            	console.log(response);
            }).catch(function(err){
            	console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      hideForm(){
          this.$emit('hideForm');
      }
    }
  }
</script>