<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <el-row>
    <el-row>
      <el-col :span="6"><i class="el-icon-warning" style="color: red;margin-right: 5px"></i>收入统计</el-col>
      <el-col :span="6"><el-button type="primary" @click="change(0)">饼状图</el-button></el-col>
      <el-col :span="6"><el-button type="primary" @click="change(1)">柱形图</el-button></el-col>
      <el-col :span="6"><el-button type="primary" @click="change(2)">折线图</el-button></el-col>
    </el-row>
    <el-row>
      <div id="main1" style="width: 600px;height: 450px;margin: 0 auto;margin-top: 20px" v-show="type===0"></div>
    </el-row>
    <el-row>
      <div id="main" style="width: 600px;height: 450px;margin: 0 auto;margin-top: 20px" v-show="type===1"></div>
    </el-row>
    <el-row>
      <div id="main2" style="width: 600px;height: 450px;margin: 0 auto;margin-top: 20px" v-show="type===2"></div>
    </el-row>
  </el-row>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: '',
    data () {
      return {
        type: 0,
        charts: '',
        opinion:['普通单人间（200/天）','豪华单人间（300/天）','普通双人间（400/天）','豪华双人间（500/天）','总统套房（600/天）'],
        opinionData:[
          {value:400, name:'普通单人间（200/天）'},
          {value:1200, name:'豪华单人间（300/天）'},
          {value:800, name:'普通双人间（400/天）'},
          {value:1000, name:'豪华双人间（500/天）'},
          {value:600, name:'总统套房（600/天）'}
        ]
      }
    },
    methods:{
      change(value) {
        if (value=== this.type) {
          return
        }
        this.type = value
      },
      drawZX(id) {
        let data = [["2019-01",135],["2019-02",86],["2019-02",73]];

        var dateList = data.map(function (item) {
          return item[0];
        });
        var valueList = data.map(function (item) {
          return item[1];
        });

        let option = {

          // Make gradient line here
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],


          title: [{
            left: 'center',
            text: ''
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: dateList
          }],
          yAxis: [{
            splitLine: {show: false}
          }],
          grid: {
            top: '4%',
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
          },
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }]
        };
        this.charts=echarts.init(document.getElementById(id))
        this.charts.setOption(option)
      },
      drawZZ(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '1月', '2月', '3月', '4月'],
              ['普通单人间', 50, 50, 50, 53.3,100],
              ['豪华单人间', 86.5, 92.1, 85.7, 83.1],
              ['普通双人间', 24.1, 67.2, 79.5, 86.4],
              ['豪华双人间', 86.5, 92.1, 85.7, 83.1],
              ['总统套房', 24.1, 67.2, 79.5, 86.4],
            ]
          },
          xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
          ],
          yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
          ],
          grid: [
            {bottom: '55%'},
            {top: '55%'}
          ],
          series: [
            // These series are in the first grid.
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // These series are in the second grid.
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
          ]
        })
      },
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.opinion
          },
          series: [
            {
              name:'收入统计',
              type:'pie',
              radius:['50%','70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.opinionData
            }
          ]
        })
      }
    },
    //调用
    mounted(){
      this.$nextTick(function() {
        this.drawPie('main1')
        this.drawZZ('main')
        this.drawZX('main2')
      })
    }
  }
</script>
<style scoped>
</style>
