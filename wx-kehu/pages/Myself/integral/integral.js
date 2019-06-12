// pages/integral/integral.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isTrue: 1,
		mounth: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		Count_full: 0,
		myList: [],
		url: ''
	},
	click0: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 2
		})
	},
	click1: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 0
		})
	},
	click2: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd(),
		})
		/*
		  分析每个月存在的积分数量，接受整合
		*/
		wx.request({
			url: `${this.data.url}queryIntegral`,
			data: {
				u_id: app.globalData.userInfo.u_id,
				store_id: app.globalData.store_id,
			},
			success: (res) => {
				if (res.data.code == 200) {
					var myList = res.data.data;
					var c = 0;
					for (var item of myList) {
						c += Number(item.inte_money);
						item.inte_time = this.timeFilter(Number(item.inte_time));
					}
					this.setData({
						myList,
						Count_full: c
					});
				} else {

				}
			}
		})
	},
	// 时间格式转换
	timeFilter(time) {
		var date = new Date(time);
		var y = date.getFullYear() || '0000';
		var mo = date.getMonth() + 1 || '0';
		var d = date.getDate() || '0';
		var h = date.getHours() || '0';
		var mi = date.getMinutes() || '0';
		mo = mo < 10 ? '0' + mo : mo;
		d = d < 10 ? '0' + d : d;
		h = h < 10 ? '0' + h : h;
		mi = mi < 10 ? '0' + mi : mi;
		return `${y}-${mo}-${d} ${h}:${mi}`;
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
