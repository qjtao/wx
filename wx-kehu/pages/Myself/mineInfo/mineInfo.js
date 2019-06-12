// pages/mineInfo/mineInfo.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		openImg: "images/open.png",
		avatar: "",
		nickName: "",
		gender: "",
		userPhone: '',
		url: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd(),
			avatar: options.avatar,
			nickName: options.nickName,
			gender: options.gender,
			userPhone: app.globalData.userInfo.u_phone,
			u_id: app.globalData.userInfo.u_id
		})
	},
	getPhoneNumber: function(e) {
		var that = this;
		console.log(e)
		var encryptedData = e.detail.encryptedData;
		var iv = e.detail.iv;
		wx.login({
			success: function(res) {
				//请求自己后台获取用户openid
				console.log(res)
				wx.request({
					url: `${that.data.url}Login`,
					data: {
						encryptedData,
						iv,
						code: res.code
					},
					success: function(response) {
						console.log(response.data.phoneNumber)
						that.setData({
							userPhone: response.data.phoneNumber
						})
						wx.request({
							url: `${that.data.url}addUserPhone`,
							method: "post",
							data: {
								u_phone: response.data.phoneNumber,
								u_id: that.data.u_id
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: (res) => {
								if (res.data.code == 200) {

								}
							}
						})
					}
				})
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
