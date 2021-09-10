<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="askManager"
      @changeSchool="changeSchool"
      :isDynamic="true"
    >
    </mainTable>

    <!-- 查看弹框 -->
    <el-dialog
      title="详情"
      :visible.sync="watchDetailVisible"
      width="40%"
      class="detailDialog"
      :handleClose="handleClose"
      :show-close="true"
    >
      <el-row class="row1">
        <el-col :span="24">
          <div v-html="detail"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="borderLine"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form
            :rules="rules"
            ref="replayContent"
            :model="replayContent"
            label-width="80px"
          >
            <el-form-item label-width="100" label="活动名称:" prop="content">
              <el-input
                label="回复"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="replayContent.content"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="submitReplay('replayContent')"
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
      title: "咨询管理列表",
      search: [
        {
          label: "咨询类型",
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
          prop: "student_name",
          propName: "姓名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "student_sex",
          propName: "性别",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "student_phone",
          propName: "手机号",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "type",
          propName: "类型",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "time",
          propName: "时间",
          isDisabled: true,
          isShow: true,
        },
        
        {
          prop: "content",
          propName: "详情",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.clicktDetail(row)}>
                详情
              </el-button>
            </el-col>
          ),
        },
        {
          prop: "isReply",
          propName: "是否回复",
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
      watchDetailVisible: false,
      detail: "",
      replayContent: {},
      rules: {
        content: [
          { required: true, message: "请输入回复内容", trigger: "blur" },
          { min: 1, max: 999, message: "长度在 1个字符以上", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitReplay(formName) {
      this.watchDetailVisible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj=JSON.parse(JSON.stringify(this.replayContent))
          listApi
            .replayQuestions(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);

                this.$message.success("咨询回复成功");
                // this.name = this.majorForm.name
                // this.code = this.majorForm.code
                this.watchDetailVisible = false;
                this.replayContent = {};
                this.$refs[formName].resetFields();
                this.$refs.tableList.initList();
                // this.clearValidate('majorForm')
                // this.majorForm = ({
                //   name: '',
                //   code: '',
                // })
              }
            })
            .finally((err) => {
              // this.$refs["formName"].resetFields();
              this.loading = false;
              // 请求接口异常
            });
        }
      });
    },
    handleClose() {
      this.watchDetailVisible = false;
      this.$refs.replayContent.resetFields()
      this.replayContent={}
    },
    clicktDetail(row) {
      this.watchDetailVisible = !this.watchDetailVisible;
      this.detail = row.content;
      this.replayContent.id=row.id
      this.replayContent.mailNumber=row.student_email
    },
    contentDetail() {},
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    delete(row) {
      let obj = {};
      obj.id = row.id;
      listApi
        .askDelete(obj)
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
  },
};
</script>

<style lang="scss" scoped>
.detailDialog {
  /deep/ .el-row {
    margin: 20px 0;
  }
  /deep/ .el-textarea {
    width: 70%;
  }
  .row1 {
    min-height: 120px;
  }
}
.borderLine {
  width: 100%;
  background-color: black;
  height: 2px;
}
</style>
