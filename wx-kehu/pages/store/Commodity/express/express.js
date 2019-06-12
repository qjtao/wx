// pages/store/Commodity/express/express.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		num: 1, //商品默认数量是1
		minusStatus: "disabled",
		addStatus: "normal",
		score: '100', //单个商品的数量
		totalScore: '', //用户选择数量后所需的积分总数
		numValue: '',
		url: '',
	},
	// 点击前往地址操作
	toSite: function() {
		wx.navigateTo({
			url: '../addressList/addressList'
		})
	},
	numValue: function(e) {
		var numValue = e.detail.value;
		console.log(numValue)
		if (numValue >= 6) {
			this.setData({
				numValue: 6
			})
		} else if (numValue <= 1) {
			this.setData({
				numValue: 1
			})
		}

	},
	// 点击减号
	bindMinus: function() {
		var num = this.data.num;
		// 如果大于1时，才可以减  
		if (num > 1) {
			num--;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态  
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		var addStatus = num < 6 ? 'normal' : 'disabled';
		// 将数值与状态写回  
		this.setData({
			num: num,
			minusStatus: minusStatus,
			addStatus: addStatus
		});
	},
	// 点击加号
	bindPlus: function() {
		var num = this.data.num;
		// 当数量小于6时
		if (num < 6) {
			num++;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态  
		var addStatus = num >= 6 ? 'disabled' : 'normal';
		var minusStatus = num < 1 ? 'disabled' : 'normal';
		// 将数值与状态写回  
		this.setData({
			num: num,
			addStatus: addStatus,
			minusStatus: minusStatus
		});
	},
	// 输入框事件
	bindManual: function(e) {
		var num = e.detail.value;
		//  将数值与状态 写回
		this.setData({
			num: num
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
