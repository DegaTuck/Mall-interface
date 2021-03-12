'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {
  //新增地址
  async addaddress() {
    let {
      ctx,
      app
    } = this;
    let {
      phone,
      consignee,
      receivephone,
      area,
      detailaddress,
      token
    } = ctx.request.body;
    // console.log(ctx.request.body);
    let address = new app.model.Address(ctx.request.body)
    // console.log(address)
    let user = await ctx.model.User.findOne({
      phone
    })

    //验证token
    let dec;
    token && token != '' ? dec = app.jwt.verify(token, app.config.jwt.secret) : dec = false;

    // console.log(dec.phone);

    //   let userInfo = ctx.session.userInfo;
    // console.log(111111);
    //   console.log(userInfo);

    if (address && dec) {
      let msg = '添加成功';
      let code = 406;
      phone != dec.phone ?
        msg = '登录状态异常,或手机号有误' :
        !(/^1[3|4|5|7|8][0-9]{9}$/.test(receivephone)) ? msg = '收货人手机号有误' :
        consignee === '' ? msg = '请填写收货人信息' :
        receivephone = '' ? msg = '请填写收货人电话' :
        area === '' ? msg = '请完善地区' :
        detailaddress === '' ? msg = '请完善详细地址' :
        code = 200;
        
      if (code == 200){ 
        // console.log(address.phone);
        address.phone = phone;
        // console.log(address);
        await address.save();
      }
      // //新增成功
      ctx.body = {
        data:address,
        code: code,
        message: msg,
      }
    } else {

      //地址信息不完整或没有token
      ctx.body = {
        code: 406,
        message: '地址信息不完整或没有token'
      }


    }
  }

  //获取地址列表
  async getaddresslist() {
    let {
      ctx,
      app
    } = this;
    let {
      token
    } = ctx.query;

    
    //验证token
    let dec;
    token && token != '' ? dec = app.jwt.verify(token, app.config.jwt.secret) : dec = false;
    // console.log(token);
    // console.log(dec.phone);
    let address;
    
    dec ?address = await ctx.model.Address.find({phone:dec.phone})||[]:address = await ctx.model.Address.find();


    ctx.body = {
      data:address,
      code: 200,
      message: '获取成功'
    }
  }

}

module.exports = AddressController;
