//app.js
// 存储商户
// {
// "pagePath": "pages/store/store",
// "text": "商城",
// "iconPath": "pages/images/store-icon.png",
// "selectedIconPath": "pages/images/store-icon-wx.png"
// },
App({
	onLaunch: function() {
		// 展示本地存储能力
		// 登录
		wx.login({
			success: res => {
				this.globalData.jsCode = res.code
				if (res.code) {} else {
					console.log('获取用户登录态失败！' + res.errMsg)
					wx.checkSession({
						success() {
							// session_key 未过期，并且在本生命周期一直有效
						},
						fail() {
							// session_key 已经失效，需要重新执行登录流程
							wx.login()
							// 重新登录
						}
					})
				}
			}
		})
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
							wx.request({
								// url: 'https://doctor.hgyl120.com/Login',
								// url: 'http://192.168.2.127:8080/Login',
								data: {
									code: this.globalData.jsCode,
									encryptedData: res.encryptedData,
									iv: res.iv
								},
								success: (res) => {
									this.globalData.openId = res.data.openId
								}
							})
						}
					})
				}
			}
		})
	},
	// 挂载全局请求服务器接口位置信息
	imgUrlFilterAdd() {
		// return `https://doctor.hgyl120.com/`
		// return `http://192.168.2.127:8080/`
	},
	imgUrlFilterRem(str) {
		if (str.indexOf('http') < 0) {
			return str;
		}
		var index = this.find(str, '/', 2) + 1;
		str = str.slice(index);
		return str;
	},
	find(str, cha, num) {
		var x = str.indexOf(cha);
		for (var i = 0; i < num; i++) {
			x = str.indexOf(cha, x + 1);
		}
		return x;
	},
	// 拟定全局数据信息
	globalData: {
		userInfo: null,
		store_id: "1",
		jsCode: '',
		openId: '',
		store_name: '济回堂中牟店'
	},
	// 拨打电话操作
	toPhone(phone) {
		wx.makePhoneCall({
			phoneNumber: phone
		})
	},
	// 全局支付接口信息
	// pay(money) {
	// 	var money = money;
	// 	// 传参金额数量
	// 	wx.login({
	// 		success(res) {
	// 			if (res.code) {
	// 				wx.request({
	// 					// 挂载云端服务器地址路径信息值
	// 					url: `http://doctor.hgyl120.com/pay`,
	// 					// url: `http://192.168.2.199:8080/pay`,
	// 					data: {
	// 						code: res.code,
	// 						money: money
	// 					},
	// 					success(res) {
	// 						wx.requestPayment({
	// 							"timeStamp": res.data.timeStamp.toString(),
	// 							"nonceStr": res.data.nonceStr,
	// 							"package": res.data.package,
	// 							"signType": 'MD5',
	// 							"paySign": res.data.paySign,
	// 							success: (res) => {
	// 								return `success`;
	// 							},
	// 							fail: (res) => {
	// 								return `fail`;
	// 							},
	// 							complete: (res) => {
	// 								if (res.errMsg == 'requestPayment:ok') {
	// 									wx.showModal({
	// 										title: '提示',
	// 										content: '充值成功'
	// 									});
	// 								}
	// 								return;
	// 							}
	// 						})
	// 					},
	// 				})
	// 			}
	// 		}
	// 	})
	// },
})
