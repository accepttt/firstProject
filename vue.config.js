'use strict'
const path = require('path')
// 路径加载
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      // .set('@constants', resolve('src/constants'))
      // .set('@plugins', resolve('src/plugins'))
      // .set('@request', resolve('src/request'))
      // .set('@store', resolve('src/store'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))

   

    
  }
}
