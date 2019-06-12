//index.js
//获取应用实例
const app = getApp();
Page({
	data: {
		isA: 1,
		motto: '',
		saytoUser: '欢迎汇国的家人',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		logo: `images/user.jpg`,
		url: '',
		jsCode: '',
		token: '',
		encryptedData: '',
		iv: '',
		phoneNumber: '',
		openId: ''
	},
	//事件处理函数
	// bindViewTap: function() {
	//   wx.redirectTo({
	//     url: '/pages/Home/Home'
	//   })
	// },
	onLoad: function(options) {

		this.setData({
			logo: `${app.imgUrlFilterAdd()}${this.data.logo}`,
			url: app.imgUrlFilterAdd(),
		})
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true,
			})
		} else if (this.data.canIUse) {
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
						hasUserInfo: true,
						encryptedData: app.globalData.encryptedData,
						iv: app.globalData.iv
					})
				}
			})
		}
		// 根据时间显示·不同的敬候语句 112
		this.saytoUserme()
		// if(this.data.isA){
		//   setTimeout(() => {
		//     this.toHome()
		//   }, 1000)
		// }else{
		// }
	},
	getUserInfo: function(e) {
		//调用注册数据
		app.globalData.encryptedData = e.detail.encryptedData
		app.globalData.userInfo = e.detail.userInfo
		app.globalData.iv = e.detail.iv
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true,
			encryptedData: e.detail.encryptedData,
			iv: e.detail.iv,
			// 舍去设置的添加值
		})
		// success: res => {
		wx.request({
			url: `${this.data.url}Login`,
			data: {
				code: app.globalData.jsCode,
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv
			},
			success: (res) => {
				app.globalData.openId = res.data.openId
			}
		})
		// }
		this.reg()
	},
	reg: function() {
		var _this = this
		if (_this.data.userInfo.nickName == undefined) {} else {
			//发送请求插入数据库当前用户信息
			// 服务器判断当前用户手机号是否存在，若是存在则直接返回值，若是不存在则保存数据存储当前数据库
			wx.request({
				method: "POST",
				url: `${this.data.url}recMyinfo`,
				data: {
					nickName: _this.data.userInfo.nickName,
					u_img: _this.data.userInfo.avatarUrl,
					// u_phone:this.data.phoneNumber,
					u_openid: app.globalData.openId,
					store_id: "1"
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					// app.globalData.userInfo.u_balance
					if (res.data.code == 200) {
						this.setData({
							// 账户余额
							u_balance: res.data.data[0].u_balance,
							u_integral: res.data.data[0].u_integral,
							u_id: res.data.data[0].u_id,
						})
						app.globalData.userInfo.u_balance = res.data.data[0].u_balance
						app.globalData.userInfo.u_id = res.data.data[0].u_id
						app.globalData.userInfo.u_integral = res.data.data[0].u_integral
						app.globalData.userInfo.u_phone = res.data.data[0].u_phone
					}
				}
			})
		}
	},
	toHome() {
		this.reg();
		wx.switchTab({
			url: '/pages/Home/Home',
		})
	},
	// 关于我们
	saytoUserme() {
		var today = new Date();
		var hello = this.data.saytoUser;
		var hour = new Date().getHours()
		if (hour < 6) {
			this.setData({
				saytoUser: ' 凌晨好'
			})
		} else if (hour < 9) {
			this.setData({
				saytoUser: '早上好'
			})
		} else if (hour < 12) {
			this.setData({
				saytoUser: ' 上午好'
			})
		} else if (hour < 14) {
			this.setData({
				saytoUser: '中午好'
			})
		} else if (hour < 17) {
			this.setData({
				saytoUser: ' 下午好'
			})
		} else if (hour < 19) {
			this.setData({
				saytoUser: ' 傍晚好'
			})
		} else if (hour < 22) {
			this.setData({
				saytoUser: ' 晚上好'
			})
		} else {
			this.setData({
				saytoUser: '夜深了'
			})
		}
	},
	getPhoneNumber: function(e) {
		var _this = this;
		var encryptedData = e.detail.encryptedData;
		var iv = e.detail.iv;
		wx.login({
			success: function(res) {
				//请求自己后台获取用户openid
				wx.request({
					url: `${this.data.url}getPhonenumber`,
					data: {
						encryptedData,
						iv,
						code: res.code
					},
					success: function(response) {
						_this.setData({
							phoneNumber: response.data.phoneNumber
						})
					}
				})
			}
		})
	},
})
	// toAbout() {
	// 	wx.navigateTo({
	// 		url: '/pages/Myself/set/about/about',
	// 	})
	// },