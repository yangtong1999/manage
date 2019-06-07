<template>
  <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
</template>
<style scoped>
	#myChart{
		margin:0 auto;
	}
</style>
<script type="text/javascript">
	import axios from 'axios'
	export default{
		data(){
			return{
			  datas:[]
			}
		},
		mounted(){
          this.drawLine();
		},
		methods:{
			drawLine(){
				var s = this;
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '任务分布',x:'center' },
            tooltip: {},
            xAxis: {
                data:[]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: []
            }]
        });
        myChart.showLoading(); 
        var names=[]; 
        var nums=[];  
        axios.get('http://127.0.0.1:3000/please').then(function(res){
                var result = res.data;
                     if (result){
                    for(var i=0;i<result.length;i++){
                        names.push(result[i].name);    //挨个取出类别并填入类别数组
                     }
                    for(var i=0;i<result.length;i++){
                        nums.push(result[i].num);    //挨个取出销量并填入销量数组
                      }
                    myChart.hideLoading();    //隐藏加载动画
                    myChart.setOption({        //加载数据图表
                        xAxis: {
                            data: names
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                            name: '销量',
                            data: nums
                        }]
                    });

             }
           }).catch(function(err){
           console.log(err);
       });
}

}
}
</script>