var e = getApp(), r = e.requirejs("core"), t = e.requirejs("wxParse/wxParse");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort_list: [],
    btns: [{ "time": "18:00", "state": "已开抢" }, 
          { "time": "18:00", "state": "已开抢" }, 
          { "time": "18:00", "state": "已开抢" }, 
          {"time": "18:00", "state": "已开抢" }],
    active: 0,//控制当前显示的div
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    reward:'',
  },
  toggle: function (e) {
    console.log(e)
    this.setData({
      //设置active的值为用户点击按钮的索引值
      active: e.currentTarget.dataset.index,
    })
  },
  sortlist:function(e){
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index;
    if (index == '7'){
      wx.navigateTo({
        url: '/pages/shouye/gratis_jie/gratis_jie'
      })
    }else if(index == '0'){
      wx.navigateTo({
        url: '/pages/shouye/shop_list/index'
      })
    }else if (index == '6'){
      wx.navigateTo({
        url: '/pages/shouye/richang/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this;
    a.getList();
  },
  getList:function(){
    var n = this;
    r.get("shop_index", { }, function (r) {
      console.log(r);
      if(r.error==0){
        n.setData({ advs: r.advs, goods: r.goods, sort_list: r.navs, group_goods: r.group_goods });
      }
    })
  },
  //分享
  showShare: function (t) {
    var a = this;
    a.setData({
      active: "active",
      slider: "in",
      showshare: 1
    })
  },
  emptyActive: function () {
    this.setData({
      active: "",
      slider: "out",
      showshare: 0
    })
  },
  // 签到
  qiandao:function(){
    var n = this;
    r.post("sign/dosign_check", {}, function (r) {
      console.log(r);
      if (r.error == 0) {
        n.setData({
          reward: r.reward,
          showqiandao: 1
        })

      }else{
        wx.showToast({
          title: r.message,
          icon: 'success',
          duration: 2000
        })
      }
    })
    
  },
  successbtn:function(){
    var n = this;
    r.post("sign/dosign", {}, function (r) {
      console.log(r);
      if (r.error == 0) {
        wx.showToast({
          title: r.message,
          icon: 'success',
          duration: 2000
        })
       
      } else {
        wx.showToast({
          title: r.message,
          icon: 'success',
          duration: 2000
        })
      }
      n.setData({
        showqiandao: 0
      })
    })
   
  },
  removebtn:function(){
    this.setData({
      showqiandao: 0
    })
  },

  // 拼团商品加载更多
  pingtuanduo:function(){
    var n = this;
    // r.post("goods/category/get_group_goods_list", {}, function (r) {
    //   console.log(r);
    //   if (r.error == 0) {
    //     wx.showToast({
    //       title: r.message,
    //       icon: 'success',
    //       duration: 2000
    //     })

    //   }
    // })
  },
  putongduo:function(){
    console.log(4444444444);
  },
  goto: function () {
    wx.navigateTo({
      url: '/pages/shouye/pintuan/pintuan?id=28',
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