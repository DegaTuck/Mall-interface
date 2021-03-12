
module.exports = app =>{
    let mongoose = app.mongoose
    let Schema = mongoose.Schema
    const AddressSchema = new Schema({
        //手机号
        phone:{
            type:String,
        },
        //收货人
        consignee:{
            type:String
        },
        //收货人电话
        receivephone:{
            type:String
        },
        //地区
        area:{
            type:String
        },
        //详细地址
        detailaddress:{
            type:String
        },
        //添加时间
        createtime:{
            type:String
        }
    })
    return mongoose.model('Address',AddressSchema)
}