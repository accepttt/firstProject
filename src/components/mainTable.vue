<template>
  <div class="tableFatherBox" id="tableFatherBox">
    <el-card
      class="mb20 search-table-card formCard"
      shadow="never"
      id="formCard"
      style="border: none"
    >
      <el-form
        ref="form"
        size="small"
        :inline="false"
        :model="form"
        label-width="110px"
        label-position="left"
      >
        <el-row :gutter="20">
          <el-col
            v-for="(item, index) in search"
            :key="index"
            :span="6"
            :label="item.label"
            v-show="item.isShow ? item.isShow : item.show"
          >
            <el-form-item :label="item.label">
              <el-input
                v-if="item.type == 'input'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请输入'"
                @change="
                  () => {
                    form[item.field] =
                      form[item.field] == '' ? null : form[item.field];
                  }
                "
              />
              <el-input
                v-if="item.type == 'tree'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请输入'"
                @focus="treeOrgShow(item.treeType)"
              />
              <el-input
                v-if="item.type == 'selectTree'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择'"
                @focus="chooseTree(item[item.field])"
              />
              <!-- 这个是通过id去模糊查找 -->
              <el-select
                v-if="item.type == 'selectSearch'"
                v-model="form[item.field]"
                :remote-method="item.remoteMethod"
                :placeholder="item.placeholder || '请选择'"
                filterable
                clearable
                remote
              >
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :label="option[item.optionLabel || 'name']"
                  :value="option[item.optionValue || 'id']"
                >
                </el-option>
              </el-select>

              <!-- 这个是通过id去模糊查找 -->
              <el-select
                v-if="item.type == 'selectSearchName'"
                v-model="form[item.field]"
                :remote-method="item.remoteMethod"
                :placeholder="item.placeholder || '请选择'"
                filterable
                clearable
                remote
              >
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :label="option[item.optionLabel || 'name']"
                  :value="option[item.optionValue || 'name']"
                >
                </el-option>
              </el-select>
              <el-select
                v-if="item.type == 'select'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择'"
                clearable
                @clear="
                  () => {
                    form[item.field] =
                      form[item.field] == '' ? null : form[item.field];
                  }
                "
                @change="
                  (value) => {
                    changeSelect(value, item);
                  }
                "
                @visible-change="
                  (status) => {
                    changeSelecVisible(status, item);
                  }
                "
              >
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :label="option[item.optionLabel || 'name']"
                  :value="option[item.optionValue || 'id']"
                />
              </el-select>
              <el-select
                v-if="item.type == 'selectV'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择'"
              >
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :label="option[item.optionLabel || 'name']"
                  :value="option[item.optionValue || 'value']"
                />
              </el-select>
              <el-select
                v-if="item.type == 'selectValue'"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择'"
              >
                <el-option
                  v-for="(option, i) in item.options"
                  :key="i"
                  :label="option[item.optionLabel || 'name']"
                  :value="option[item.optionValue || 'value']"
                />
              </el-select>
              <el-cascader
                v-if="item.type == 'cascader'"
                v-model="form[item.field]"
                :options="item.options"
                :placeholder="item.placeholder || '请选择'"
                :props="{
                  value: item.optionValue || 'id',
                  label: item.optionLabel || 'name',
                  children: item.optionChildren || 'list',
                }"
                :show-all-levels="false"
              />
              <el-date-picker
                v-if="item.type == 'date'"
                :clearable="false"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择日期'"
                type="date"
                value-format="yyyy-MM-dd"
                @change="startTimeChange"
                :picker-options="expireTimeOption"
              />
              <!-- 解决截止时间不能早于开始时间 -->
              <el-date-picker
                v-if="item.type == 'date1'"
                :clearable="false"
                v-model="form[item.field]"
                :placeholder="item.placeholder || '请选择日期'"
                type="date"
                value-format="yyyy-MM-dd"
                @change="endTimeChange"
                :picker-options="expireSecondTimeOption"
              />
              <el-date-picker
                v-if="item.type == 'date2'"
                v-model="form[item.field]"
                :default-time="['08:30:00', '16:00:00']"
                :end-placeholder="item.placeholder"
                :placeholder="item.placeholder || '请选择日期'"
                :start-placeholder="item.placeholder"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <el-date-picker
                v-if="item.type == 'date3'"
                v-model="form[item.field]"
                :end-placeholder="item.placeholder"
                :placeholder="item.placeholder || '请选择日期'"
                :start-placeholder="item.placeholder"
                format="yyyy-MM-dd"
                type="datetimerange"
                value-format="yyyy-MM-dd"
                @change="getTimeRange()"
              />
              <div v-if="item.type == 'date4'">
                <el-date-picker
                  v-if="item.onlyOne"
                  v-model="form[item.field]"
                  :end-placeholder="item.placeholder"
                  :placeholder="item.placeholder || '请选择年份'"
                  :start-placeholder="item.placeholder"
                  format="yyyy"
                  type="year"
                  value-format="yyyy"
                  @change="getEndTime"
                />
                <el-date-picker
                  v-else
                  v-model="form[item.field]"
                  :end-placeholder="item.placeholder"
                  :placeholder="item.placeholder || '请选择年份'"
                  :start-placeholder="item.placeholder"
                  format="yyyy"
                  type="year"
                  value-format="yyyy"
                />
              </div>
              <!-- 这是日期时间联合选择器，已经做好封装 -->
              <el-date-picker
                v-if="item.type == 'date5'"
                v-model="data5TempTime"
                :default-time="['00:00:00', '00:00:00']"
                :end-placeholder="item.placeholder"
                :placeholder="item.placeholder || '请选择日期'"
                :start-placeholder="item.placeholder"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <div v-if="item.type == 'daterange'">
                <el-date-picker
                  v-model="form[item.field]"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="handleSearch" size="small"
                >查询</el-button
              >
              <el-button @click="handleReset" type="primary" size="small" plain
                >重置</el-button
              >
              <span @click="goScreen" class="seniorBtn" v-if="isScreen">
                <img src="@assets/selfStudy/icon_screen.png" alt="" />
                {{ textScreen }}</span
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div style="text-align: center; margin-bottom: 30px; font-size: 25px">
      {{ title }}
    </div>
    <div class="tableBox" :style="{ height: height }">
      <!-- 表格操作按钮 -->
      <div
        style="
          display: flex;
          margin-bottom: 30px;
        "
      >
        <slot name="action" />
      </div>
      <el-table
        border
        ref="multipleTable"
        :data="dataList"
        v-loading="loading"
        cell-class-name="cellClassName"
        :row-key="rowKey"
        @sort-change="handleSortChange"
        @filter-change="filterChange"
        @selection-change="selectionChange"
        height="568"
      >
        <el-table-column
          v-for="(item, index) in tableColumnList"
          :type="item.type"
          :label="item.propName"
          :property="item.prop"
          :sortable="item.sortable"
          :filters="item.filters"
          :width="item.width ? item.width : ''"
          :selectable="item.selectable"
          :reserve-selection="item.reserveSelection"
          :key="index"
          align="center"
          :show-overflow-tooltip="tooltip"
          :column-key="item.prop"
          :formatter="
            item.formatter
              ? (row, column, cellValue, index) =>
                  formatterColumn(row, column, cellValue, index, item)
              : null
          "
          :filter-multiple="false"
          v-if="item.isShow"
        >
        </el-table-column>
        <el-table-column
          label=""
          align="center"
          width="60"
          :render-header="renderHeader"
          v-if="isDynamic"
        >
        </el-table-column>
      </el-table>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          margin-right: 40px;
          margin-top: 15px;
        "
      >
        <el-pagination
          :page-sizes="[10]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="total"
          :current-page="searchParam.pageIndex"
        />
      </div>
    </div>

    <el-col :span="24" v-if="bottomLine" style="text-align: right">
      <el-button type="primary" @click="getSelect">确定</el-button>
    </el-col>
  </div>
</template>

<script>
import listApi from "@/api/selfStudy/list"; // 列表api
export default {
  name: "mainTable",
  props: {
    title: {
      type: String,
      default: "列表",
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    selectedList: {
      type: Array,
      default: () => [],
    },
    bottomLine: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: "id",
    },
    isScreen: {
      type: Boolean,
      default: false,
    },
    tableColumnList: {
      type: Array,
      default: null,
    },
    optionalColumnList: {
      type: Array,
      default: () => [],
    },
    search: {
      type: Array,
      default: () => [],
    },
    btnList: {
      type: Array,
      default: () => [],
    },
    tableWidth: {
      type: String,
      default: "",
    },
    isDynamic: {
      type: Boolean,
      default: null,
    },
    apiName: {
      type: String,
      default: null,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    isID: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data5TempTime: "",
      form: {},
      loading: false,
      textScreen: "高级筛选",
      formHeight: "70px",
      dataList: [],
      checkArr: [],
      height: "",
      tableHeight: "",
      searchParam: {
        pageSize: 10,
        pageIndex: 1,
      },

      selectedArr: [],
      total: null,
      // 上一个创建时间返回的具体时间
      startCallbackTime: null,
      endCallbackTime: null,
      visibalSearchLength: null,
      // 是否选择过学校
      isSelectSchool: false,
      expireTimeOption: this.beginDate(),
      expireSecondTimeOption: this.processDate(),
      startTempTime: "",
      endTempTime: "",
    };
  },
  mounted() {
    // 取到上一个

    this.initList();
    // this.initVisibalSearchLength("1");
    // setTimeout(this.getPgeHeight, 100)
  },
  beforeUpdate() {
    let arr = Object.keys(this.form);
    for (let a in arr) {
      // debugger
      this.searchParam[arr[a]] = this.form[arr[a]];
    }
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格 ,避免动态配置表格抖动问题
      this.$refs["multipleTable"].doLayout();
    });
  },
  watch: {
    selectedList() {
      this.selectedArr = this.selectedList;
      console.log(this.selectedList, "watch.selectedList");
      this.initList();
    },
  },
  methods: {
    isTest(param) {
      // window.eval(param(22222))

      console.log(param, "我是触发的");
    },
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.endTempTime) {
            //如果结束时间不为空，则开始时间大于结束时间
            return time.getTime() > self.endTempTime;
          } else {
            // return time.getTime() < Date.now() - 8.64e7&&time.getTime()>self.startTempTime
            // return time.getTime() < Date.now() - 8.64e7;
          }
        },
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.startTempTime) {
            //如果开始时间不为空，则结束时间大于开始时间
            return time.getTime() < self.startTempTime - 8.64e7;
          } else {
            //如果开始时间为空
            return time.getTime() < Date.now() - 8.64e7;
          }

          // if (self.addFrom.startTime) {
          //
          //   return new Date(self.addFrom.startTime).getTime() > time.getTime()
          // } else {
          //   // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          // }
        },
      };
    },
    //开始时间选择框的change事件
    startTimeChange(time) {
      this.startTempTime = Date.parse(time);
    },
    endTimeChange(time) {
      this.endTempTime = Date.parse(time);
    },

    // 获取可显示的搜索项
    initVisibalSearchLength(type) {
      let temp = this.search.filter((item) => {
        return type === "1" ? item.show === true : item.isShow === true;
      });
      this.visibalSearchLength = temp.length;
    },
    changeSelect(value, item) {
      if (item.field === "schoolId" && value != "") {
        // this.form = { schoolId: value };
        this.form["schoolId"] = value;
        this.$emit("changeSchool", value);
        this.isSelectSchool = true;
      }
    },
    changeSelecVisible(status, item) {
      if (status && item.field === "professionId") {
        if (!this.isSelectSchool) {
          this.$message({
            message: "请先选择报考学校",
            type: "warning",
          });
        }
      }
    },
    goScreen() {
      if (this.textScreen === "高级筛选") {
        this.textScreen = "收起";
        this.$emit("screen", "1");
        this.initVisibalSearchLength("2");
        // setTimeout(this.getPgeHeight, 100)
      } else {
        this.textScreen = "高级筛选";
        this.$emit("screen", "2");
        this.initVisibalSearchLength("1");
        // setTimeout(this.getPgeHeight, 100)
      }
    },
    getPgeHeight() {
      let height1 = document.getElementsByClassName("tableFatherBox")[0]
        .clientHeight;
      let contentHeight = document.getElementsByClassName("formCard")[0]
        .clientHeight;
      this.height =
        this.dataList.length > 0 ? height1 - contentHeight + "px" : "auto";
    },
    // 列表
    initList() {
      listApi[this.apiName](this.searchParam)
        .then((response) => {
          console.log(response.data);
          this.total = response.data.count;
          this.dataList = response.data.data;
        })
        .finally((err) => {});
    },

    handleSearch() {
      this.initList();
      this.$refs.multipleTable.clearFilter();
    },
    handleSizeChange() {},
    handleCurrentChange(index) {
      this.searchParam.pageIndex = index;
      this.initList();
    },
    handleReset() {
      // this.searchParams = {
      //   order: "descending",
      //   size: 10,
      //   sort: "id",
      //   current: 1,
      //   model: {},
      //   map: {},
      // };
      this.data5TempTime = [];
      this.callbackTime = null;
      this.form = {};
      this.searchParam = {
        pageSize: 10,
        pageIndex: 1,
      };
      this.initList();
    },
    handleSortChange({ prop, order }) {
      // this.searchParams.sort = prop;
      // this.searchParams.order = order;
      this.initList();
    },
    formatterColumn(row, column, cellValue, index, item) {
      return item.formatter(item.prop ? cellValue : row, row, index);
    },
    //表头筛选
    filterChange(key, column) {
      //console.log(key, 'key')
      let obj = key;
      let keyName = Object.keys(key);
      keyName = keyName.toString();
      //console.log(keyName, 'keyName')
      if (obj[keyName][0] == undefined) {
        this.$set(this.form, keyName, "");
        this.initList();
      } else {
        this.$set(this.form, keyName, obj[keyName][0]);
        //console.log(this.form, 'form')
        this.initList();
      }
    },
    unique(uniqueArr) {
      var has = {};
      return uniqueArr.reduce(function (arr, item) {
        !has[item.id] && (has[item.id] = true && arr.push(item));
        return arr;
      }, []);
    },
    //获取选中的表格行（针对dialog异步加载bug）
    getSelect() {
      console.log(this.selectedArr, "selectedArr");
      let arr = this.unique(this.selectedArr);
      console.log(arr, "getSelect");
      this.$emit("saveChoose", arr);
    },
    //点击复选框获取选中数据
    selectionChange(selection) {
      this.selectedArr = selection;
    },
    // 表头自定义方法
    renderHeader(h, obj) {
      if (obj.column.label === "") {
        return h("div", {}, [
          h(
            "el-popover",
            {
              props: {
                placement: "bottom",
                width: "150",
                trigger: "click",
              },
            },
            [
              h("span", {
                slot: "reference",
                class: "ces-table-require",
                domProps: {
                  innerHTML: obj.column.label + '<i class="el-icon-more"/>',
                },
              }),
              h(
                "el-checkbox-group",
                {
                  class: "",
                  style: {
                    "margin-bottom": "10px",
                    "border-bottom": "1px solid #efefef",
                    "padding-bottom": "10px",
                  },
                  props: {
                    value: this.checkArr,
                  },
                },
                [
                  this.tableColumnList.map((item, index) => {
                    if (item.type !== "selection") {
                      return h("el-checkbox", {
                        props: {
                          label: item.propName,
                          key: index,
                          checked:
                            this.checkArr[index] === item.propName
                              ? true
                              : false,
                          disabled: item.isDisabled,
                        },
                        on: {
                          change: (val) => {
                            if (val) {
                              this.checkArr.push(item.propName);
                              item.isShow = true;
                              item.checked = true;
                            } else {
                              let i = this.checkArr.findIndex(
                                (row) => row === item.propName
                              );
                              this.checkArr.splice(i, 1);
                              item.isShow = false;
                              item.checked = false;
                            }
                          },
                        },
                      });
                    }
                  }),
                ]
              ),
            ]
          ),
        ]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  text-align: right;
}

//表格内每一行的行高
/deep/ .el-table td {
  padding: 6px 0;
}

.el-pagination {
  font-size: 12px;
  font-weight: normal;
}

.btnClass {
  .el-form-item.el-form-item--small {
    display: flex;
    justify-content: flex-end;
  }

  /deep/ .el-form-item__content {
    width: 230px;
    margin-left: 38px !important;
  }
}

.wrap {
  width: 100%;
  .el-form-item.el-form-item--small {
    display: flex;
    justify-content: flex-end;
    /deep/ .el-form-item__content {
      width: 240px;
    }
  }
}

/deep/ .cellClassName:last-of-type {
  .el-button {
    margin-right: 5px;
  }
}

.seniorBtn {
  display: inline-block;
}
</style>
