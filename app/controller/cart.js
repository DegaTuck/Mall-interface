'use strict';

const Controller = require('egg').Controller;

class CartController extends Controller {

  //新增购物车
  async addcart() {
    let {
      ctx,
      app
    } = this;
    let {
      token
    } = ctx.request.body;

    //验证token
    let dec;
    token && token != '' ? dec = app.jwt.verify(token, app.config.jwt.secret) : dec = false;

    // console.log(dec);
    //用户本次添加购物车的数据
    let addcart = new app.model.Cart(ctx.request.body);
    
    // console.log(addcart);
    //查询本次添加 仓库是否已存在
    let goodsone = await ctx.model.Cart.findOne({goodsid:addcart.goodsid});

    // console.log(goodsone);
    if(goodsone){

      // goodsone.goodsnum += goodsone.goodsnum;
      // console.log(goodsone.goodsnum);
      // console.log(addcart);
      // console.log(addcart.goodsnum);
      addcart.goodsnum ? '' : addcart.goodsnum = 1;
      let num = eval(goodsone.goodsnum +"+"+ addcart.goodsnum)
      // console.log(num);
          //更新某项字段
      await ctx.model.Cart.updateOne({goodsid:addcart.goodsid},{goodsnum:num})

    }else{
      addcart.phone = dec.phone;

      addcart.goodsnum ? '' : addcart.goodsnum = 1;
      
      addcart.goodsnum ? await addcart.save() : '';
    }


    // console.log(addcart);
    // console.log(addcart.goodsnum);
    // await addcart.save()

    ctx.body = {
      data: [],
      message: '添加成功',
      code: 200
    }
  }

  //获取购物车
  async getcart() {
    let {
      ctx,
      app
    } = this;
    let {
      token
    } = ctx.request.body;

    //验证token
    let dec;
    token && token != '' ? dec = app.jwt.verify(token, app.config.jwt.secret) : dec = false;
    // console.log(dec);

    let cartlist = await ctx.model.Cart.find(
      dec.phone
    ) || [];

    ctx.body = {
      data: cartlist,
      message: '查询成功',
      code: 200
    }
  }

  //删除购物车
  async delcart() {
    let {
      ctx
    } = this;
    let {
      goodsid,phone
    } = ctx.request.body;
    let msg = '删除失败'

    //更新某项字段
    //   await ctx.model.User.updateOne({phone:"15284701718",phone:"13512345678",phone:"admin",phone:"13548281635"},{nickname:"丁海林是大美女"},function(err, docs){
    //     if(err) console.log(err);
    //     else msg = '更新失败';
    //     // console.log('删除成功：' + docs);
    // })

    //egg删除数据库
    await ctx.model.Cart.remove({
      phone:phone,
      goodsid: goodsid
    }, function (err, docs) {
      if (err) console.log(err);
      else msg = '删除成功';
      // console.log('删除成功：' + docs);
    })
    ctx.body = {
      // data: cartlist,
      message: msg,
      code: 200
    }

  }

  //减少购物车商品数量
  async reducecart() {
    let {
      ctx
    } = this;
    let {
      phone,
      goodsid
    } = ctx.request.body;
    let msg = '有问题'
    let code = 200;
    //查询仓库
    let goodsone = await ctx.model.Cart.findOne({
      goodsid:goodsid,
      phone:phone
    });
    // console.log(goodsone.goodsnum);

    if( goodsone.goodsnum == '1'){

      await ctx.model.Cart.remove({goodsid: goodsid})
      msg = '操作失败';
      // code = 403;
    }
    else{
      let num = eval(goodsone.goodsnum + "-1");
      // console.log(num);
     //更新某项字段
          await ctx.model.Cart.updateOne({
            goodsid: goodsone.goodsid,
            phone: goodsone.phone
          },{goodsnum:num},function (err, docs) {
              if (err) {console.log(err);}
              msg = '操作成功';
            })

    }

    ctx.body = {
      data:11,
      message: msg,
      code: code
    }

  }
  //输入更新购物车商品数量
  async upcart() {
    let {
      ctx
    } = this;
    let {
      phone,
      goodsid,
      goodsnum
    } = ctx.request.body;
    let msg = '操作成功'
    let code = 200;
    //查询仓库
    let goodsone = await ctx.model.Cart.findOne({goodsid:goodsid,phone:phone});
     //更新某项字段
     await ctx.model.Cart.updateOne({
      goodsid: goodsone.goodsid,
      phone: goodsone.phone
    },{goodsnum:goodsnum},function (err, docs) {
        if (err) {console.log(err);msg = '操作成功';}
      })


    ctx.body = {
      message: msg,
      code: code
    }

  }
  //增加购物车商品数量
  async pulscart() {
    let {
      ctx
    } = this;
    let {
      phone,
      goodsid
    } = ctx.request.body;
    let msg = '有问题'
    let code = 200;
    //查询仓库
    let goodsone = await ctx.model.Cart.findOne({goodsid:goodsid,phone:phone});
    // console.log(goodsone.goodsnum);

   
      let num = eval(goodsone.goodsnum + "+1");
      // console.log(num);
     //更新某项字段
     await ctx.model.Cart.updateOne({
      goodsid: goodsone.goodsid,
      phone: goodsone.phone
    },{goodsnum:num},function (err, docs) {
        if (err) {console.log(err);}
         msg = '操作成功';
      })



    ctx.body = {
      data:11,
      message: msg,
      code: code
    }

  }
}

module.exports = CartController;