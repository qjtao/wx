// pages/store/address/address.js
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		province: '',
		city: '',
		area: '',
		show: false,
		url: ''
	},
	sureSelectAreaListener: function(e) {
		var that = this;
		that.setData({
			show: false,
			province: e.detail.currentTarget.dataset.province,
			city: e.detail.currentTarget.dataset.city,
			area: e.detail.currentTarget.dataset.area
		})
	},
	chooseAddress: function() {
		var that = this;
		that.setData({
			show: true
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd()
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
	onShow: function() {},
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
