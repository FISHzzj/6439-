// pages/shouye/gratis_jie/bargain/helpBargain/helpBargain.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery")), s = t.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      selfId : options.shopid
    });
    this.getinfo();
  },


  getinfo() {
    wx.showLoading({
      title: '加载',
    })
    e.get('/bargain/bargain', {
      id: this.data.id
    }, res => {
      wx.hideLoading();
      s.wxParse("wxParseData", "html", res.result.account_set.rule, this, "5")
      console.log(res)
      this.setData({
        info: res.result
      })
    });
  },

  //自己开
  self(){
    wx.navigateTo({
      url: '/pages/shouye/gratis_jie/bargain/bargain?id=' + this.data.selfId,
    })
  },
  //帮砍
  help(){
    wx.showLoading();
    e.post('/bargain/bargain',{
      ajax : 151,
      id : this.data.id,
      mid : ''
    },res=>{
      wx.hideLoading();
      console.log(res);
      if(res.data == 0){
        this.setData({ show : true })
      }else{
        wx.showToast({
          title: res.result.data,
          icon: 'none'
        })
      }
    })
  },
  close(){
    this.setData({
      show : false,
    });
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
  onUnload: function () {

  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})