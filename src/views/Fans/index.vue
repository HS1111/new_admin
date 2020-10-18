<template>
  <div class="fans-containter">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/fans">粉丝管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "fans-containter",
  data() {
    return {};
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  },
  methods: {}
};
</script>

<style scoped lang="less">
#main{
    margin: 15px 0;
}
</style>
