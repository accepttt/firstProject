<template>
  <div>
    <mainTable
      ref="tableList"
      :title="title"
      :tableColumnList="columns"
      :search="search"
      apiName="positionInfo"
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
      :visible.sync="addPositionVisible"
      width="40%"
      class="dialogTitle"
      :before-close="handleClose"
      :show-close="true"
    >
      <el-form
        :model="positionForm"
        label-width="100px"
        ref="positionForm"
        :rules="positonAddRules"
        resetFields
      >
        <el-form-item label="城市：" prop="city">
          <el-select
            prop="city"
            v-model="positionForm.city"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司：" prop="company">
          <el-input
            style="width: 77%"
            v-model.trim="positionForm.company"
          ></el-input>
        </el-form-item>

        <el-form-item label="职位：" prop="position">
          <el-input
            style="width: 77%"
            prop="position"
            v-model.trim="positionForm.position"
          ></el-input>
        </el-form-item>

        <el-form-item label="所属职业：" prop="positionType">
          <el-select
            prop="positionType"
            v-model="positionForm.positionType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型：" prop="recruitmentType">
          <el-select
            prop="recruitmentType"
            v-model="positionForm.recruitmentType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in recruitmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情：" prop="contentDetail">
          <tinymce id="d1" v-model="positionForm.contentDetail"></tinymce>
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

    <!-- 查看弹框 -->
    <el-dialog
      title="详情"
      :visible.sync="watchDetailVisible"
      width="40%"
      class="dialogTitle"
      :before-close="handlewatchClose"
      :show-close="true"
    >
      <el-row>
        <el-col  :span=24>
          <div v-html="detail"></div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer dialogFooter">
        <el-button
          type="primary"
          size="mini"
          @click="watchDetailVisible=!watchDetailVisible"
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
// import tinymce from "@/components/tinymce";
import tinymce from "vue-tinymce-editor";
import Vue from "vue";
Vue.component("tinymce", tinymce);

export default {
  name: "positionInfo",
  components: {
    mainTable,
    tinymce,
  },
  data() {
    return {
      detail:"",
      watchDetailVisible:false,
      searchCityOptions: [
        {
          name: "北京市",
          id: "北京市",
        },
        {
          name: "天津市",
          id: "天津市",
        },
        {
          name: "上海市",
          id: "上海市",
        },
        {
          name: "重庆市",
          id: "重庆市",
        },
        {
          name: "河北省",
          id: "河北省",
        },
        {
          name: "山西省",
          id: "山西省",
        },
        {
          name: "辽宁省",
          id: "辽宁省",
        },
        {
          name: "吉林省",
          id: "吉林省",
        },
        {
          name: "黑龙江省",
          id: "黑龙江省",
        },
        {
          name: "江苏省",
          id: "江苏省",
        },
        {
          name: "浙江省",
          id: "浙江省",
        },
        {
          name: "安徽省",
          id: "安徽省",
        },
        {
          name: "福建省",
          id: "福建省",
        },
        {
          name: "江西省",
          id: "江西省",
        },
        {
          name: "山东省",
          id: "山东省",
        },
        {
          name: "河南省",
          id: "河南省",
        },
        {
          name: "湖北省",
          id: "湖北省",
        },
        {
          name: "湖南省",
          id: "湖南省",
        },
        {
          name: "广东省",
          id: "广东省",
        },
        {
          name: "海南省",
          id: "海南省",
        },
        {
          name: "四川省",
          id: "四川省",
        },
        {
          name: "贵州省",
          id: "贵州省",
        },
        {
          name: "云南省",
          id: "云南省",
        },
        {
          name: "陕西省",
          id: "陕西省",
        },
        {
          name: "甘肃省",
          id: "甘肃省",
        },
        {
          name: "青海省",
          id: "青海省",
        },
        {
          name: "台湾省",
          id: "台湾省",
        },
      ],
      title: "职位管理列表",
      search: [
        {
          label: "公司",
          field: "positionCompany",
          placeholder: "请输入公司名字",
          type: "input",
          show: true,
        },
        {
          label: "城市:",
          field: "positionCity",
          placeholder: "请选择",
          type: "select",
          show: true,
          options: [
            {
              name: "北京市",
              id: "北京市",
            },
            {
              name: "天津市",
              id: "天津市",
            },
            {
              name: "上海市",
              id: "上海市",
            },
            {
              name: "重庆市",
              id: "重庆市",
            },
            {
              name: "河北省",
              id: "河北省",
            },
            {
              name: "山西省",
              id: "山西省",
            },
            {
              name: "辽宁省",
              id: "辽宁省",
            },
            {
              name: "吉林省",
              id: "吉林省",
            },
            {
              name: "黑龙江省",
              id: "黑龙江省",
            },
            {
              name: "江苏省",
              id: "江苏省",
            },
            {
              name: "浙江省",
              id: "浙江省",
            },
            {
              name: "安徽省",
              id: "安徽省",
            },
            {
              name: "福建省",
              id: "福建省",
            },
            {
              name: "江西省",
              id: "江西省",
            },
            {
              name: "山东省",
              id: "山东省",
            },
            {
              name: "河南省",
              id: "河南省",
            },
            {
              name: "湖北省",
              id: "湖北省",
            },
            {
              name: "湖南省",
              id: "湖南省",
            },
            {
              name: "广东省",
              id: "广东省",
            },
            {
              name: "海南省",
              id: "海南省",
            },
            {
              name: "四川省",
              id: "四川省",
            },
            {
              name: "贵州省",
              id: "贵州省",
            },
            {
              name: "云南省",
              id: "云南省",
            },
            {
              name: "陕西省",
              id: "陕西省",
            },
            {
              name: "甘肃省",
              id: "甘肃省",
            },
            {
              name: "青海省",
              id: "青海省",
            },
            {
              name: "台湾省",
              id: "台湾省",
            },
          ],
        },

        {
          label: "类型:",
          field: "positionType",
          placeholder: "请选择",
          type: "select",
          show: true,
          options: [
            { name: "社招", id: "社招" },
            { name: "校招", id: "校招" },
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
          prop: "positionCity",
          propName: "城市",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "positionCompany",
          propName: "公司",
          isDisabled: true,
          isShow: true,
        },

        {
          prop: "positionName",
          propName: "职位",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "professionName",
          propName: "所属职业",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "positionType",
          propName: "类型",
          isDisabled: true,
          isShow: true,
        },
        {
          prop: "positionIntroduce",
          propName: "详情",
          isDisabled: true,
          isShow: true,
          formatter: (text, row) => (
            <el-col>
              <el-button type="text" onClick={() => this.clicktDetail(row)}>
                点击查看
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
              <el-button type="text" onClick={() => this.modifyBtn(row)}>
                编辑
              </el-button>
              <el-button type="text" onClick={() => this.deletelBtn(row)}>
                删除
              </el-button>
            </el-col>
          ),
        },
      ],
      button: [
        {
          label: "新增职位",
          icon: "plus",
          type: "primary",
          isdropdown: false,
          disabled: false,
          action: () => this.addPosition(),
        },
      ],
      addPositionVisible: false,

      positonAddRules: {
        city: [{ required: true, message: "请选择城市", trigger: ["blur"] }],

        company: [
          { required: true, message: "请输入公司名", trigger: ["blur"] },
          {
            required: true,
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        position: [
          { required: true, message: "请输入职位", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        positionType: [
          { required: true, message: "请选择所属职业", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        recruitmentType: [
          { required: true, message: "请选择类型", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
        contentDetail: [
          { required: true, message: "请输入详情", trigger: "blur" },
          {
            min: 1,
            max: 99999,
            message: "长度在 1 到 99999 个字符",
            trigger: ["blur", "change"],
          },
        ],
      },
      positionForm: {},
      cityOptions: [
        {
          value: "河北省",
          label: "河北省",
        },
        {
          value: "山西省",
          label: "山西省",
        },
        {
          value: "辽宁省",
          label: "辽宁省",
        },
        {
          value: "吉林省",
          label: "吉林省",
        },
        {
          value: "黑龙江省",
          label: "黑龙江省",
        },
        {
          value: "江苏省",
          label: "江苏省",
        },
        {
          value: "浙江省",
          label: "浙江省",
        },
        {
          value: "安徽省",
          label: "安徽省",
        },
        {
          value: "福建省",
          label: "福建省",
        },
        {
          value: "江西省",
          label: "江西省",
        },
        {
          value: "山东省",
          label: "山东省",
        },
        {
          value: "河南省",
          label: "河南省",
        },
        {
          value: "湖北省",
          label: "湖北省",
        },
        {
          value: "湖南省",
          label: "湖南省",
        },
        {
          value: "广东省",
          label: "广东省",
        },
        {
          value: "海南省",
          label: "海南省",
        },
        {
          value: "四川省",
          label: "四川省",
        },
        {
          value: "贵州省",
          label: "贵州省",
        },
        {
          value: "云南省",
          label: "云南省",
        },
        {
          value: "陕西省",
          label: "陕西省",
        },
        {
          value: "甘肃省",
          label: "甘肃省",
        },
        {
          value: "青海省",
          label: "青海省",
        },
        {
          value: "台湾省",
          label: "台湾省",
        },
      ],
      positionOptions: [
        {
          value: "IT",
          label: "IT",
        },
        {
          value: "医学",
          label: "医学",
        },
        {
          value: "教育",
          label: "教育",
        },
        {
          value: "农业",
          label: "农业",
        },
        {
          value: "土建",
          label: "土建",
        },
        {
          value: "机械",
          label: "机械",
        },
        {
          value: "行政",
          label: "行政",
        },
        {
          value: "水利",
          label: "水利",
        },
        {
          value: "测绘",
          label: "测绘",
        },
        {
          value: "艺术",
          label: "艺术",
        },
      ],

      positionOptions: [
        {
          value: "IT",
          label: "IT",
        },
        {
          value: "医学",
          label: "医学",
        },
        {
          value: "教育",
          label: "教育",
        },
        {
          value: "农业",
          label: "农业",
        },
        {
          value: "土建",
          label: "土建",
        },
        {
          value: "机械",
          label: "机械",
        },
        {
          value: "行政",
          label: "行政",
        },
        {
          value: "水利",
          label: "水利",
        },
        {
          value: "测绘",
          label: "测绘",
        },
        {
          value: "艺术",
          label: "艺术",
        },
      ],
      recruitmentOptions: [
        {
          value: "社招",
          label: "社招",
        },
        {
          value: "校招",
          label: "校招",
        },
      ],
      dialogTitle: "新增职位",
      dialogState: 1,
    };
  },
  methods: {
    changeSchool(schoolId) {
      this.getMajor(schoolId);
    },
    addPosition() {
      this.addPositionVisible = true;
      this.dialogState = 1;
    },
    modifyBtn(row) {
      setTimeout(() => {
        this.dialogState = 2;
        let obj = JSON.parse(JSON.stringify(row));
        this.$set(this.positionForm, "id", obj.id);
        this.$set(this.positionForm, "city", obj.positionCity);
        this.$set(this.positionForm, "company", obj.positionCompany);
        this.$set(this.positionForm, "position", obj.positionName);
        this.$set(this.positionForm, "positionType", obj.professionName);
        this.$set(this.positionForm, "recruitmentType", obj.positionType);
        this.$set(this.positionForm, "contentDetail", obj.positionIntroduce);
      }, 0.0000000000000000001);
      this.addPositionVisible = true;
    },
    deletelBtn(row) {
      let obj = {};
      obj.id = row.id;
      listApi
        .positionDelete(obj)
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
      let obj = {};
      obj.positionCity = this.positionForm.city;
      obj.positionCompany = this.positionForm.company;
      obj.positionName = this.positionForm.position;
      obj.professionName = this.positionForm.positionType;
      obj.positionType = this.positionForm.recruitmentType;
      obj.positionIntroduce = this.positionForm.contentDetail;
      console.log("8564")
      this.$refs[formName].validate((valid) => {
        if (valid) {
          listApi
            .positionInsert(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);

                this.$message.success("新增职位成功");
                // this.name = this.majorForm.name
                // this.code = this.majorForm.code

                this.addPositionVisible = !this.addPositionVisible;
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
    handleClose() {
      this.addPositionVisible = false;
      this.positionForm={}
    },
    handlewatchClose(){
      this.watchDetailVisible=!this.watchDetailVisible
    },
    modifyPosition(formName) {
      let obj = {};
      obj.id = this.positionForm.id;
      obj.positionCity = this.positionForm.city;
      obj.positionCompany = this.positionForm.company;
      obj.positionName = this.positionForm.position;
      obj.professionName = this.positionForm.positionType;
      obj.positionType = this.positionForm.recruitmentType;
      obj.positionIntroduce = this.positionForm.contentDetail;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          listApi
            .positionModify(obj)
            .then((res) => {
              if (res.status == 200) {
                console.log(res);

                this.$message.success("编辑职位成功");
                // this.name = this.majorForm.name
                // this.code = this.majorForm.code

                this.addPositionVisible = !this.addPositionVisible;
                this.$refs.tableList.initList();

                this.positionForm = [];

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
    clicktDetail(row) {
      this.watchDetailVisible=!this.watchDetailVisible
      this.detail=row.positionIntroduce
    },
  },
};
</script>

<style scoped>
</style>
