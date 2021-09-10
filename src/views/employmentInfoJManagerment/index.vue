<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="employmentInfoManager"
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
  updated() {
    // this.$set(this.$refs.tableList.searchParam,"isJob",true)
    // this.$refs.tableList.searchParam = {
    //   pageSize: 10,
    //   pageIndex: 1,
    //   studentIsJob:true
    // };
  },
  data() {
    return {
      title: "就业管理列表",
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
          placeholder: "请选择",
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
          propName: "姓名",
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
          prop: "studentPhone",
          propName: "手机号",
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
          prop: "studentCompany",
          propName: "就业公司",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "studentPosition",
          propName: "就业职位",
          isDisabled: true,
          isShow: true,
        },

        // {
        //   propName: "操作",
        //   isDisabled: true,
        //   isShow: true,
        //   formatter: (text, row) => (
        //     <el-col>
        //       <el-button type="text" onClick={() => this.detailBtn(row)}>
        //         修改权限
        //       </el-button>
        //     </el-col>
        //   ),
        // },
      ],
    };
  },
  methods: {
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__row{
    background-color: #FFF;
    height: 100px;
  }
</style>
