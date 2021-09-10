<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="employmentInfo"
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
    <el-dialog
      title="资料上传"
      :visible.sync="uploadVisible"
      width="30%"
      class="dialogTitle"
    >
      <el-form
        :model="positionForm"
        label-width="100px"
        ref="positionForm"
        :rules="positonAddRules"
        resetFields
      >
        <el-form-item label="资料名称：" prop="informationName">
          <el-input
            style="width: 77%"
            v-model.trim="positionForm.informationName"
          ></el-input>
        </el-form-item>
        <el-form-item label="资料类型：" prop="informationType">
          <el-select
            prop="informationType"
            v-model="positionForm.informationType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in infoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-row>
        <el-col :offset="4" :span="12">
          <el-upload
            class="upload-demo"
            drag
            action="string"
            :http-request="selfUpload"
            :on-change="changeFile"
            ref="upload"
            :on-preview="handlePreview"
            :file-list="fileList"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传后缀名为.xlsx的excel文件
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="saveUpload"
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
    return {
      file: null,
      title: "就业资料管理列表",
      search: [
        {
          label: "资料名称",
          field: "informationName",
          placeholder: "请输入",
          type: "input",
          show: true,
        },
        {
          label: "资料类型",
          field: "informationType",
          placeholder: "请选择",
          type: "select",
          show: true,
          options: [
            { id: "就业", name: "就业" },
            { id: "面试", name: "面试" },
          ],
        },
      ],
      columns: [
        {
          type: "selection",
          isShow: true,
          isDisabled: true,
        },
        {
          prop: "informationName",
          propName: "资料名称",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "informationType",
          propName: "资料类型",
          isDisabled: true,
          isShow: true,
        },
        // {
        //   prop: "informationUrl",
        //   propName: "资料地址",
        //   isDisabled: true,
        //   isShow: true,
        // },
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
              <el-button type="text" onClick={() => this.delete(row)}>
                删除
              </el-button>
            </el-col>
          ),
        },
      ],
      button: [
        {
          label: "上传资料",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.uploadFile(),
        },
      ],
      positionForm: {},
      uploadVisible: false,
      infoOptions: [
        {
          label: "就业",
          value: "就业",
        },
        {
          label: "面试",
          value: "面试",
        },
      ],
      positonAddRules: {
        informationName: [
          { required: true, message: "请输入资料名称", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],

        informationType: [
          { required: true, message: "请选择资料类型", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      fileList: [],
    };
  },
  methods: {
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    delete(row) {
      let obj = {};
      obj.id = row.id;
      listApi
        .employmentInfoDelete(obj)
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

    //出现上传弹框的函数
    uploadFile() {
      this.uploadVisible = true;
    },

    //保存上传
    saveUpload(formName) {
      let formData = new FormData();
      console.log(this.file, "ssssss");
      formData.append("file", this.file);
      formData.append("informationName", this.positionForm.informationName);
      formData.append("informationType", this.positionForm.informationType);

      listApi
        .employmentInfoUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("上传成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code

            this.$refs.tableList.initList();
            this.uploadVisible = !this.uploadVisible;
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
    successUpload() {},
    handlePreview() {},
    changeFile(param, param1) {
      console.log(param);
      this.file = param.raw;
    },
    selfUpload(param) {
      console.log(param, "dddddd");
      this.file = param.file;
      // let formData =new FormData()
      // formData.append("file", _file);
    },
  },
};
</script>

<style scoped>
</style>
