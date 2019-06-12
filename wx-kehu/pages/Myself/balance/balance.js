// pages/Myself/balance/balance.js
var app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		money: '',
		url: ''
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.money()
		this.setData({
			url: app.imgUrlFilterAdd()
		})
	},
	money: function() {
		// 显示用户金额
		wx.request({
			url: `${this.data.url}selectMoney`,
			data: {
				u_id: app.globalData.userInfo.u_id,
				store_id: app.globalData.store_id
			},
			success: (res) => {
				var money = Number(res.data.data[0].u_balance).toFixed(2);
				this.setData({
					money
				})
				// 更换全局变量值
				app.globalData.userInfo.u_balance = money
			}
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
		this.money()
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {},

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
