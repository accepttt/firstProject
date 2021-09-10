<template>
  <div class="all">
    <div class="all-bottom">
      <div class="outpic1">
        <div style="margin-bottom: 60px; font-size: 25px">
          毕业生就业方向统计图
        </div>
        <div id="main1" style="width: 80%; height: 500px"></div>
      </div>

      <div class="outpic2">
        <div style="margin-bottom: 60px; font-size: 25px">
          毕业生各届就业率折线图
        </div>
        <div id="main2" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import listApi from "@/api/selfStudy/list";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    getNumber() {
      var chartDom2 = document.getElementById("main2");
      var myChart2 = echarts.init(chartDom2);
      var option2;
      option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
          name: "年份",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#5470C6",
            },
          },
          data: ["2013", "2014", "2015", "2016", "2017"],
        },
        yAxis: {
          type: "value",
          name: "就业率",
          min: 0,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#5470C6",
            },
          },
          axisLabel: {
            formatter: "{value} %",
          },
        },
        series: [
          {
            data: ["32", 52, 22, 98, 62],
            type: "line",
          },
        ],
      };
      listApi
        .getPolylineData()
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("获取折线图数据成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code
            console.log(res.data);
            let temp = res.data;
            let arr = [];
            temp.forEach((item) => {
              item = Number(item);

              item = item * 100;
              arr.push(item);
            });

            option2.series[0].data = arr;

            option2 && myChart2.setOption(option2);
            // this.majorForm = []

            // this.clearValidate('majorForm')
            // this.majorForm = ({
            //   name: '',
            //   code: '',
            // })
            // this.$refs[formName].resetFields()
          }
        })
        .finally((err) => {
          this.loading = false;
          // 请求接口异常
        });

      var chartDom1 = document.getElementById("main1");
      var myChart1 = echarts.init(chartDom1);
      var option1;
      option1 = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: "40", name: "rose 1" },
              { value: "38", name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      listApi
        .getPiechartData()
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("获取饼状图图数据成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code
            console.log(res, "dddddddd");
            let temp = res.data;

            let arr = Object.keys(temp);

            let resObj = [];
            arr.forEach((item) => {
              resObj.push({ value: temp[item], name: item });
            });
            option1.series[0].data = resObj;

            
            option1 && myChart1.setOption(option1);
          }
        })
        .finally((err) => {
          this.loading = false;
          // 请求接口异常
        });

      
    },
  },
  mounted() {
    this.getNumber();
  },
};
</script>

<style scoped>
.all {
  display: flex;
  width: 100%;
  height: 100%;
  /* align-content: flex-end */
  /* justify-content: center; */
}
.all-bottom {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.outpic1 {
  display: flex;
  height: 100%;
  width: 40%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-right: 30px; */
}
.outpic2 {
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
</style>
