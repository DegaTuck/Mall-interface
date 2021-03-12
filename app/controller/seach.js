'use strict';

const Controller = require('egg').Controller;

class SeachController extends Controller {
    async seach() {
        let {
            ctx
        } = this;
        // console.log(111);
        let {
            keyword
        } = ctx.request.body
        // console.log(keyword);

        // console.log(ctx.query);

       let keywordgoods = [];
        let goods = await ctx.model.Home.find()||[];

        let select = '';
            for (let i = 0; i < goods.length; i++) {
                select = JSON.stringify(goods[i]);
                // console.log(select);
                // console.log(select.indexOf(keyword));
                //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
                if (select.indexOf(keyword) != -1) {
                    keywordgoods.push(goods[i])
                }
            }

            // let mb = `${keyword}`
        
        // console.log(keywordgoods);
    
        ctx.body = {
            data: keywordgoods,
            msg: '查询成功',
            code: 200
        };
        keywordgoods = [];
    }
    async findCommodityDetailsById() {
        let {
            ctx
        } = this
        let {
            _id
        } = ctx.request.body
        let user = await ctx.model.Home.findOne({
            _id
        })
        ctx.body = {
            data: user,
            msg: '查询成功',
            code: 200
        }
    }
}

module.exports = SeachController;