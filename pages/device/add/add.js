let app = getApp()
// pages/device/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  scanCodeMsg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log('id:',options.id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
scanCode: function() {
  var that = this;
  wx.scanCode({ //扫描API
    success(res) { //扫描成功
      console.log(res) //输出回调信息
      that.setData({
        scanCodeMsg: res.result
      });
      app.addDevice(this, {
        serialNum: res.result,
        source: 1,
      })
      wx.showToast({
        title: '添加成功',
        duration: 1000
      })
    }
  })
}
})
