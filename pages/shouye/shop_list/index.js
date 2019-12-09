var t = getApp(), a = t.requirejs("core");
Page({
  data: {
    cate: "",
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    approot: t.globalData.approot,
    btn: "reginer",
    subtn: "shengqing",
    pageputong:1 //普通商品的页数
  },
  onLoad: function (t) {
    this.getList()
  },
  myTab: function (t) {
    // var e = this, i = a.pdata(t).cate;
    // e.setData({ cate: i, page: 1, list: [] }),
    //   e.getList()

    var e = this, i = a.pdata(t).cate;
    e.setData({ cate: i }), e.getList(i);
  },
  getList: function (i) {
    var t = this;
    a.loading(), this.setData({ loading: !0 }),
      a.get("goods/category/get_poverty_goods", { ccate:i }, function (e) {
        // console.log(e);
      t.setData({ ccates: e.ccates, group_goods: e.group_goods, goods: e.goods, pcate: e.pcate})
        a.hideLoading()
      })
  }, 
  // onReachBottom: function () {
  //   this.data.loaded || this.data.list.length == this.data.total || this.getList()
  // },
  jump: function (t) {
    var e = a.pdata(t).id; e > 0 && wx.navigateTo({ url: "/pages/sale/coupon/my/detail/index?id=" + e })
  },
  // 加载更多
  pintuanduo:function(){
    var n = this;
    var pcate = n.data.pcate, ccate = n.data.ccate, page = n.data.page + 1, groupgoods = n.data.group_goods;
    console.log(page);
    console.log(groupgoods.length);
    console.log(this.data.total)
    if (groupgoods.length >= this.data.total){
      return
    }
    a.get("goods/category/get_group_goods_list", { ccate: ccate, pcate: pcate, page: page }, function (e) {
      console.log(e);
      var groupgoodsarr = groupgoods.concat(e.group_goods);
      console.log(groupgoodsarr)
      n.setData({ ccates: e.ccates, group_goods: groupgoodsarr, pcate: e.pcate, page: e.page, total: e.total})
    })
  },
  putongduo:function(){
    var n = this;
    var pcate = n.data.pcate, ccate = n.data.ccate, pageputong = n.data.pageputong + 1, putonggoods = n.data.goods;
    console.log(pageputong);
    console.log(putonggoods.length);
    console.log(this.data.total)
    if (putonggoods.length >= this.data.total) {
      return
    }
    a.get("goods/category/get_goods_list", { ccate: ccate, pcate: pcate, page: pageputong }, function (e) {
      console.log(e);
      var putonggoodsarr = putonggoods.concat(e.goods);
      console.log(putonggoodsarr)
      n.setData({ ccates: e.ccates, goods: putonggoodsarr, pcate: e.pcate, pageputong: e.page, total: e.total })
    })
  }
})
