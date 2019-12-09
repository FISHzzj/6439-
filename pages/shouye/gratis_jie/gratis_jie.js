// pages/home_new/gratis_jie/gratis_jie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns: ["红包兑换", "众券兑换", "零元秒杀","一带一免单"],
    active: 0,//控制当前显示的div
    coupon:0
  },
  toggle: function (e) {
    console.log(e.currentTarget.dataset.index)
    var new_ingex = e.currentTarget.dataset.index
    if (new_ingex==1){
      this.setData({
        coupon:1
      })
    } else if (new_ingex == 0){
      this.setData({
        coupon: 0
      })
    } else if (new_ingex == 2) {
      this.setData({
        coupon: 2
      })
    } else if (new_ingex == 3) {
      this.setData({
        coupon: 3
      })
    }
    this.setData({
      //设置active的值为用户点击按钮的索引值
      active: e.currentTarget.dataset.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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