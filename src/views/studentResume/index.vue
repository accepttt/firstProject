<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="resumeList"
      @changeSchool="changeSchool"
      :isDynamic="true"
    >
    </mainTable>
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
      title: "学生信息简历列表",
      search: [
        {
          label: "学生姓名:",
          field: "name",
          placeholder: "请输入学生姓名",
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
          prop: "student_name",
          propName: "学生姓名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "student_sex",
          propName: "学生性别",
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
          prop: "graduation_year",
          propName: "年级",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "resume_name",
          propName: "简历名",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "position_name",
          propName: "投递职位",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "position_company",
          propName: "投递公司",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "create_time",
          propName: "投递时间",
          isDisabled: true,
          isShow: true,
        },

        {
          propName: "操作",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.downloadFile(row)}>
                下载查看
              </el-button>
              <el-button type="text" onClick={() => this.delete(row)}>
                删除
              </el-button>
            </el-col>
          ),
        },
      ],
    };
  },
  methods: {
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    downloadFile(row) {
      let obj = {
        id: row.id,
      };
      listApi
        .resumeDownload(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("获取简历地址成功");
            // this.name = this.majorForm.name
            // this.code = this.majorForm.code

            console.log("192.168.0.105:8080/" + res.data)
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute("href", "http://192.168.0.105:8080/" + res.data); // href链接
            a.click();
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
    delete(row) {
      let obj = {
        id: row.id,
      };
      listApi
        .resumeDelete(obj)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);

            this.$message.success("删除简历信息成功");
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
  },
};
</script>

<style scoped>
</style>
