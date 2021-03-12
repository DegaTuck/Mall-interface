module.exports = app => {
    let mongoose = app.mongoose
    let Schema = mongoose.Schema
    const CartSchema = new Schema({
        //商品id
        goodsid: {
            type: String
        },
        //添加该商品数量
        goodsnum: {
            type: String||Number
        },
        //用户信息
        phone: {
            type: String
        }

    })
    return mongoose.model('Cart', CartSchema)
}