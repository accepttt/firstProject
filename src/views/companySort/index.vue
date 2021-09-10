<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="conpanyList"
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
    <!-- 新增和编辑弹框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addCompanyVisible"
      width="40%"
      class="dialogTitle"
      :before-close="handleClose"
      :show-close="true"
      destroy-on-close
    >
      <el-form
        :model="positionForm"
        label-width="100px"
        ref="positionForm"
        :rules="companyAddRules"
        resetFields
      >
        <el-form-item label="公司名：" prop="companyName">
          <el-input
            style="width: 77%"
            v-model.trim="positionForm.companyName"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <!-- <el-input
            style="width: 77%"
            v-model.trim="positionForm.location"
          ></el-input> -->
          <locationSelect ref="locationRef"></locationSelect>
        </el-form-item>

        <el-form-item label="类型：" prop="type">
          <el-select
            prop="type"
            v-model="positionForm.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in companyType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="联系方式：" prop="phone">
          <el-input
            style="width: 77%"
            v-model.trim="positionForm.phone"
          ></el-input>
        </el-form-item>

        <el-form-item label="公司网址：" prop="companyHref">
          <el-input
            style="width: 77%"
            v-model.trim="positionForm.companyHref"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="
            dialogState == 1
              ? saveImport('positionForm')
              : modifyPosition('positionForm')
          "
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
import locationSelect from "@components/locationSelect";

export default {
  name: "system",
  components: {
    mainTable,
    locationSelect,
  },
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
      title: "公司信息列表",
      search: [
        {
          label: "公司名称:",
          field: "companyName",
          placeholder: "请输入公司名称",
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
          prop: "companyName",
          propName: "公司名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "companyAddress",
          propName: "地址",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "companyType",
          propName: "类型",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "companyPhone",
          propName: "联系方式",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "companyWebsite",
          propName: "公司网址",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.getUrl(row)}>
                {text}
              </el-button>
            </el-col>
          ),
        },

        {
          propName: "操作",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.delete(row)}>
                删除
              </el-button>
            </el-col>
          ),
        },
      ],
      button: [
        {
          label: "新增公司",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.addCompany(),
        },
      ],
      addCompanyVisible: false,
      dialogTitle: "新增公司",
      positionForm: {},
      companyType: [
        {
          label: "国企",
          value: "国企",
        },
        {
          label: "私企",
          value: "私企",
        },
      ],
      companyAddRules: {
        companyName: [
          { required: true, message: "请输入公司名", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],

        location: [
          { required: true, message: "请选择地址", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"],
          },
          { validator: validPhone, trigger: "blur" },
        ],
        companyHref: [
          { required: true, message: "请输入公司网址", trigger: "blur" },
          {
            min: 1,
            max: 999,
            message: "长度在 1 到 999 个字符",
            trigger: ["blur", "change"],
          },
        ],
      },
      dialogState: 1,
      webUrl: "",
    };
  },
  methods: {
    getUrl(row) {
      this.webUrl = row.companyWebsite;
      window.location.href = this.webUrl;
    },
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    
    delete(row) {
      let obj = {};
      obj.id = row.id;
      listApi
        .conpanyDelete(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("删除成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code

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
    saveImport(formName) {
      let temp = this.$refs.locationRef.addtions.names;
      this.positionForm.location = temp.split("/").join("");

      let obj = {};
      obj.companyName = this.positionForm.companyName;
      obj.companyAddress = this.positionForm.location;
      obj.companyType = this.positionForm.type;
      obj.companyPhone = this.positionForm.phone;
      obj.companyWebsite = this.positionForm.companyHref;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          listApi
            .conpanyInsert(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);

                this.$message.success("新增公司成功");
                // this.name = this.majorForm.name
                // this.code = this.majorForm.code

                this.addCompanyVisible = !this.addCompanyVisible;
                this.$refs.tableList.initList();

                this.positionForm = {};

                // this.clearValidate('majorForm')
                // this.majorForm = ({
                //   name: '',
                //   code: '',
                // })
                // this.$refs[formName].resetFields()
              }
            })
            .finally((err) => {
              this.$refs["formName"].resetFields();
              this.loading = false;
              // 请求接口异常
            });
        } else {
          return false;
        }
      });
    },
    modifyPosition(formName) {},
    handleClose() {
      this.addCompanyVisible = false;
      this.positionForm = {};
      this.$refs.positionForm.resetFields();
    },
    addCompany() {
      this.dialogState = 1;
      this.addCompanyVisible = !this.addCompanyVisible;
    },
  },
};
</script>

<style scoped>
</style>
