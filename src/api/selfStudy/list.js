import axiosApi from "../Axios.js";
const apiList = {
  
  
};

export default {
  //管理员分页
  managerList(searchParam) {
    return axiosApi.get("/admin/sysList",searchParam)
      
  },
  //新增管理员
  addNewmanager(param){
    return axiosApi.get("/admin/insert",param)
  },
  //删除管理员
  deleteManager(param){
    return axiosApi.get("/admin/delete",param)
  },
  //编辑管理员
  modifyManager(param){
    return axiosApi.get("/admin/update",param)
  },
  //获取管理员权限
  modifyAuthority(param){
    return axiosApi.get("/admin/permission",param)
  },
  //学生信息管理分页
  studentListInfo(param){
    return axiosApi.get("/student/studentList",param)
  },
  //学生信息删除
  deleteStudentInfo(param){
    return axiosApi.get("/student/delete",param)
  },
  //批量删除学生信息
  batchDeleteInfo(param){
    return axiosApi.post("/student/deleteList",param)
  },
  //职位管理分页
  positionInfo(param){
    return axiosApi.get("/sys/position",param)
  },
  //删除职位
  positionDelete(param){
    return axiosApi.get("/sys/position/delete",param)
  },
  //新增职位
  positionInsert(param){
    return axiosApi.get("/sys/position/insert",param)
  },
  //编辑职位
  positionModify(param){
    return axiosApi.get("/sys/position/update",param)
  },
  //简历管理分页
  resumeList(param){
    return axiosApi.get("/sys/resumeList",param)
  },

  //简历管理下载
  resumeDownload(param){
    return axiosApi.get("/sys/resume/upload",param)
  },
  //简历管理删除
  resumeDelete(param){
    return axiosApi.get("/sys/resume/delete",param)
  },

  //公司管理分页
  conpanyList(param){
    return axiosApi.get("/sys/companyList",param)
  },
  //公司删除
  conpanyDelete(param){
    return axiosApi.get("/sys/company/delete",param)
  },
  //公司新增
  conpanyInsert(param){
    return axiosApi.get("/sys/company/insert",param)
  },

   //就业资料分页
   employmentInfo(param){
    return axiosApi.get("/sys/informationList",param)
  },
  //就业资料上传
  employmentInfoUpload(param){
    return axiosApi.post("/sys/information/insert",param)
  },
  //就业资料删除
  employmentInfoDelete(param){
    return axiosApi.get("/sys/information/delete",param)
  },

  //就业管理分页
  employmentInfoManager(param){
    return axiosApi.get("/student/isJob",param)
  },

  //折线图数据
  getPolylineData(param){
    return axiosApi.get("/student/rate",param)
  },

  //饼状图图数据
  getPiechartData(param){
    return axiosApi.get("/student/professionCount",param)
  },

  //咨询管理分页
  askManager(param){
    return axiosApi.get("/student/zxList",param)
  },
  //咨询管理分页的单条删除
  askDelete(param){
    return axiosApi.get("/student/zxDelete",param)
  },

  //回复咨询接口
  replayQuestions(param){
    return axiosApi.get("/student/mail",param)
  },

  //管理员登录接口
  adminLogin(param){
    return axiosApi.get("/admin/login",param)
  },
  //获取权限
  getAuthroity(param){
    return axiosApi.get("/sys/token/sys",param)
  }

 
};
