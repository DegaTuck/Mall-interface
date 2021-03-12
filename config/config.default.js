/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_666666';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //连接数据库
  config.mongoose = {
    url: 'mongodb://localhost:27017/shop',
  }


  config.security = {
    // 关闭csrf验证
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList:'http://192.177.2.67:7001'
  };


  //跨域 cors

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
    credentials: true,
  };

  //鉴权 jwt

  config.jwt = {
    secret: '123456',
  };


  //session内存

  config.keys = appInfo.name + '_1532511512428_3477';

  // // 配置session
  // config.session = {
  //   // 设置session cookie里面的key
  //   key: 'SESSION_ID',
  //   // 设置最大的过期时间
  //   maxAge: 1 ,
  //   // 设置是否只服务端可以访问
  //   httpOnly: true,
  //   // 设置是否加密
  //   encrypt: true,
  //   // 设置为true每次刷新页面的时候session都会被延期
  //   renew: true
  // }

  // 配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};