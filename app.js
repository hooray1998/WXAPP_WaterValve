//app.js
App({
globalData: {
	userInfo: null,
	server: 'http://192.168.1.103:8000/',
	curDeviceId:0,
	openid:null,
	phone:'111'
},

onLaunch: function () {
	// 展示本地存储能力
	var logs = wx.getStorageSync('logs') || []
	logs.unshift(Date.now())
	wx.setStorageSync('logs', logs)

	this.globalData.openid = wx.getStorageSync('openid') || null
	this.globalData.openid || wx.login({
		success: res => {
			// 发送 res.code 到后台换取 openId, sessionKey, unionId
			//请求自己后台获取用户openid
			console.log('#'+res.code)
			var url = this.globalData.server+'getOpenId?code='+res.code;
			var that = this

			wx.request({
				url: url,
				success: function (result) {
					console.log('request success:###', result,"###");
					that.globalData.openid = result.data.openid;
					wx.setStorageSync('openid', that.globalData.openid)
				}
			})
		}
	}),
// 获取用户信息
wx.getSetting({
	success: res => {
		if (res.authSetting['scope.userInfo']) {
			// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
			wx.getUserInfo({
				success: res => {
					// 可以将 res 发送给后台解码出 unionId
					this.globalData.userInfo = res.userInfo

					// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
					// 所以此处加入 callback 以防止这种情况
					if (this.userInfoReadyCallback) {
						this.userInfoReadyCallback(res)
					}
				}
			})
		}
	}
})
},
getDeviceList:function(){
	var url = app.globalData.server+'userDevices?phone='+app.globalData.phone
	console.log('request devices')
	var that = this
	wx.request({
		url: url,
		success: function (result) {
			console.log('onLoad:', result);
			that.setData({
				deviceList: result.data.deviceList
			})
		}
	})
}


})
