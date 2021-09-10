<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="managerList"
      @changeSchool="changeSchool"
      :isDynamic="true"
    >
      <template #action>
        <div class="mb20">
          <el-button
            v-for="(item, index) in button"
            :key="index"
            :disabled="item.disabled"
            :icon="`el-icon-${item.icon}`"
            :style="{ float: item.position }"
            :type="item.type"
            @click="item.action"
          >
            {{ item.label }}</el-button
          >
        </div>
      </template>
    </mainTable>

    <!-- 新增管理员弹框 -->
    <el-dialog
      :title="majorTitle"
      :visible.sync="majorVisible"
      width="30%"
      class="dialogTitle"
      :before-close="handleClose"
    >
      <el-form
        :model="majorForm"
        label-width="100px"
        ref="majorForm"
        :rules="majorAddRules"
        resetFields
      >
        <!--        <span class="iconI">*</span>-->
        <el-form-item label="用户名：" prop="name">
          <el-input
            style="width: 77%"
            prop="name"
            v-model.trim="majorForm.name"
          ></el-input>
        </el-form-item>
        <!--        <span class="iconI">*</span>-->
        <el-form-item label="密码：" prop="password">
          <el-input
            style="width: 77%"
            v-model.trim="majorForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别：" prop="sex">
          <el-select prop="sex" v-model="majorForm.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input
            style="width: 77%"
            v-model.trim="majorForm.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="
            majorBlockState == 1
              ? saveBtn('majorForm')
              : updateSaveBtn('majorForm')
          "
          class="saveTestBtn"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改权限弹框 -->
    <el-dialog
      title="编辑权限"
      :visible.sync="authorityVisible"
      width="30%"
      class="dialogTitle"
    >
      <el-row>
        <el-col :span="12"> 学生信息管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 职位信息管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 公司信息管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value3"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 简历管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value4"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 就业资料管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value5"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> 咨询管理 </el-col>
        <el-col :span="12">
          <el-switch
            v-model="value6"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="saveAuthority"
          class="saveTestBtn"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mainTable from "@/components/mainTable";
import listApi from "@/api/selfStudy/list";
export default {
  name: "system",
  components: {
    mainTable,
  },
  data() {
    let validPassword = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]*$/g;
      if (!reg.test(value)) {
        callback(new Error("密码必须是由4-20位字母+数字组合"));
      } else {
        callback();
      }
    };
    let validPhone = (rule, value, callback) => {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/g;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      majorBlockState: 1,
      options: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      majorTitle: "新增",
      majorVisible: false,
      majorAddRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: ["blur", "change"],
          },
          { validator: validPhone, trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: ["blur"] }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: ["blur", "change"],
          },
          { validator: validPassword, trigger: "blur" },
        ],
      },
      majorForm: {},
      button: [
        {
          label: "新增管理员",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.addSystemer(),
        },
      ],
      title: "管理员列表",
      search: [
        {
          label: "姓名:",
          field: "sysName",
          placeholder: "请输入用户姓名",
          type: "input",
          show: true,
        },
      ],
      columns: [
        {
          type: "selection",
          isShow: true,
          isDisabled: true,
        },
        {
          prop: "sysName",
          propName: "姓名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "sysSex",
          propName: "性别",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "sysPassword",
          propName: "密码",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "sysPhone",
          propName: "手机号",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "createTime",
          propName: "创建时间",
          isDisabled: true,
          isShow: true,
        },
        {
          propName: "操作",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.modify(row)}>
                编辑信息
              </el-button>

              <el-button type="text" onClick={() => this.modifyAuthority(row)}>
                编辑权限
              </el-button>
              <el-button type="text" onClick={() => this.delete(row)}>
                删除
              </el-button>
            </el-col>
          ),
        },
      ],
      value1: "1",
      value2: "1",
      value3: "1",
      value4: "1",
      value5: "1",
      value6: "1",
      authorityVisible: false,
      idAuthority: null,
    };
  },
  methods: {
    clearRules() {},
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    addSystemer() {
      this.majorBlockState = 1;
      this.majorVisible = !this.majorVisible;
    },
    handleClose() {
      // this.$refs["majorForm"].resetFields();
      this.majorForm = {};
      this.majorVisible = false;
      // this.majorForm = {}
    },
    saveBtn(formName) {
      let obj = {};
      obj.sysName = this.majorForm.name;
      obj.sysPassword = this.majorForm.password;
      obj.sysSex = this.majorForm.sex;
      obj.sysPhone = this.majorForm.phone;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          listApi
            .addNewmanager(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);

                this.$message.success("新增成功");
                // this.name = this.majorForm.name
                // this.code = this.majorForm.code

                this.majorVisible = false;
                this.$refs.tableList.initList();
                this.$refs["majorForm"].resetFields();
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
              this.$refs["majorForm"].resetFields();
              this.loading = false;
              // 请求接口异常
            });
        } else {
          return false;
        }
      });
    },
    updateSaveBtn() {
      let obj = {};
      obj.id = this.majorForm.id;
      obj.sysName = this.majorForm.name;
      obj.sysPassword = this.majorForm.password;
      obj.sysSex = this.majorForm.sex;
      obj.sysPhone = this.majorForm.phone;
      obj.sysPermission = this.majorForm.sysPermission;

      listApi
        .modifyManager(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("编辑成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code

            this.majorVisible = false;
            this.$refs.tableList.searchParam.pageSize = 10;
            this.$refs.tableList.searchParam.pageIndex = 1;

            this.$refs.tableList.initList();
            this.majorForm = {};

            // this.clearValidate('majorForm')
            // this.majorForm = ({
            //   name: '',
            //   code: '',
            // })
          }
        })
        .finally((err) => {
          this.loading = false;
          // 请求接口异常
        });
    },
    modify(row) {
      this.majorTitle = "编辑";
      this.majorVisible = !this.majorVisible;
      let obj = JSON.parse(JSON.stringify(row));

      this.$set(this.majorForm, "id", obj.id);
      this.$set(this.majorForm, "name", obj.sysName);
      this.$set(this.majorForm, "password", obj.sysPassword);
      this.$set(this.majorForm, "sex", obj.sysSex);
      this.$set(this.majorForm, "phone", obj.sysPhone);
      this.$set(this.majorForm, "sysPermission", obj.sysPermission);

      this.majorBlockState = 2;
    },
    delete(row) {
      let obj = {
        id: row.id,
      };
      listApi
        .deleteManager(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("删除成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code

            this.majorVisible = false;
            this.$refs.tableList.searchParam.pageSize = 10;
            this.$refs.tableList.searchParam.pageIndex = 1;

            this.$refs.tableList.initList();
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
    },

    //修改权限
    modifyAuthority(row) {
      this.idAuthority = row.id;
      let str = row.sysPermission;
      this.value1 = str[0];
      this.value2 = str[1];
      this.value3 = str[2];
      this.value4 = str[3];
      this.value5 = str[4];
      this.value6 = str[5];
      this.authorityVisible = !this.authorityVisible;
    },
    saveAuthority() {
      let obj = {};
      obj.id = this.idAuthority;
      let authorityStr =
        this.value1 + this.value2 + this.value3 + this.value4 + this.value5+this.value6;
      obj.sysPermission = authorityStr;

      listApi
        .modifyAuthority(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("修改该管理员权限成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code
            this.$refs.tableList.initList();
            this.authorityVisible = !this.authorityVisible;
          }
        })
        .finally((err) => {
          this.loading = false;
          // 请求接口异常
        });
    },
  },
};
</script>

<style scoped>
.dialogTitle .el-col {
  display: flex;
  justify-content: space-around;
  margin-bottom: 18px;
  font-size: 20px;
  color: black;

  /* justify-content: center; */
}
</style>
