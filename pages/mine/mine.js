const app = getApp()
Page({
    data: {
        server:false,
        phone:'',
        hideServer:true,
        hidePhone:true,
        status:''
    },
    onLoad: function () {
        console.log('onload mine:')
        this.setData({
            server:app.globalData.server,
            phone:app.globalData.phone
        })
    },
    getText: function(e) {
        this.setData({ tempText: e.detail.value })
    },
  tapServer: function(e) {
    this.setData({ hideServer: false })
  },
  confirmServer: function(e) {
    this.setData({
      hideServer: true,
    })
        this.data.tempText = 'http://'+ this.data.tempText +':8000/'
            var url = '';
      if(app.globalData.openid){
       url = this.data.tempText + "getPhone?openid=" + app.globalData.openid
      }else{
       url = this.data.tempText + "getOpenId?code=" + app.globalData.code
      }
        var that = this
        wx.request({
            url: url,
            success: function (result) {


              if(result.data.res){
                app.globalData.server = that.data.tempText;
                  that.data.tempText = ''
                wx.setStorageSync('server', app.globalData.server);

                if('' == app.globalData.openid){
                    console.log('getOpenId:###', result,"###");
                    app.globalData.openid = result.data.openid;
                    wx.setStorageSync("openid", app.globalData.openid)
                }
                app.globalData.phone = result.data.phone;
                app.globalData.deviceList = result.data.deviceList;
                    that.setData({
                        server: app.globalData.server,
                        phone: app.globalData.phone
                    })
                if(app.globalData.phone==""){
                    that.setData({
                        phone: ''
                    })
                  wx.showToast({
                    title: "请绑定手机号",
                    icon:'none',
                    duration: 3000,
                  })
                }
              }else{
              app.globalData.phone = '';
              app.globalData.server = false
            that.setData({
                server: app.globalData.server,
                phone: app.globalData.phone
            })
                  wx.showToast({
                    title: "服务器无外网",
                    icon:'none',
                    duration: 3000,
                  })
              }
            },
            fail: function(){
                app.globalData.phone = '';
                app.globalData.server = false
                that.setData({
                    server: app.globalData.server,
                    phone: app.globalData.phone
                })
              wx.showToast({
                title: "连接服务器失败",
                    icon:'none',
                duration: 3000,
              })
            }
        })
  },
  cancelServer: function(e) {
    this.setData({ hideServer: true })
  },
  tapPhone: function(e) {
    this.setData({ hidePhone: false })
  },
  confirmPhone: function(e) {
    this.setData({
      hidePhone: true,
    })

      if(this.data.tempText){

    var url = app.globalData.server+'bindPhone?openid='+app.globalData.openid+'&phone='+this.data.tempText;
    var that2 = this
    console.log('bindPhone:url:', url,"###");
    wx.request({
        url: url,
        success: function (result) {
            if(result.data.res){
                console.log('bindPhone:###', result.data,"###");
                app.globalData.phone = that2.data.tempText
                  wx.showToast({
                    title: "绑定成功",
                    duration: 1000,
                  })
                that2.setData({ phone: that2.data.tempText })
            }
            else{
                  wx.showToast({
                    title: "号码已被使用",
                    icon:'none',
                    duration: 3000,
                  })
            }
        }
    })

      }
  },
  cancelPhone: function(e) {
    this.setData({ hidePhone: true })
  },

})
