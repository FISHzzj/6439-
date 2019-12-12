var t = getApp(), a = t.requirejs("core"), locat = require("../../../utils/Location.js"), e = t.requirejs("jquery");
Page({
  data: {
    cate: "",
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    approot: t.globalData.approot,
    btn:"reginer",
    subtn:"shengqing",
    tempFilePaths: [], //营业执
    region: ["省", "市", "区"],
    addr_detail: "",
    lon_lat: "",
    checkbox:"",
    regionhao: ["省", "市", "区"],
    lon_lathao:"",
    addr_detailhao:"",
    showbtn: !1,
    haohuoFilePaths:[] ,//产品图片
    haohuovideoFilePaths: [], //产品视频
  },
  onLoad: function (t) {
    this.getList();
    this.getShopList();
  },

  goto : function(){
    wx:wx.navigateTo({
      url: '/pages/member/supplier/supplyGoods/supplyGoods',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getShopList : function(){
    wx.showLoading({
      title: '加载中',
    })
    a.post('/supplier/goods',{

    },res=>{
      wx.hideLoading();
      console.log(res.list);
      this.setData({
        lm_shopList : res.list
      })
    });
  },


  myTab: function (m) {
    // var e = this, i = a.pdata(t).cate;
    // e.setData({ cate: i, page: 1, list: [] }),
    //   e.getList()
    var status = t.getCache("gysdl");
    console.log(status);
    var e = this, i = a.pdata(m).cate;
    if (i == "shop"){
      if (status){
        e.setData({ cate: 'shop111' });
      }
    }else{
      e.setData({ cate: i });
    }
  },
  getList: function () {
    var t = this;
    a.loading(), this.setData({ loading: !0 }),
      a.get("sale/coupon/my/getlist", { page: this.data.page, cate: this.data.cate }, function (e) {
        console.log(e);
        e.list.forEach(function (o) {
          console.log(o)
          if (o.couponname == '收银优惠卷') {
            o.sic = '0';
            o.imgc = 'blue'
          } else if (o.couponname == '购物优惠卷') {
            o.sic = '_j2';
            o.imgc = 'blue1'
          } else if (o.couponname == '充值优惠卷') {
            o.sic = '_c';
            o.imgc = 'red'
          }

        })
        var i = { loading: !1, total: e.total, pagesize: e.pagesize, closecenter: e.closecenter }; e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list),
          e.list.length < e.pagesize && (i.loaded = !0)), t.setData(i), a.hideLoading()
      })
  }, 
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  jump: function (t) {
    var e = a.pdata(t).id; e > 0 && wx.navigateTo({ url: "/pages/sale/coupon/my/detail/index?id=" + e })
  },
  btnclick:function(t){
    var e = this, i = a.pdata(t).btn;
    if (i =="reginer"){
      e.setData({ btn: i });
    }else{
      e.setData({ btn: i });
    }
  },
  btnview:function(t){
    var e = this, i = a.pdata(t).subtn;
    if (i == "shengqing") {
      e.setData({ subtn: i });
    } else {
      e.setData({ subtn: i });
    }
  },
  checkboxChange:function(e){
    console.log(e.detail.value);
  },
  //获取准确地址(联盟商家)
  chose_location: function (g) {
    // console.log(333333);
    var r = this, location = a.pdata(g).location;
    wx.chooseLocation({
      success: function (t) {
        // console.log(t);
        var e = t.longitude + "," + t.latitude, a = t.address, n = r.data.region, i = "", o = a, s = new RegExp("(.*?省)(.*?市)(.*?区)", "g"), l = s.exec(o);
        null == l && null == (l = (s = new RegExp("(.*?省)(.*?市)(.*?市)", "g")).exec(o)) && null == (l = (s = new RegExp("(.*?省)(.*?市)(.*县)", "g")).exec(o)) || (n[0] == l[1] && n[1] == l[2] && n[2] == l[3] || wx.showToast({
          title: "省市区信息已同步修改",
          icon: "none"
        }), n[0] = l[1], n[1] = l[2], n[2] = l[3], i = a.replace(l[0], ""));
        var u = i + t.name, c = "";
        // console.log(location);
        if (location =='haohuo'){
          r.setData({
            regionhao: n,
            lon_lathao: e,
            addr_detailhao: u
          });
          // console.log(r.data.regionhao);
          // console.log(r.data.lon_lathao);
          // console.log(r.data.addr_detailhao);
        } else if (location == 'lianmen'){
          r.setData({
            region: n,
            lon_lat: e,
            addr_detail: u
          });
        }

      }
    });
  },
  //双向绑定(联盟商家)
  zhanghao:function(t){
    this.setData({
      zhanghao: t.detail.value
    });
  },
  upwd: function (t) {
    this.setData({
      upwd: t.detail.value
    });
  },
  name: function (t) {
    this.setData({
      name: t.detail.value
    });
  },
  mobile: function (t) {
    this.setData({
      mobile: t.detail.value
    });
  },
  shopname: function (t) {
    this.setData({
      shopname: t.detail.value
    });
  },
  //复选框
  checkboxChange: function (e) {
    var a = this;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value ==1){
      a.setData({
        checkbox: 1
      });
    }
  },
  // 上传图片
  fileimg: function (t) {
    var e = this,
      i = a.pdata(t).cate;
    var imgArr = e.data.tempFilePaths; //营业执
    // var imgmendian = e.data.tempmendian; //门店照
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res);
        if (i =="yingyezhi"){
          res.tempFilePaths.forEach(function (o) {
            imgArr.push(o)
          })
        }
        // else{
        //   res.tempFilePaths.forEach(function (o) {
        //     imgmendian.push(o)
        //   })
        // }
        e.setData({
          tempFilePaths: imgArr,
          // imgmendian: imgmendian
        })
      }
    })
  },
  // 申请注册(联盟商家)
  formSubmit: function (submitData) {

    var a = this,
      zhanghao = a.data.zhanghao,
      upwd = a.data.upwd,
      name = a.data.name,
      mobile = a.data.mobile,
      address = a.data.addr_detail, //详细地址
      shopname = a.data.shopname,
      imageList = a.data.tempFilePaths, //营业执
      checkbox = a.data.checkbox,
      region = a.data.region, //省市区
      lon_lat = a.data.lon_lat.split(",");  //经纬度
    if ("" == zhanghao || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(zhanghao)){
      wx.showToast({
        title: '请输入登录账号有误',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!upwd || upwd.length<6){
      wx.showToast({
        title: '请输入登录密码',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!name) {
      wx.showToast({
        title: '请输入你的姓名',
        icon: 'success',
        duration: 2000
      })
      return
    } else if ("" == mobile || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!address) {
      wx.showToast({
        title: '请输入地址',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!shopname) {
      wx.showToast({
        title: '请输入店名称',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!imageList) {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!checkbox) {
      wx.showToast({
        title: '请同意合同内容',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!region) {
      wx.showToast({
        title: '没有获取到省市区',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!lon_lat) {
      wx.showToast({
        title: '没有获取到经纬度',
        icon: 'success',
        duration: 2000
      })
      return
    }

    var data = {
      'account': zhanghao,
      'password': upwd,
      'realname': name,
      'telephone': mobile,
      'province': region[0],
      'city': region[1],
      'area': region[2],
      'address': address,
      'shopname': shopname,
      // 'license': imageList, //营业执
      // 'shopimages': imgmendian, //门店照
      'longitude': lon_lat[0],
      'latitude': lon_lat[1]
    
    }
    var data1 = {}, imgArr = [];//上传图片数组
    var arrImg = [];
    var imgarr = [];//最终上传图片数组 
    imageList.forEach(function (o) {
      // console.log(o)
      // if (a.getFileType(o) == 'image') {
        //图片
        arrImg.push(o);
      // }
    })
    var e = t.requirejs("core")
    // console.log(imgArr);
    if (arrImg.length != 0) {
      //图片
      // data.images = arrImg;
      data.type = 1;

      var allData = e.getUrl("util/uploader/upload", { file: "file", type: 'image' }, function (res) {

      });
      data1.arr = arrImg;
      // console.log(data1);
      a.myUploadimg(
        data1,
        function (res) {//成功
          console.log(res);
          imgarr.push(res.files[0].url)
        },
        function (res) {
          console.log('上传失败');
        },
        function (res) {
          data.license = imgarr[0];
          data.shopimages = imgarr[1] 
          e.post("supplier/apply", data, function (res) {
            console.log(res);
            // if (res.error == 0) {
            //   wx.switchTab({
            //     url: "/pages/member/index/index"
            //   })
            // } else {
            //   e.alert(res.message);
            // }
          })
        },
        allData
      )

    } 
  },

  denglu : function(){
    if(!this.data.zhanghao){
      wx.showToast({
        title: '请输入登录账户',
        icon: 'none'
      })
    }else if(!this.data.upwd){
      wx.showToast({
        title: '请输入密码',
        icon : 'none'
      })
    }else{
      wx.showLoading({
        title: '登录ing~',
      })
      a.get('/supplier/login',{
        account : this.data.zhanghao,
        password: this.data.upwd
      },res=>{
        wx.hideLoading();
        console.log(res);
        if(res.error==0){
          wx.showToast({
            title: res.message,
          })
          this.setData({
            cate: 'shop111'
          });
          t.setCache('gysdl',true);
        }else{
          wx.showToast({
            title: res.message,
          })
        }
        
      })

    }
  },



  //我有好货
  nameChange:function(t){
    this.setData({
      nameChange: t.detail.value
    });
  },
  telChange:function(t){
    this.setData({
      telChange: t.detail.value
    });
  },
  bindTextAreaBlur:function(e){
    console.log(e.detail.value);
    this.setData({
      textarea: e.detail.value
    });
  },
  haohuotijiao:function(){
    var a = this,
      nameChange = a.data.nameChange,
      telChange = a.data.telChange,
      addr_detailhao = a.data.addr_detailhao, //详细地址
      regionhao = a.data.regionhao, //省市区
      lon_lathao = a.data.lon_lathao.split(","),  //经纬度
      textarea = a.data.textarea, //产品详情
      haohuoFilePaths = a.data.haohuoFilePaths, //图片
      haohuovideoFilePaths = a.data.haohuovideoFilePaths;  //视频
    

    if (!nameChange) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'success',
        duration: 2000
      })
      return
    } else if ("" == telChange || !/^1(3|4|5|6|7|8|9)\d{9}$/.test(telChange)) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!addr_detailhao) {
      wx.showToast({
        title: '请输入地址',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!textarea) {
      wx.showToast({
        title: '请输入产品详情',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!haohuoFilePaths) {
      wx.showToast({
        title: '请上传商品图片',
        icon: 'success',
        duration: 2000
      })
      return
    } else if (!haohuovideoFilePaths) {
      wx.showToast({
        title: '请上传商品视频',
        icon: 'success',
        duration: 2000
      })
      return
    }

    var data = {
      'realname': nameChange,
      'telephone': telChange,
      'province': regionhao[0],
      'city': regionhao[1],
      'area': regionhao[2],
      'address': addr_detailhao,
      'content': textarea
      // 'goodimages': haohuoFilePaths, //商品图片
      // 'goodvideo': haohuovideoFilePaths //商品视频

    }
    var data1 = {}, imgArr = [];//上传图片数组
    var arrImg = [];//上传视频数组
    var imgarr = [],//最终上传图片数组 
      arrVideo = [];//最终上传视频数组
    haohuoFilePaths.forEach(function (o) {
      // console.log(o)
      //if (a.getFileType(o) == 'image') {
        //图片
      imgArr.push(o);
      // } else {
      //   // 视频
      //   imgArr.push(o);
      // }
    })
    haohuovideoFilePaths.forEach(function (o) {
      // console.log(o)
      // if (a.getFileType(o) == 'image') {
      //   //图片
      //   arrImg.push(o);
      // } else {
        // 视频
      arrImg.push(o);
      // }
    })
    var e = t.requirejs("core")
    // console.log(imgArr);
    if (imgArr.length != 0) {
      //图片
      // data.images = arrImg;
      data.type = 1;

      var allData = e.getUrl("util/uploader/upload", { file: "file", type: 'image' }, function (res) {

      });
      data1.arr = imgArr;
      console.log(data1);
      a.myUploadimg(
        data1,
        function (res) {//成功
          console.log(res);
          imgarr.push(res.files[0].url)
        },
        function (res) {
          console.log('上传失败');
        },
        function (res) {
          data.images = imgarr;
          // e.post("supplier/update_good", data, function (res) {
          //   if (res.error == 0) {
          //     wx.switchTab({
          //       url: "/pages/member/index/index"
          //     })
          //   } else {
          //     e.alert(res.message);
          //   }
          // })
        },
        allData
      )

    } 
    
    if (arrImg.length !=0) {
      //视频
      // data.video = imgArr;
      data.type = 2;

      var allData = e.getUrl("util/uploader/upload", { file: "file", type: 'video'}, function (res) {

      });
      data1.arr = arrImg;
      console.log(data1);
      a.myUploadimg(
        data1,
        function (res) {//成功
          console.log(res);
          arrVideo.push(res.files[0].url)
        },
        function (res) {
          console.log('上传失败');
        },
        function (res) {
          data.video = arrVideo;
          e.post("share/upload", data, function (res) {
            if (res.error == 0) {
              wx.switchTab({
                url: "/pages/member/index/index"
              })
            } else {
              e.alert(res.message);
            }
          })
          console.log(data);
        },
        allData
      )
    }
  },
  uploadtu:function(){
    // console.log(33333333);
    var e = this;
    e.setData({ showbtn: 1 });
  },

  // 上传图片
  uploadImgBtn: function () {
    // console.log(4444444444);
    var a = this;
    var imgArr = a.data.tempFilePaths;
    a.setData({
      hs_btnshow: true
    })
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        res.tempFilePaths.forEach(function (o) {
          imgArr.push(o)
        })
        a.setData({
          haohuoFilePaths: imgArr,
          showbtn: !1
        })
      }
    })
  },
  //上传视频
  uploadVideoBtn() {
    // console.log(2222222);
    var that = this;
    that.setData({
      hs_btnshow: false
    })
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back',
      success: res => {
        console.log(res);
        let uploaderList = that.data.haohuovideoFilePaths.concat(res.tempFilePath);

        that.setData({
          haohuovideoFilePaths: uploaderList,
          showbtn: false
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  //上传图片
  myUploadimg: function (data, _success, _fail, _complete, allData) {
    var self = this,
      success = data.success || 0,//成功次数
      i = data.i || 0,//当前文件下标
      fail = data.fail || 0,//失败次数
      invalid = data.invalid || 0,//图片格式错误
      filePath = data.arr[i];//图片路径数组
    console.log(filePath);
    wx.uploadFile({
      url: allData,
      filePath: filePath,
      name: 'file',
      formData: {},
      success: function (res) {

        var d = JSON.parse(res.data);
        //console.log(d)
        var isSuccess;
        i++;
        success++;
        if (i == data.arr.length) {
          isSuccess = true;
        }
        if (typeof _success === "function") _success(d, isSuccess, invalid);
      },
      fail: function (res) {
        //console.log(res);
        var d = JSON.parse(res.data);
        var isSuccess;
        i++;
        fail++;
        //console.log("fail:", fail);
        if (i == data.arr.length) {
          isSuccess = true;
        }

        if (typeof _fail === "function") _fail(d, isSuccess, invalid);
      },
      complete: function (res) {
        //console.log(res)
        var d = JSON.parse(res.data);
        if (d.error == "1") {
          e.alert(res.errMsg);
          return;
        }
        var cb = function () {
          if (i == data.arr.length) {  //当图片传完时，停止调用       
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            if (typeof _complete === "function") _complete(res);
          } else {
            data.i = i;
            data.success = success;
            data.fail = fail;
            self.myUploadimg(data, _success, _fail, _complete, allData);
          }
        };

        if (/ok/.test(res.errMsg)) {
          var _data = res;
          if (!invalid && _data.status == 1) {
            // 成功且违规图片
            invalid = 1;
            data.invalid = invalid;
          }
        }
        cb();

      }
    })
  },
})
