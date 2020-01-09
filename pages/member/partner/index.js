var a = getApp(), e = a.requirejs("core"), t = a.requirejs("foxui"), n = a.requirejs("jquery");
Page({
  data: {
    loading: !0,
    objectArray: [],
    checkedIndex: 1,
    checked: {},
    bankChecked: {},
    money: 0,
    chargeShow: !1,
    disabled: !0,
    info: {},
    realInfo: {}

  },
  onShow: function (e) {
    var c = a.requirejs("core");
    if ("" == a.getCache("userinfo")) {
      wx.switchTab({
        url: "/pages/member/index/index"
      })
      c.alert('请先授权，再执行后面的操作');
      return;
    }

    // a.url(e),
      this.getInfo(),
      this.setData({
        // isSubmit: !1
        show: !0
      })
  },
  getInfo:function(){
    var n = this;
    e.get('partner','',function(e){
      console.log(e);
      n.setData({
        partner_apply: e.partner_apply, //自由团长申请(flase为未申请)
        partner_shop_apply: e.partner_shop_apply, //实体店团长申请
        branch_office_apply: e.branch_office_apply, //分公司申请
        operate_centre_apply: e.operate_centre_apply //运营中心申请
      })

    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  shitidian:function(t){
    var shen =  e.pdata(t).shen;
    if (shen == "ziyou"){
      wx.navigateTo({
        url: "/pages/member/ziyou/index"
      })
    } else if (shen == "shitidian"){
      wx.navigateTo({
        url: "/pages/member/shitidian/index"
      })
    } else if (shen == "yunying"){
      wx.navigateTo({
        url: "/pages/member/yunying/index"
      })
    } else if (shen == "fengongsi"){
      wx.navigateTo({
        url: "/pages/member/fengongsi/index"
      })
    }
  
  },
  shitidianid:function(t){
    var id = e.pdata(t).id;
    wx.navigateTo({
      url: "/pages/member/shenhe/index?id="+id
    })
  }
})
