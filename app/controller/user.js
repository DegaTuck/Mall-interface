'use strict';

const Controller = require('egg').Controller;



class UserController extends Controller {


    //登录
    async login() {
        let {
            ctx,
            app
        } = this;
        // post请求传来的参数
        let {
            phone,
            pwd
        } = ctx.request.body; // Trim(user.phone)
        //去除空格
        // let str = phone;
        // console.log(phone);
        phone = phone.replace(/(^\s*)|(\s*$)/g, "");
        pwd = pwd.replace(/(^\s*)|(\s*$)/g, "");

        console.log(phone);
        // 判断数据库里面是否存在该用户
        let user = await ctx.model.User.findOne({
            phone
        })

        if (user && user.phone == phone && user.pwd === pwd) {
           
            // 登录成功,生成token
            let token = app.jwt.sign({
                phone: user.phone,
            }, app.config.jwt.secret);
            user.pwd = '*******';

            ctx.body = {
                code: 200,
                message: '登录成功',
                data: {
                    user: user,
                    token,
                },
            }

            // let userstate = ctx.body.data;

            // ctx.session.userInfo = userstate;//存入session用户状态 （token等）

            // let userInfo = ctx.session.userInfo;

            // console.log(userInfo);
        } else {
            let msg = "登录失败";
            // console.log(user.phone);
            // console.log(phone);
            user ?
                user.phone != phone ?
                msg = "请重新输入手机号" : user.pwd != pwd ?
                msg = "请重新输入密码" : msg : msg = "账号不存在";
            ctx.body = {
                code: 406,
                message: msg,
                data: {}
            };

        }
    }
    //注册
    async register() {

        //接受前端传递的参数
        let {
            ctx,
            app
        } = this;
        let {
            phone,
            pwd
        } = ctx.request.body;


        //去除前后的空格
        phone = phone.replace(/(^\s*)|(\s*$)/g, "");
        pwd = pwd.replace(/(^\s*)|(\s*$)/g, "");


        //查询有没有当前信息

        let usert = await ctx.model.User.findOne({
            phone
        })


        let user = new app.model.User(ctx.request.body)
        user.nickname === '' || !(user.nickname) ? user.nickname = phone : user.nickname = user.nickname;
        // console.log(user);

        if (usert) {
            ctx.body = {
                code: 406,
                message: '用户已存在',
            }
        } else {
            let msg = '注册成功';
            let code = 406;
            !(/^1[3|4|5|7|8][0-9]{9}$/.test(user.phone)) ?
            msg = '手机号有误': !(/^(?=.*[a-z]||[A-Z])(?=.*\d)[^]{6,18}$/.test(user.pwd)) ?
                msg = '密码必须是6到18位且至少1位字母或符号.+-*/等' : code = 200;
            // console.log(msg);
            // id = await ctx.model.User.findOne({
            //     userid
            // })

            // console.log(id);

            // console.log(user);
            // user.phone = 'admin';
            //     user.pwd= '123456'
            // console.log(code,msg);
            if (code == 200) {
                user.cover = 'https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/jd/j_0011.gif'
                user.createtime = +new Date();
                
                await user.save();
            }
            ctx.body = {
                code: code,
                message: msg,
                data: {},
                userinfo: user,
            }

        }


    }




    async userlist() {
        
        //接受前端传递的参数
        let {
            ctx
        } = this;
        // let {
        //     phone,
        //     pwd
        // } = ctx.request.body;
        let userlist = await ctx.model.User.find();
        ctx.body={
            data:userlist,
            code:200,
            message:'获取成功'
        }

    }

}

module.exports = UserController;