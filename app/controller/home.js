'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const {
      ctx
    } = this;

    let {
      image
    } = ctx.request.body;
    console.log(image);
    let img = new this.app.model.upload(ctx.request.body);
    // await img.save();
    // console.log();
    ctx.body = {
      data: {
        image: image,
      }
    };
  }
  //后台管理系统导航
  async backstagenav() {
    const {
      ctx
    } = this;

    let leftnav = [{
        path: "homepage",
        id: "100",
        navname: "首页",
        children: [],
      },
      {
        navname: "商品",
        path: "shop",
        id: "200",
        children: [{
            navname: "商品首页",
            path: "shophomepage",
            id: "210",
            children: [],
          },
          {
            navname: "商品管理",
            path: "shopmanagement",
            id: "220",
            children: [{
                navname: "新增商品",
                path: "addshop",
                id: "221",
                children: [],
              },
              {
                navname: "商品列表",
                path: "shoplist",
                id: "222",
                children: [],
              }
            ],
          }, {
            navname: "商品配置",
            path: "shopallocation",
            id: "230",
            children: [{
              navname: "商品分类",
              children: [],
              path: "class",
              id: "231",
            }, {
              navname: "商品品牌",
              children: [],
              path: "brand",
              id: "232",
            }, {
              navname: "商品模型",
              children: [],
              path: "model",
              id: "233",
            }, {
              navname: "商品规格",
              children: [],
              path: "specifications",
              id: "234",
            }, {
              navname: "商品属性",
              children: [],
              path: "attribute",
              id: "235",
            }, ],
          }, {
            navname: "评价咨询",
            path: "evaluationConsultation",
            id: "240",
            children: [{
              navname: "商品评价",
              path: "attribute",
              id: "241",
              children: [],
            }, {
              navname: "商品咨询",
              path: "consulting",
              id: "242",
              children: [],
            }, ],
          },
        ],
      },
      {
        navname: "会员统计",
        path: "cstatistics",
        id: "300",
        children: [],
      },
    ]

    ctx.body = {
      left: leftnav,
    };
  }
  //后台管理系统会员统计
  async vipsum() {
    let {ctx}=this;
    ctx.body = {
      data: [{
          bronze: "青铜vip",
          sum: 49
        },
        {
          Silver: "白银vip",
          sum: 34
        },
        {
          gold: "黄金vip",
          sum: 17
        },
        {
          platinum: "铂金vip",
          sum: 5
        },
        {
          bestall: "最强vip",
          sum: 1
        },
      ],
    };
  }
  //首页数据
  async recommend() {
    const {
      ctx,
      app
    } = this;

    let goods = await ctx.model.Home.find({}); //查询数据库商品

    //导航 
    let Classnav = ['推荐']; //分类导航

    goods.map((item) => {
      Classnav.push(item.category);
    })

    let nav = []; //

    for (let i = 0; i < Classnav.length; i++) {
      //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
      if (Classnav.indexOf(Classnav[i]) == i) {
        nav.push({
          name: Classnav[i]
        })
      }
    }


    //推荐轮播图数据
    let bannernumber = 3; //轮播图数量
    let banner; //轮播图数据

    // let date = new Date(); //获取当前日期伪随机
    // mydate
    // date = date.getDay();

    let constant = Math.round(Math.random() * (goods.length - 3))

    // console.log(constant);
    let bannergoods = goods;

    banner = bannergoods.splice(constant, bannernumber);

    //结束轮播图数据

    // console.log(goods.length);
    // console.log(nav.length);
    // console.log(banner.length);

    ctx.body = {
      code: 200,
      data: {
        nav: nav,
        banner: banner,
        goods: goods,
      }
    };

  }

  //分类导航
  async classnav() {
    const {
      ctx,
      app
    } = this;

    let goods = await ctx.model.Home.find({}); //查询数据库商品

    //导航 
    let Classnav = []; //分类导航

    goods.map((item) => {
      Classnav.push(item.category);
    })

    let nav = []; //

    for (let i = 0; i < Classnav.length; i++) {
      //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
      if (Classnav.indexOf(Classnav[i]) == i) {
        nav.push({
          name: Classnav[i]
        })
      }
    }

    ctx.body = {
      code: 200,
      data: {
        classtitle: nav
      }
    };

  }

  // 分类详情
  async calssany() {
    const {
      ctx
    } = this;
    let {
      calssany
    } = ctx.query;

    // console.log(calssany);


    let goods = await ctx.model.Home.find({
      category: calssany
    }); //查询数据库商品

    // console.log(goods);

    // calssany != '推荐'|| !calssany ? '' : goods = await ctx.model.Home.find({});

    //分类详情结束

    //推荐轮播图数据
    // let bannernumber = 3; //轮播图数量

    // let banner; //轮播图数据

    // // let date = new Date(); //获取当前日期伪随机
    // // mydate
    // // date = date.getDay();
    // // let bannersum = goods.length;
    // let constant = Math.round(Math.random() * (goods.length - 3))

    // // console.log(constant);
    // let bannergoods = goods;

    // banner = bannergoods.splice(constant, bannernumber);

    // //结束轮播图数据

    // console.log(goods);
    ctx.body = {
      code: 200,
      data: {
        goods: goods,
        // banner: banner,
      }
    };

  }

  //添加商品
  async addshop() {
    // console.log(111);
    const {
      ctx,
      app
    } = this;
    let {
      token,
      category
    } = ctx.request.body;
    let msg = "添加成功";
    let code = 200;
    let shopdetail = new app.model.Home(ctx.request.body);

    let dec;
    token && token != '' ? dec = app.jwt.verify(token, app.config.jwt.secret) : dec = false;
    
    if (shopdetail && dec) {

      category ?
        await shopdetail.save() : msg = '类别不能为空';

    } else {

      msg = '没有token或表单未填写';
      code = 406;
      shopdetail = {};

      
    }
    ctx.body = {
      code: code,
      message: msg,
      data: {
        shopdetail
      },
    };
  }


  //商品列表
  async shoplist(){
    const {
      ctx,
      app
    } = this;

    let goods = await ctx.model.Home.find()
    // console.log(goods);
    ctx.body={
      data:goods,
      code:200,
      message:'获取列表成功'
    }
  }

  
}

module.exports = HomeController;