// pages/shouye/gratis_jie/bargain/bargainOrder/bargainOrder.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery")), s = t.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : '',
    info : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id
    });
    this.getinfo();
  },

  getinfo(){
    wx.showLoading({
      title: '加载',
    })
    e.get('/bargain/bargain',{
      id : this.data.id
    },res=>{
      wx.hideLoading();
      s.wxParse("wxParseData", "html", res.result.account_set.rule, this, "5")
      console.log(res)
      this.setData({
        info : res.result
      })
    });
  },
  zero(){
    wx.showLoading();
    e.post('/bargain/draw_goods',{
      id : this.data.id,
    },res=>{
      wx.hideLoading();
      console.log(res);
      wx.showModal({
        title: '提示',
        content: res.result.message,
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function () {

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //测试函数
  mobilize() {
    var that = this;
    wx.navigateTo({
      url: '/pages/shouye/gratis_jie/bargain/helpBargain/helpBargain?id=' + that.data.info.res.id + '&shopid=' + that.data.info.res2.id
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.info.res2.title,
      imageUrl: this.data.info.res2.images,
      path: '/pages/shouye/gratis_jie/bargain/helpBargain/helpBargain?id=' + this.data.info.res.id +'&shopid=' + this.data.info.res2.id,
      success: function (res) {
        console.log(res);
      }
    }
  } 
})