// pages/shouye/pintuan/pt_success/pt_success.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid : '',
    info : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.teamid);
    this.setData({
      teamid : options.teamid
    });
    this.getinfo();
  },

  getinfo : function(){
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    e.get('/groups/team/detail',{
      teamid : this.data.teamid
    },res=>{
      wx.hideLoading();
      console.log(res.result);
      this.setData({
        info : res.result
      })
    });
  },

  handleContact : function(e){
    console.log(e.detail.path)
    console.log(e.detail.query)
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