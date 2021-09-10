<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="studentListInfo"
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
      title="批量导入"
      :visible.sync="importVisible"
      width="30%"
      class="dialogTitle"
    >
      <el-row>
        <el-col :offset="4" :span="12">
          <el-upload
            class="upload-demo"
            drag
            :action="fileUrl"
            :on-success="successUpload"
            multiple
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

      <!-- <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="saveImport"
          class="saveTestBtn"
          >确定</el-button
        >
      </div> -->
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
      title: "学生信息列表",
      importVisible: false,
      search: [
        {
          label: "学生姓名:",
          field: "studentName",
          placeholder: "请输入学生姓名",
          type: "input",
          show: true,
        },
        {
          label: "年级:",
          field: "graduationYear",
          placeholder: "请选择",
          type: "select",
          show: true,
          options: [
            { name: "2013", id: "2013" },
            { name: "2014", id: "2014" },
            { name: "2015", id: "2015" },
            { name: "2016", id: "2016" },
            { name: "2017", id: "2017" },
          ],
        },
        {
          label: "学校:",
          field: "studentSchool",
          placeholder: "请输入学校名称",
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
          prop: "studentName",
          propName: "学生姓名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentSex",
          propName: "性别",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentPassword",
          propName: "密码",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentPhone",
          propName: "手机号",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentEmail",
          propName: "邮箱",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "graduationYear",
          propName: "年级",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentSchool",
          propName: "学校",
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
          label: "批量导入",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.batchImport(),
        },
        {
          label: "批量删除",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.batchDelete(),
        },
      ],
      fileUrl: process.env.VUE_APP_BASE_API + "/student/insertList",
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
        .deleteStudentInfo(obj)
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
    batchImport() {
      this.importVisible = !this.importVisible;
    },
    successUpload() {
      this.$refs.tableList.initList();
      this.importVisible = !this.importVisible;
    },
    batchDelete(){
      let arr=this.$refs.tableList.selectedArr
      let temp=[]
      arr.forEach(item => {
        temp.push(item.id)
      });
      listApi
        .batchDeleteInfo(temp)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("批量删除成功");
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
    }
  },
};
</script>

<style scoped>
</style>
