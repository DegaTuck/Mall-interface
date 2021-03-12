
module.exports = app =>{
    let mongoose = app.mongoose
    let Schema = mongoose.Schema
    const HomeSchema = new Schema({
        //商品名称
        name:{
            type:String,
        },
        //分类
        category:{
            type:String
        },
        //原价
        orl_price:{
            type:String,
        },
        //优惠价格
        present_price:{
            type:String,
        },
        //数量
        amount:{
            type:String,
        },
        //详情
        detail:{
            type:String,
        },
        //
        image:{
            type:String,
        },
        create_time:{
            type:String,
        },
        update_time:{
            type:String,
        },
        image_path:{
            type:String
        },
        //简介介绍
        introduce:{
            type:String
        }

    })
    return mongoose.model('Home',HomeSchema)
}