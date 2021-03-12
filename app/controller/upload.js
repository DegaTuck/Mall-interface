'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const {
      ctx
    } = this;

    let {
      image
    } = ctx.request.body;
    console.log(image);
    let img = new this.app.model.Upload(ctx.request.body);
    await img.save();
    // console.log();
    ctx.body = {
      data:{
        image:image,
      }
    };
  
}


}

module.exports = UploadController;
