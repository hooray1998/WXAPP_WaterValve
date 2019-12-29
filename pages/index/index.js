//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        deviceList: [ 
        ],
        taglist: 'init',
        tag: 'linux',
        motto: 'Hello World'
    },
    onLoad: function () {
        if(app.globalData.phone){
			app.getDeviceList()
        }
    },
    onPullDownRefresh: function () { // 触发下拉刷新时执行
        console.log("xiala")
    },
    chooseDevice: function(e){
        console.log('event:',e)
        var index = e.currentTarget.dataset.index
        app.globalData.curDeviceId = this.data.deviceList[index].device_id
        console.log('did:',app.globalData.curDeviceId )
        wx.navigateTo({ url: '/pages/device/device' })
    },
    addDevice: function(){
        wx.navigateTo({ url: '/pages/device/add/add?id=1' })
    }
})
