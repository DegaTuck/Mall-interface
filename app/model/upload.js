//用户的所有信息
 //username 1. 用户id: userid  (int)
// 2. 头像：portrait (string)
// 3. 昵称：nickname (s)
// 4. 性别：sex (type)
// 5. 手机号：phone (s)
// 6. 密码：pwd (s)
// 7. 个人签名：sign (s)

module.exports = app =>{
    let mongoose = app.mongoose
    let Schema = mongoose.Schema
    const UploadSchema = new Schema({
        image:{
            type:String
        },
        
    })
    return mongoose.model('Upload',UploadSchema)
}