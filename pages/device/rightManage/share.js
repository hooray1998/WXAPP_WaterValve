// pages/device/rightManage/share.js
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    right: 0,
    tempText: "",
    hideSharePhone: true,
    admin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      admin: app.globalData.admin,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  getText: function(e) {
    this.setData({ tempText: e.detail.value })
  },

  tapSharePhone: function(e) {
    this.setData({ hideSharePhone: false })
  },
  confirmSharePhone: function(e) {
    this.setData({
      hideSharePhone: true,
    })
    if (!this.data.tempText) {
      return null
    }
    if (this.data.right == 1) {
      app.addAccessRight(this, {
        source: 2,
        phone: this.data.tempText,
        aPhone: app.globalData.phone,
      })
    } else if (this.data.right == 2) {
      app.addCtrlRight(this, {
        source: 2,
        phone: this.data.tempText,
        aPhone: app.globalData.phone,
      })
    } else {
      wx.showToast({
        title: "请选择权限",
        duration: 1000,
      })
      return null
    }
    //app.modifyDeviceConfig(this, {
    //name: "remarkName",
    //value: this.data.tempText,
    //})
  },
  cancelSharePhone: function(e) {
    this.setData({ hideSharePhone: true })
  },
  addAccess: function(e) {
    console.log("addAccess", e.detail.value)
    if (e.detail.value) {
      this.setData({
        right: 1,
      })
    }
  },
  addCtrl: function(e) {
    console.log("addCtrl", e.detail.value)
    if (e.detail.value) {
      this.setData({
        right: 2,
      })
    }
  },
})
