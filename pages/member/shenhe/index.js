var a = getApp(), e = a.requirejs("core"), t = a.requirejs("foxui"), n = a.requirejs("jquery");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var n = this;
    var id = options.id;
    console.log(id);
    e.get("partner/apply_detail", { apply_type:id},function(res){
      console.log(res);
      n.setData({
        nickname: res.apply_record.nickname,
        telephone: res.apply_record.telephone,
        province: res.apply_record.province,
        city: res.apply_record.city,
        area: res.apply_record.area,
        address: res.apply_record.address
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