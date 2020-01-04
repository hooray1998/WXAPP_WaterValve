//app.js
App({
  globalData: {
    hasServer: false,
    hasPhone: false,
    code: null,
    openid: null,
    server: null,
    phone: "phone_1",

    deviceList: [],
    curDeviceIndex: 0,
    curDeviceId: 0,
    ctrl: false,
    admin: false,
  },

  onLaunch: function() {
    // 展示本地存储能力
    this.globalData.hasServer = wx.getStorageSync("hasServer") || false
    this.globalData.hasPhone = wx.getStorageSync("hasPhone") || false
    this.globalData.server = wx.getStorageSync("server") || "192.168.1.0"
    this.globalData.phone = wx.getStorageSync("phone") || ""
    this.globalData.openid = wx.getStorageSync("openid") || null
  },
  getDeviceList: function(that) {
    var url =
      this.globalData.server + "userDevices?phone=" + this.globalData.phone
    var app = this
    console.log("request devices")

    wx.request({
      url: url,
      success: function(result) {
        console.log("getDeviceList:", result)
        app.globalData.deviceList = result.data.deviceList
        that.setData({
          deviceList: result.data.deviceList,
        })
      },
    })
  },
  getDeviceInfo: function(that) {
    var url =
      this.globalData.server +
      "userDeviceInfo?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    wx.request({
      url: url,
      success: function(result) {
        console.log("request device info:###", result.data, "###")
        that.setData({
          deviceInfo: result.data.deviceInfo,
        })
      },
    })
  },
  getDeviceConfig: function(that) {
    var url =
      this.globalData.server +
      "userDeviceConfig?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    wx.request({
      url: url,
      success: function(result) {
        console.log("request device config:###", result.data, "###")
        that.setData({
          deviceConfig: result.data.deviceConfig,
        })
      },
    })
  },
  getDeviceLog: function(that) {
    var url =
      this.globalData.server +
      "deviceLog?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    wx.request({
      url: url,
      success: function(result) {
        console.log("request device log:###", result.data, "###")
        that.setData({
          deviceLog: result.data.log,
        })
      },
    })
  },
  // deviceInfoCtrl   | deviceId,phone,xxx             | deviceInfo/deviceConfig  | xxx=(remarkName|name|remark|position|ioState|accuracy)
  modifyDeviceInfo: function(that, option) {
    var url =
      this.globalData.server +
      "deviceInfoCtrl?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId +
      "&" +
      option.name +
      "=" +
      option.value
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("request device info:###", result.data, "###")
        that.setData({
          deviceInfo: result.data.deviceInfo,
        })
        app.globalData.deviceList[app.globalData.curDeviceIndex] =
          result.data.deviceRight
        if (!result.data.res) {
          wx.showToast({
            title: "控制权限已失效",
            duration: 1000,
          })
          that.setData({
            deviceConfig: result.data.deviceConfig,
          })
        }
      },
    })
  },
  modifyDeviceConfig: function(that, option) {
    var url =
      this.globalData.server +
      "deviceInfoCtrl?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId +
      "&" +
      option.name +
      "=" +
      option.value
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("request device config:###", result.data, "###")
        that.setData({
          deviceConfig: result.data.deviceConfig,
        })
        app.globalData.deviceList[app.globalData.curDeviceIndex] =
          result.data.deviceRight
        if (!result.data.res) {
          wx.showToast({
            title: "控制权限已失效",
            duration: 1000,
          })
        }
      },
    })
  },
  //## startAccessCtrl  | deviceId,phone                 | device
  startAccessCtrl: function(that) {
    var url =
      this.globalData.server +
      "startAccessCtrl?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    wx.request({
      url: url,
      success: function(result) {
        console.log("start access ctrl:###", result.data, "###")
      },
    })
  },
  //check('addCtrlRight', phone='phone_2', deviceId=1,source=2, aPhone='phone_1')
  addCtrlRight: function(that, option) {
    var url =
      this.globalData.server +
      "addCtrlRight?phone=" +
      option.phone +
      "&deviceId=" +
      this.globalData.curDeviceId +
      "&source=" +
      option.source +
      "&aPhone=" +
      option.aPhone
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("add ctrl right:###", result.data, "###")
        that.setData({
          deviceConfig: result.data.deviceConfig,
        })
        app.globalData.deviceList[app.globalData.curDeviceIndex] =
          result.data.deviceRight
      },
    })
  },
  addAccessRight: function(that, option) {
    var url =
      this.globalData.server +
      "addAccessRight?phone=" +
      option.phone +
      "&deviceId=" +
      this.globalData.curDeviceId +
      "&source=" +
      option.source +
      "&aPhone=" +
      option.aPhone
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("add access right:###", result.data, "###")
        that.setData({
          deviceConfig: result.data.deviceConfig,
        })
        app.globalData.deviceList[app.globalData.curDeviceIndex] =
          result.data.deviceRight
      },
    })
  },
  //## updatePassword   | deviceId,password              | deviceConfig
  updatePassword: function(that, option) {
    var url =
      this.globalData.server +
      "updatePassword?deviceId=" +
      this.globalData.curDeviceId +
      "&password=" +
      option.password
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("update Password:###", result.data, "###")
        that.setData({
          deviceConfig: result.data.deviceConfig,
        })
      },
    })
  },
  //## addDevice        | phone,serialNum,source         | deviceList
  addDevice: function(that, option) {
    var url =
      this.globalData.server +
      "addDevice?phone=" +
      this.globalData.phone +
      "&serialNum=" +
      option.serialNum +
      "&source=" +
      option.source
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("add Device:###", result.data, "###")
        app.getDeviceList(that)
      },
    })
  },
  getRightList: function(that){
    var url =
      this.globalData.server +
      "rightList?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId;
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("add Device:###", result.data, "###")
          that.setData({
              rightList: result.data.rightList
          })
      },
    })

  },
    delDeviceRight: function(that, phone){
    var url =
      this.globalData.server +
      "delRight?phone=" +
      phone +
      "&admPhone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId;
        var app = this
        wx.request({
          url: url,
          success: function(result) {
            console.log("del Device right:###", result.data, "###")
              that.setData({
                  rightList: result.data.rightList
              })
          },
        })

    }
})
