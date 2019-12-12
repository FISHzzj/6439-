// pages/shouye/pintuan/pt_success/pt_success.js
var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid : '',
    info : '',
    allPrice : ''
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
        info : res.result,
        allPrice: Number(res.result.myorder.realprice) + Number(res.result.myorder.freight)
      })
    });
  },

  handleContact : function(e){
    console.log(e.detail.path)
    console.log(e.detail.query)
  },  


  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.info.myorder.orderno,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
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
    return {
      title: '转发',
      path: '/pages/member/fenxiang/index',
      success: function (res) { }
    }

  },


  refund : function(){
    var teamid = this.data.teamid;
    var orderid = this.data.info.myorder.id;
    wx.navigateTo({
      url: '/pages/groups/refund/index?teamid='+teamid + '&orderid=' + orderid,
    })
  }
})