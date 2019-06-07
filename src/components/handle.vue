<template>
  <div class="handle">
    <div class="pop">
    	<el-button slot="reference" @click="visible = !visible">添加信息</el-button>
      <el-input v-model="searchData" placeholder="根据id搜索" class = "puts" size="medium"></el-input>
    	<el-button slot="reference" @click="search">搜索信息</el-button>
    <!-- 添加数据弹窗 -->
  	<el-popover
    placement="bottom"
    width="400"
    trigger="manual"
    v-model="visible">
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
                <el-button type = "primary" @click="submitForm('ruleForm')">添加</el-button>
            </el-col>
            <el-col :span="11">
                <el-button type = "primary" @click="visible = false">关闭</el-button>
            </el-col>
         </el-form-item>
        </el-form>
  </el-popover>
    </div>
    <!-- 数据显示表格 -->
  	<el-table
    :data = "tableData"
    stripe>
    <el-table-column
    prop = "studentid"
      label="学号"
      width="180">
      <template slot-scope="scope">
            <template>
            <el-input v-show="scope.row.edit" v-model="scope.row.studentid"></el-input>
            <span v-show = "!scope.row.edit">{{ scope.row.studentid}}</span>
            </template>  
      </template> 
    </el-table-column>
    <el-table-column
    prop = "name"
      label="姓名"
      width="180">
      <template slot-scope="scope">
            <template>
            <el-input v-show="scope.row.edit" v-model="scope.row.name"></el-input>
            <span v-show = "!scope.row.edit">{{ scope.row.name}}</span>
            </template>  
      </template>
    </el-table-column>
    <el-table-column
    prop = "hobbies"
      label="爱好">
      <template slot-scope="scope">
            <template>
            <el-input v-show="scope.row.edit" v-model="scope.row.hobbies"></el-input>
            <span v-show = "!scope.row.edit">{{ scope.row.hobbies}}</span>
            </template>  
      </template>
    </el-table-column>
    <el-table-column
    prop = "id"
      label="id">
      <template slot-scope="scope">
            <template>
            <el-input v-show="scope.row.edit" v-model="scope.row.id" disabled></el-input>
            <span v-show = "!scope.row.edit">{{ scope.row.id}}</span>
            </template>  
      </template>
    </el-table-column>
    <el-table-column label="删除信息">
    	<template slot-scope="scope">
        <el-button type="primary" size="mini" @click.native = "deleted(scope.row.id)">删除信息</el-button>
      </template>
    </el-table-column>
    <el-table-column label="修改信息">
    	<template slot-scope="scope">
        <el-button type="success" size="mini" v-if="scope.row.edit" icon="el-icon-circle-check-outline" @click="scope.row.edit=!scope.row.edit;modifi(scope.row)">修改</el-button>
 
           <el-button v-else type="primary" size="mini" @click=" scope.row.edit=!scope.row.edit" icon="el-icon-edit" >编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<style scoped>
   .puts{
     width: 200px;
  }
	.el-table{
		width: 800px;
		height: auto;
		margin:50px auto;
		border:solid 1px #e1e1e1;
    /*z-index: -1;*/
	}
  .el-button{
  	cursor: pointer;
  }
  .pop{
  	margin:20px 0 0 400px;
  }
  .el-form{
  	padding: 10px 40px 0 0;
  }
</style>
<script>
	import axios from 'axios'
  export default {
    data() {
      return {
        tableData:[],//表格数据
         visible: false,
         searchData:'',
         ruleForm: {
          studentid: '',
          name:'',
          hobby:'',
        },
        rules: {
          studentid: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 10, max: 10, message: '长度为10个字符', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          hobby:[
            { required: true, message: '请输入爱好', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //获取表格数据
    	gets:function(){
        var ss = this;
            axios.get('http://127.0.0.1:3000/gets')
            .then(function (response) {
            	console.log(response);
              console.log(response.data.students);
              return ss.tableData = response.data.students;
            }).catch(function (err) {
            	console.log(err);
            })
    	},
      //提交添加信息并验证
    	submitForm(formName) {
      	var ss = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            axios.get('http://127.0.0.1:3000/change',{
              params:{
                studentid:ss.ruleForm.studentid,
                name:ss.ruleForm.name,
                hobbies:ss.ruleForm.hobby
              }
            })
           .then(function (response) {
              console.log(response);
              if(response.status==200){
              	alert("添加成功");
              }
            })
            .catch(function (error) {
            console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除数据
      deleted(id){
        axios.get('http://127.0.0.1:3000/delete',{
        	params:{
        		id:id
        	}
        }).then(function(response){
        	console.log(response);
        	if(response.status==200){
              	alert("删除成功");
              }else{
              	alert("删除失败");
              }
        })
      },
      //更新数据
      modifi(row){
         axios.get('http://127.0.0.1:3000/update',{
          params:{
            id:row.id,
            studentid:row.studentid,
            name:row.name,
            hobbies:row.hobbies
          }
         }).then(function(res){
            console.log(res);
            if(res.status==200){
                alert("修改成功");
              }else{
                alert("修改失败");
              }
         }).catch(function(err){
          console.log(err);
         })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //查找数据
      search(){
        var hh = this;
        let resultData = hh.tableData.filter(data=>{
         //日期假设date,人名 name
         if(data.id ==hh.searchData){ //此处根据具体需求判断
         return true;
        }
      });
        hh.tableData = resultData;
      }
    },
    mounted:function(){
      this.gets();
    }
  }
</script>
