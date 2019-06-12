// pages/Myself/Myself.js
var app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		u_balance: 0,
		u_integral: 0,
		avatar: "",
		List: [],
		uname: "", //承接当前用户的用户名
		nickName: "用户登录",
		userInfo: {},
		encryptedData: "",
		iv: "",
		sessionKey: "a",
		hasUserInfo: false,
		u_id: '',
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		url: '',
		u_phone: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var url = app.imgUrlFilterAdd();
		this.setData({
			avatar: `${url}images/img/user.jpg`,
			url,
			userInfo: app.globalData.userInfo
		})
	},
	// 点击去账户余额账户
	toM: function(e) {
		wx.navigateTo({
			// url: './balance/balance?u_balance='+this.data.u_balance+"&u_id="+this.data.u_id,
			url: '/pages/Myself/balance/balance',
		})
	},
	// 点击去积分账户
	toAc: function(e) {
		wx.navigateTo({
			// 暂未赋值
			url: '/pages/Myself/integral/integral?integral=' + this.data.INTegral,
		})
	},
	// 点击去个人信息
	toThree: function(e) {
		wx.navigateTo({
			url: '/pages/Myself/mineInfo/mineInfo?avatar=' + this.data.userInfo.avatarUrl + "&nickName=" + this.data.userInfo
				.nickName + "&gender=" + this.data.userInfo.gender + "&u_phone=" + this.data.u_phone,
		})
	},
	toFour: function(e) {
		wx.navigateTo({
			url: '/pages/Myself/set/set',
		})
	},
	tofive: function() {
		wx.navigateTo({
			url: './store_info/store_info',
		})
	},
	toPath: function(e) {
		var that = this;
		var id = e.detail.value.id;
		wx.showToast({
			title: "成功"
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
