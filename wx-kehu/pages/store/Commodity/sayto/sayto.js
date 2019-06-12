// pages/Commodity/sayto/sayto.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		List: [{
				u_id: 1,
				nickName: "小吴",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
			{
				u_id: 2,
				nickName: "小吴",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
			{
				u_id: 3,
				nickName: "2",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
			{
				u_id: 4,
				nickName: "3",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
			{
				u_id: 5,
				nickName: "12312",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
		],
		url: ''
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
