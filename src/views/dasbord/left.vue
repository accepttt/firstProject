<template>
  <div style="display: flex; flex-direction: column">
    <el-row>
      <div class="topTitle">
                  
        <div style="margin-left: 50px">毕业生就业管理系统</div>
                
      </div>
    </el-row>
    <div style="height: 72px; width: 100%"></div>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          :default-active="selected"
          class="el-menu-vertical-demo"
          @select="goTopath"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <!-- 即为统计分析 -->
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" v-if="isAdmin == 1">
            <i class="el-icon-menu"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
          <el-menu-item index="3" v-if="arrAuthrity[0] == 1">
            <i class="el-icon-setting"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="4" v-if="arrAuthrity[1] == 1">
            <i class="el-icon-setting"></i>
            <span slot="title">职位管理</span>
          </el-menu-item>
          <el-menu-item index="5" v-if="arrAuthrity[2] == 1">
            <i class="el-icon-setting"></i>
            <span slot="title">公司管理</span>
          </el-menu-item>
          <el-menu-item index="6" v-if="arrAuthrity[3] == 1">
            <i class="el-icon-setting"></i>
            <span slot="title">简历管理</span>
          </el-menu-item>
          <el-menu-item index="7" v-if="arrAuthrity[4] == 1">
            <i class="el-icon-setting" ></i>
            <span slot="title">就业资料管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-setting"></i>
            <span slot="title">就业管理</span>
          </el-menu-item>
          <el-menu-item index="9">
            <i class="el-icon-setting" v-if="arrAuthrity[5] == 1"></i>
            <span slot="title">咨询管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="main">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import db from "@/utils/storage.js";
import listApi from "@/api/selfStudy/list";
export default {
  name: "left",
  data() {
    return {
      selected: "1",
      arrAuthrity: [1, 1, 1, 1, 1, 1],
      isAdmin: 0,
    };
  },
  methods: {
    goTopath(param) {
      param = parseInt(param);
      db.save("menuIndex", param);
      switch (param) {
        case 1:
          this.$router.push({
            path: "/dasbord", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 2:
          this.$router.push({
            path: "/dasbord/system", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 3:
          this.$router.push({
            path: "/dasbord/studentInfo", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 4:
          this.$router.push({
            path: "/dasbord/positionInfo", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 5:
          this.$router.push({
            path: "/dasbord/companySort", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 6:
          this.$router.push({
            path: "/dasbord/studentResume", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 7:
          this.$router.push({
            path: "/dasbord/employmentInfo", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 8:
          this.$router.push({
            path: "/dasbord/employmentInfoJManagerment", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
        case 9:
          this.$router.push({
            path: "/dasbord/consultingManagement", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              // id: this.id,
            },
          });
          break;
      }
    },
    getAuthroity() {
      listApi
        .getAuthroity()
        .then((res) => {
          if (res.status == 200) {
            console.log(res)
            let temp=res.data
            this.arrAuthrity=temp
          }
        })
        .finally((err) => {
          this.$refs["majorForm"].resetFields();
          this.loading = false;
          // 请求接口异常
        });
    },
  },
  mounted() {
    let flag = db.get("menuIndex");
    this.selected = flag + "";
    this.isAdmin = db.get("isAdmin");
    this.getAuthroity();
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-menu-vertical-demo {
  position: fixed;
  height: 100vh;
  width: 235px;
}
.tac {
  display: flex;
}
.main {
  // background-color: red;
  min-height: 900px;
  // z-index: -1;
  // width: 100%;
}
.topTitle {
  background-color: rgb(84, 92, 100);
  color: white;
  font-size: 40px;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  z-index: 2;
}
</style>
