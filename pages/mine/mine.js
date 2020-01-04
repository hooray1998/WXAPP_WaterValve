const app = getApp()
Page({
    data: {
        server:null,
        phone:null,
        hasServer:false,
        hasPhone:false,
        status:''
    },
    onLoad: function () {
        this.setData({
            hasServer:app.globalData.hasServer,
            hasPhone:app.globalData.hasPhone,
            server:app.globalData.server,
            phone:app.globalData.phone
        })
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(!this.data.hasServer){
            this.setData({
                server:'http://'+ e.detail.value.server +':8000/'
            })
        }
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(!this.data.hasPhone){
            this.setData({
                phone : e.detail.value.phone
            })
        }
        app.globalData.server = this.data.server
        app.globalData.phone = this.data.phone


        app.globalData.openid || wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //请求自己后台获取用户openid
                console.log('#'+res.code)
                app.globalData.code = res.code
                var url = this.data.server+'getOpenId?code='+res.code;
                var that = this

                wx.request({
                    url: url,
                    success: function (result) {
                        console.log('getOpenId:###', result,"###");
                        app.globalData.openid = result.data.openid;
                        wx.setStorageSync('openid', app.globalData.openid)

                        that.setData({
                            hasServer:true,
                            status:'获取微信ID成功'
                        })
                        app.globalData.server = that.data.server
                        app.globalData.hasServer = true
                        wx.setStorageSync('server', app.globalData.server)
                        wx.setStorageSync('hasServer', app.globalData.hasServer)


                        var url = that.data.server+'bindPhone?openid='+result.data.openid+'&phone='+that.data.phone;
                        var that2 = that
                        wx.request({
                            url: url,
                            success: function (result) {
                                if(result.data.res){
                                    console.log('bindPhone:###', result.data,"###");
                                    app.globalData.phone = that2.data.phone
                                    app.globalData.hasPhone = true
                                    wx.setStorageSync('phone', app.globalData.phone)
                                    wx.setStorageSync('hasPhone', app.globalData.hasPhone)
                                    that2.setData({
                                        hasPhone:true,
                                        status:'绑定手机号成功'
                                    })
                                    that2.onLoad()

                                }
                                else{
                                    that2.setData({
                                        hasPhone:false,
                                        status:'绑定手机号失败，手机号已被使用'
                                    })
                                }
                            },
                            fail: function(result){
                                that2.setData({
                                    hasPhone:false,
                                    status:'绑定手机号失败,检查服务器ip是否正确'
                                })
                            }
                        })
                    },
                    fail: function(result){
                        that.setData({
                            hasServer:false,
                            status:'获取微信ID失败,检查服务器ip是否正确'
                        })
                    }
                })
            }
        })
    },
    formReset: function(e){
        this.setData({
            hasServer:false,
            hasPhone:false,
            server: '',
            phone: '',
        })
    },
})
