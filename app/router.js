'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  
  router.post('/img', controller.upload.upload);

  router.post('/user/login',controller.user.login);// 登录
  
  router.post('/user/register',controller.user.register);//注册

  router.get('/user/userlist',controller.user.userlist);//用户列表

  router.post('/Address/addReceiveAddress',controller.address.addaddress);//添加地址

  router.get('/address/getaddresslist',controller.address.getaddresslist);//获取地址列表

  router.get('/home/recommend',controller.home.recommend)//商城数据

  router.post('/shop/addshop',controller.home.addshop)//添加商品

  router.get('/shop/shoplist',controller.home.shoplist)//商品列表

  router.get('/shop/calssany',controller.home.calssany)//分类详情

  router.get('/home/classnav',controller.home.classnav); //分类导航

  router.get('/back/backstagenav',controller.home.backstagenav);//后台导航数据
  
  router.post('/seach',controller.seach.seach); //搜索
  
  router.post('/seach/Details',controller.seach.findCommodityDetailsById); //通过id搜索详情

  router.get('/back/vipsum',controller.home.vipsum); //vip数据统计

  router.post('/cart/addcart',controller.cart.addcart);//添加购物车

  router.get('/cart/getcart',controller.cart.getcart);//获取购物车

  router.post('/cart/delcart',controller.cart.delcart);//删除购物车
  
  router.post('/cart/reducecart',controller.cart.reducecart);//减少购物车商品数量
  
  router.post('/cart/upcart',controller.cart.upcart);//传入数量改变商品数量
 
  router.post('/cart/pulscart',controller.cart.pulscart);//增加商品数量)
};


