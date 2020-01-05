// pages/device/rightManage/right.js
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rightList: [],
    chooseDevice: [],
    hideButton: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getRightList(this)
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
  checkboxChange: function(e) {
    console.log("detail:", e.detail)
    this.setData({
      chooseDevice: e.detail.value,
      hideButton: false,
      //hideButton: (e.detail.value.length==0)?true:false
    })
  },
  delCheckDevice: function() {
    this.setData({
      hideButton: true,
    })
    var phoneList = this.data.chooseDevice.join(",")
    console.log("del", phoneList)
    app.delDeviceRight(this, phoneList)
  },
})
