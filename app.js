//app.js
App({
  globalData: {
    code: null,
    openid: "",
    server: false,
    phone: "",

    deviceList: [],
    curDeviceIndex: 0,
    curDeviceId: 0,
    ctrl: false,
    admin: false,
  },

  onLaunch: function() {
    // 展示本地存储能力
  },
  initLogin: function(app, that) {
    var url = 0;
      if(app.globalData.openid){
       url = app.globalData.server + "getPhone?openid=" + app.globalData.openid
      }else{
       url = app.globalData.server + "getOpenId?code=" + app.globalData.code
      }
      var app = app;
      var that = that;
    wx.request({
      url: url,
      success: function(result) {
          console.log('initLogin:',result.data)
          if(result.data.res){
            wx.setStorageSync("server", app.globalData.server)

            if('' == app.globalData.openid){
                console.log("getOpenId:###", result, "###")
                app.globalData.openid = result.data.openid
                wx.setStorageSync("openid", app.globalData.openid)
            }
            app.globalData.phone = result.data.phone
            app.globalData.deviceList = result.data.deviceList
            if (app.globalData.phone == "") {
              wx.showToast({
                title: "请绑定手机号",
                    icon:'none',
                duration: 3000,
              })
            }
            that.setData({
              phone: app.globalData.phone,
              deviceList: app.globalData.deviceList,
            })
          }
          else{
              app.globalData.server = false
              wx.showToast({
                title: "服务器无外网",
                    icon:'none',
                duration: 3000,
              })

          }
      },
      fail: function() {
        app.globalData.phone = ""
        app.globalData.server = false
        wx.showToast({
          title: "连接服务器失败",
                    icon:'none',
          duration: 3000,
        })
      },
    })
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
                    icon:'none',
            duration: 3000,
          })
          that.setData({
            deviceConfig: result.data.deviceConfig,
          })
        }else{
          wx.showToast({
            title: "操作成功",
            
            duration: 1000,
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
                    icon:'none',
            duration: 3000,
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
        if (option.source == 3) {
          that.setData({
            deviceConfig: result.data.deviceConfig,
          })
          app.globalData.deviceList[app.globalData.curDeviceIndex] =
            result.data.deviceRight
          app.globalData.ctrl = true
        }
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
        if (result.data.res)
          console.log("add access right:###", result.data, "###")
        wx.showToast({
          title: "成功",
          duration: 1000,
        })
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
        if (result.data.res) {
          console.log("add Device:###", result.data, "###")
          wx.showToast({
            title: "添加成功",
            duration: 1000,
          })
        } else {
          wx.showToast({
            title: "重复添加",
            duration: 1000,
          })
        }
        app.globalData.deviceList = result.data.deviceList
        that.setData({
          deviceList: result.data.deviceList,
        })
      },
      fail: function() {
        wx.showToast({
          title: "服务器异常",
                    icon:'none',
          duration: 3000,
        })
      },
    })
  },
  getRightList: function(that) {
    var url =
      this.globalData.server +
      "rightList?phone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("add Device:###", result.data, "###")
        that.setData({
          rightList: result.data.rightList,
        })
      },
    })
  },
  delDeviceRight: function(that, phone) {
    var url =
      this.globalData.server +
      "delRight?phone=" +
      phone +
      "&admPhone=" +
      this.globalData.phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("del Device right:###", result.data, "###")
        that.setData({
          rightList: result.data.rightList,
        })
      },
    })
  },
  delDevice: function(that, phone) {
    var url =
      this.globalData.server +
      "delDevice?phone=" +
      phone +
      "&deviceId=" +
      this.globalData.curDeviceId
    var app = this
    wx.request({
      url: url,
      success: function(result) {
        console.log("del Device:###", result.data, "###")
        wx.showToast({
          title: "操作成功",
          duration: 2000,
        })
        wx.navigateBack()
      },
    })
  },
})
