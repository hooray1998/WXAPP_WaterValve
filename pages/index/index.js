//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        deviceList: [],
        taglist: 'init',
        tag: 'linux',
        motto: 'Hello World'
    },
    onShow: function(){
        this.setData({
            deviceList: app.globalData.deviceList
        })
    },
    onLoad: function () {
        if(app.globalData.phone){
            app.getDeviceList(this)
        }
    },
    onPullDownRefresh: function () { // 触发下拉刷新时执行
        if(app.globalData.phone){
            app.getDeviceList(this)
        }
        console.log("xiala")
    },
    chooseDevice: function(e){
        console.log('event:',e)
        var index = e.currentTarget.dataset.index
        app.globalData.curDeviceId = this.data.deviceList[index].deviceId
        app.globalData.ctrl = this.data.deviceList[index].ctrl
        app.globalData.admin = this.data.deviceList[index].admin
        app.globalData.curDeviceIndex = index
        console.log('deviceId:',app.globalData.curDeviceId )
        wx.navigateTo({ url: '/pages/device/device' })
    },
    addDevice: function(){
        wx.navigateTo({ url: '/pages/device/add/add' })
    }
})
