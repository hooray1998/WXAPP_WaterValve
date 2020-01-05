//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    deviceList: [],
    phone: "",
  },
  onShow: function() {
    this.setData({
      deviceList: app.globalData.deviceList,
      phone: app.globalData.phone,
    })
  },
  onLoad: function() {
    app.globalData.server = wx.getStorageSync("server") || "http://192.168.1.100:8000/"
    app.globalData.openid = wx.getStorageSync("openid") || false
      if(app.globalData.openid){
            app.initLogin(app, this)
      }
      else{
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //请求自己后台获取用户openid
                console.log("#" + res.code)
                app.globalData.code = res.code
                app.initLogin(app, this)
              },
            })
      }
    //if(app.globalData.phone){
    //app.getDeviceList(this)
    //}
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
    if (app.globalData.phone) {
      app.getDeviceList(this)
    }
   wx.stopPullDownRefresh();
    console.log("xiala")
  },
  chooseDevice: function(e) {
    console.log("event:", e)
    var index = e.currentTarget.dataset.index
    app.globalData.curDeviceId = this.data.deviceList[index].deviceId
    app.globalData.ctrl = this.data.deviceList[index].ctrl
    app.globalData.admin = this.data.deviceList[index].admin
    app.globalData.curDeviceIndex = index
    console.log("deviceId:", app.globalData.curDeviceId)
    wx.navigateTo({ url: "/pages/device/device" })
  },
  addDevice: function() {
    var that = this
    wx.scanCode({
      //扫描API
      success(res) {
        //扫描成功
        console.log(res) //输出回调信息
        app.addDevice(that, {
          serialNum: res.result,
          source: 1,
        })
      },
    })
  },
})
