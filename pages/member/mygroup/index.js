var t = getApp(),
  e = t.requirejs("core");
Page({
  data: {
    level: "yiji",
    page: 1,
    list: []
  },
  onLoad: function () {
    this.getSet(), this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getSet: function () {
    var t = this;
    e.get("commission/down/get_set", {}, function (e) {
      wx.setNavigationBarTitle({
        title: "我的团队"
      }), delete e.error, e.show = !0, t.setData(e)
    })
  },
  getList: function () {
    var t = this;
    e.get("commission/down/get_list", {
      page: t.data.page,
      level: t.data.level
    }, function (e) {
      var a = {
        total: e.total,
        pagesize: e.pagesize
      };
      e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a)
    }, this.data.show)
  },
  myTab: function (t) {
    // var a = this,
    //   i = e.pdata(t).level;
    // a.setData({
    //   level: i,
    //   page: 1,
    //   list: []
    // }), a.getList()
    var a = this,
      i = e.pdata(t).level;
    a.setData({
      level: i,
    });
  }
})