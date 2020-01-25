let app = getApp()

Page({
  data: {
    res: false,
    array: ["打开", "关闭"],
    admin: 0,
    backspace:' ',
    currentTab: 0,
    deviceInfo: {},
    deviceConfig: {},
    deviceLog: {},
    tempValue: "",
    tempText: "",
    hidePosition: true,
    hideAccuracy: true,
    hideRemarkName: true,
    hideRemark: true,
    hideName: true,
    hidePassword: true,
    //这里只做tab名和显示图标
    items: [
      {
        text: "状态",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
      },
      {
        text: "设置",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
      },
      {
        text: "日志",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
      },
    ],
  },
  swichNav: function(e) {
    let that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      if (e.target.dataset.current == 2) {
        app.getDeviceLog(this)
      }
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  onLoad: function(options) {
    console.log("onload")
    this.setData({
      admin: app.globalData.admin,
    })
    app.getDeviceInfo(this)
    app.getDeviceConfig(this)
  },
  onPullDownRefresh: function () {
    // 触发下拉刷新时执行
    if ( this.data.currentTab == 0) {
      app.getDeviceInfo(this)
    } else if (this.data.currentTab == 1){
      app.getDeviceConfig(this)
    }else{
      app.getDeviceLog(this)
    }
    wx.stopPullDownRefresh();
    console.log("xiala")
  },
  getText: function(e) {
    this.setData({ tempText: e.detail.value })
  },
  getValue: function(e) {
    this.setData({ tempValue: e.detail.value })
  },

  tapName: function(e) {
    this.setData({ hideName: false })
  },
  confirmName: function(e) {
    this.setData({
      hideName: true,
    })
    if (app.globalData.ctrl) {
      app.modifyDeviceConfig(this, {
        name: "name",
        value: this.data.tempText,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',

        duration: 1000,
      })
    }
  },
  cancelName: function(e) {
    this.setData({ hideName: true })
  },

  tapRemark: function(e) {
    this.setData({ hideRemark: false })
  },
  confirmRemark: function(e) {
    this.setData({
      hideRemark: true,
    })
    if (app.globalData.ctrl) {
      app.modifyDeviceConfig(this, {
        name: "remark",
        value: this.data.tempText,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',
        duration: 1000,
      })
    }
  },
  cancelRemark: function(e) {
    this.setData({ hideRemark: true })
  },
  tapRemarkName: function(e) {
    this.setData({ hideRemarkName: false })
  },
  confirmRemarkName: function(e) {
    this.setData({
      hideRemarkName: true,
    })
    if (app.globalData.ctrl) {
      app.modifyDeviceConfig(this, {
        name: "remarkName",
        value: this.data.tempText,
      })
      //TODO: 影响到页面的就传过去
      app.globalData.deviceList[
        app.globalData.curDeviceIndex
      ].remarkName = this.data.tempText
      this.setData({
        ["deviceConfig.remarkName"]: this.data.tempText,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',
        duration: 1000,
      })
    }
  },
  cancelRemarkName: function(e) {
    this.setData({ hideRemarkName: true })
  },

  tapPosition: function(e) {
    this.setData({ hidePosition: !this.data.hidePosition })
  },
  confirmPosition: function(e) {
    this.setData({
      hidePosition: true,
    })
    if (app.globalData.ctrl) {
      app.modifyDeviceInfo(this, {
        name: "position",
        value: this.data.tempValue,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',
        duration: 1000,
      })
    }
  },
  cancelPosition: function(e) {
    this.setData({ hidePosition: true })
  },

  bindPickerChange: function(e) {
    console.log("picker发送选择改变，携带值为", e.detail.value)
    if (app.globalData.ctrl) {
      app.modifyDeviceInfo(this, {
        name: "ioState",
        value: e.detail.value,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',
        duration: 1000,
      })
    }
  },
  tapAccuracy: function(e) {
    this.setData({ hideAccuracy: !this.data.hideAccuracy })
  },
  confirmAccuracy: function(e) {
    this.setData({
      hideAccuracy: true,
    })
    if (app.globalData.ctrl) {
      app.modifyDeviceInfo(this, {
        name: "accuracy",
        value: this.data.tempValue,
      })
    } else {
      wx.showToast({
        title: "无控制权限",
        icon:'none',
        duration: 1000,
      })
    }
  },
  cancelAccuracy: function(e) {
    this.setData({ hideAccuracy: true })
  },
  openAccessCtrl: function(e) {
    app.startAccessCtrl(this)
    this.setData({
      ["deviceConfig.accessCtrl"]: true,
    })

  },
  tapPassword: function(e) {
    if (this.data.admin) {
      this.setData({ hidePassword: false })
    } else {
      if (this.data.deviceConfig.pAccess == 0) {
        this.setData({ hidePassword: false })
      }
    }
  },
  confirmPassword: function(e) {
    this.setData({
      hidePassword: true,
    })
    if (this.data.admin) {
      app.updatePassword(this, {
        password: this.data.tempText,
      })
      this.setData({
        ["deviceConfig.password"]: this.data.tempText,
      })
      wx.showToast({
        title: "更新成功",
        duration: 1000,
      })
    } else {
      if (this.data.deviceConfig.password == this.data.tempText) {
        app.addCtrlRight(this, {
          source: 3,
          phone: app.globalData.phone,
          aPhone: app.globalData.phone,
        })
        wx.showToast({
          title: "密码正确",
          duration: 1000,
        })
      } else {
        wx.showToast({
          title: "控制密码不正确",
        icon:'none',
          duration: 1000,
        })
      }
    }
  },
  cancelPassword: function(e) {
    this.setData({ hidePassword: true })
  },
    delDevice: function(){
        app.delDevice(this, app.globalData.phone)
    },
})
