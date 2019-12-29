let app = getApp()

Page({
  data: {
    currentTab: 0,
    deviceInfo: {},
    //这里只做tab名和显示图标
    items: [
      {
        "text": "状态",
        "iconPath": "/image/icon_component.png",
        "selectedIconPath": "/image/icon_component_HL.png"
      },
      {
        "text": "设置",
        "iconPath": "/image/icon_component.png",
        "selectedIconPath": "/image/icon_component_HL.png"
      },
      {
        "text": "日志",
        "iconPath": "/image/icon_component.png",
        "selectedIconPath": "/image/icon_component_HL.png"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function (options) {
            console.log('onload')
    console.log('request one device')
    var url = app.globalData.server+'userDevice?phone='+app.globalData.phone+'&device_id='+app.globalData.curDeviceId;
    var that = this

    wx.request({
        url: url,
        success: function (result) {
            console.log('request success:###', result.data,"###");
            that.setData({
                deviceInfo: result.data.device
            })

        }
    })
  },
test2: function () {

    console.log('request one device')
    var url = app.globalData.server+'openDegree?phone='+app.globalData.phone+'&device_id='+app.globalData.curDeviceId+'&number='+Math.floor(Math.random()*100);
    var that = this

    wx.request({
        url: url,
        success: function (result) {
            console.log('request success:###', result.data,"###");
            this.setData({
                deviceInfo: result.data.number
            })

        }
    })

 
}
})
