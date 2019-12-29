//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        deviceList: [ 
        ],
        taglist: 'init',
        tag: 'linux',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    getPhoneNumber(e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function () {

        if(app.globalData.phone){
                var url = app.globalData.server+'userDevices?phone='+app.globalData.phone
                console.log('request devices')
                var that = this

                wx.request({
                    url: url,
                    success: function (result) {
                        console.log('request success:###', result,"###");
                        that.setData({
                            deviceList: result.data.deviceid_list
                        })
                    }
                })

        }

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onPullDownRefresh: function () {
        // 触发下拉刷新时执行
        console.log("xiala")
    },
    makeRequest: function () {
        var self = this ;
        var url = 'http://192.168.0.106:8000/';
        wx.request({
            url: url,

            success: function (result) {
                console.log('request success', result.data);
                //this.setData({
                //taglist: result.data.subjects,
                //});
            }
        })
    },
    chooseDevice: function(e){
        var that = this
        console.log('event:',e)
        var index = e.currentTarget.dataset.index
        //var deviceInfo = JSON.stringify(that.data.deviceList[index])
        app.globalData.curDeviceId = that.data.deviceList[index].device_id
        console.log('did:',app.globalData.curDeviceId )
        wx.navigateTo({
            url: '/pages/device/device'
        })
    },
    addDevice: function(){
        wx.navigateTo({
            url: '/pages/device/add/add?id=1'
        })
    }
})
