// component/Address/Address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address : Object,
    pickAddress : Object,
    pick_class : Boolean,
    express_class : Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    address : function(){
      this.triggerEvent('address');
    },
    pickUpPoint : function(){
      this.triggerEvent('pickUpPoint');
    }
  }
})
