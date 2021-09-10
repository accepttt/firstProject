<template>
  <div class="login-container">
    <!-- <el-tabs style="height: 81px;width: 166px" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学生登陆" name="first"></el-tab-pane>
      <el-tab-pane label="管理员登陆" name="second"></el-tab-pane>
    </el-tabs> -->
    <!-- 学生端登陆 -->
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="login-form"
      :rules="rules"
      
    >
      <h2 class="login-title">毕业生管理系统</h2>
      <el-form-item label="手机号:" prop="sysPhone">
        <el-input v-model="form.sysPhone" style="width: 70%"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="sysPassword">
        <el-input v-model="form.sysPassword" style="width: 70%" show-password></el-input>
      </el-form-item>

      <el-form-item style="display: flex; justify-content: center">
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import listApi from "@/api/selfStudy/list";
import db from "@/utils/storage.js";
export default {
  name: "login",
  data() {
    let validPhone = (rule, value, callback) => {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/g;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      isLogin: 1,
      form: {
        sysPhone: "",
        sysPassword: "",
      },
      rules: {
        sysPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"],
          },
          { validator: validPhone, trigger: "blur" },
        ],

        sysPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1个字符以上", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClick() {
      if (this.isLogin == 1 || this.isLogin == 2) {
        this.isLogin = 3;
      } else {
        this.isLogin = 1;
      }
    },
    //注册
    registered() {},
    returnLogin() {
      if (this.isLogin == 1) {
        this.isLogin = 2;
      } else {
        this.isLogin = 1;
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            sysPhone: this.form.sysPhone,
            sysPassword: this.form.sysPassword,
          };
          listApi
            .adminLogin(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);
                let tempArr=Object.keys(res.data)
                // debugger
                if (tempArr[0] == "请您先注册") {
                  this.$message.error(tempArr[0]);
                }else if(tempArr[0] == "密码不正确"){
                  this.$message.error(tempArr[0]);
                } else {
                  this.$message.success("登录成功");
                  // console.log(this.$store.getters.getCityFn)


                  // this.$store.commit('show',res.data[tempArr[0]].isAdmin)
                  // console.log(this.$store.getters.getState)

                  db.save("isAdmin",res.data[tempArr[0]].isAdmin)
                  this.$refs[formName].resetFields();
                  db.save("token", tempArr[0]);
                  this.$router.push({
                    path: "/dasbord",
                  });

                }
              }
            })
            .finally((err) => {
              this.$refs[formName].resetFields();
              this.loading = false;
              // 请求接口异常
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;

  width: 500px;

  color: black;
  // background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  background-color: gray;
  opacity: 0.8;
  height: 400px;
  border-radius: 20px; /* 圆角 */
}


/* 背景 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}
/deep/ .el-form-item__label {
    font-size: 18px;
    color: black;
    font-weight: bold;
  }
</style> 