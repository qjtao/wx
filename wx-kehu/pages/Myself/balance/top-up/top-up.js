// pages/top-up/top-up.js
var app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userInput: '',
		url: ''
	},
	clearInput: function() {
		this.setData({
			userInput: ''
		});
	},
	bindKeyInput: function(e) {
		this.setData({
			userInput: e.detail.value
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	payFor: function() {
		var money = this.data.userInput;
		if (money == '') {
			wx.showToast({
				title: '输入充值金额',
				icon: 'none',
				duration: 600
			})
		} else {
			var state = app.pay(money);
			if (state == 'success') {
				this.toBalance()
			} else if (state == 'fail') {
				wx.showToast({
					title: '充值失败',
					icon: "none",
					duration: 1000
				})
			}
		}
	},
	// 官网数据
	toBalance() {
		// money1获取用户充值金额
		// money2获取用户当前账户余额
		var u_id = app.globalData.userInfo.u_id;
		var money1 = this.data.userInput;
		var money2 = app.globalData.userInfo.u_balance;
		var reg = /^\d+$|^\d*\.\d+$/g;
		if (money1 == '' || !reg.test(money1)) {
			wx.showToast({
				title: '请输入充值金额',
				icon: "none",
				duration: 500
			})
		} else {
			var u_balance = (Number(money1) + Number(money2)).toFixed(2);
			// 充值金额
			if (u_balance + 1 > 1) {
				app.globalData.userInfo.u_balance = u_balance
				wx.request({
					method: "POST",
					url: `${this.data.url}topUp`,
					data: {
						u_balance,
						u_id,
						// u_id: app.globalData.userInfo.u_id,
						tran_money: this.data.userInput,
						tran_time: new Date().getTime(),
						tran_direction: 1,
						tran_type: 2,
						store_id: app.globalData.store_id
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						// 如果充值成功显示显示页面效果
						if (res.data.code == 200) {
							wx.showToast({
								title: '充值成功',
								icon: "none",
								duration: 1000
							})
							this.setData({
								userInput: ''
							})
						}
					}
				})
			} else {
				wx.showToast({
					title: '输入有误，请重新输入',
					icon: "none",
					duration: 1000
				})
				this.setData({
					userInput: ''
				})
			}
		}
	},
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd(),
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
