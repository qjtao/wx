// pages/Home/Home.js
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		indicatorDots: true,
		beforeColor: '#acacac',
		afterColor: '#007EE9',
		List: [],
		store_name: '',
		// 底部项目表
		info_card: [],
		//  名师荟萃表
		info_user: [],
		currentData: 0,
		currentSwiper: 0,
		url: '',
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {},
	//获取当前滑块的index
	bindchange: function(e) {

		this.setData({
			currentData: e.detail.current

		})
		var line1 = Math.ceil(this.data.info_card.length * 1.0);
		var line2 = Math.ceil(this.data.info_user.length * 1.0);
		if (this.data.currentData == 0) {
			this.setData({
				height: 100 + 120 * line1
			});
		} else if (this.data.currentData == 1) {
			this.setData({
				height: 100 + 120 * line2
			});
		}
	},
	//点击切换，滑块index赋值
	checkCurrent: function(e) {
		const that = this;

		if (that.data.currentData === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentData: e.target.dataset.current

			})
		}
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
		var url = app.imgUrlFilterAdd();
		var store_name = app.globalData.store_name;
		this.setData({
			url,
			store_name
		})
		// 请求主页面轮播图图片
		var store_id = app.globalData.store_id;
		wx.request({
			url: `${url}hswiper`,
			data: {
				store_id
			},
			success: (res) => {
				this.setData({
					List: res.data.data || []
				})
			}
		})
		// 请求项目信息
		wx.request({
			url: `${url}hitems`,
			data: {
				store_id
			},
			success: (res) => {
				// console.log(res)
				this.setData({
					info_card: res.data.data || []
				})
				// 高度自我调节
				var line1 = Math.ceil(this.data.info_card.length * 1.0);
				// var line2 = Math.ceil(this.data.info_user.length * 1.0);
				if (this.data.currentData == 0) {
					this.setData({
						height: 120 + 120 * line1
					});
				}
			}
		})
		// 请求所有用户的信息
		wx.request({
			url: `${url}hdoctor`,
			data: {
				store_id
			},
			success: (res) => {
				this.setData({
					info_user: res.data.data || []
				})
			}
		})
		// wx.hideLoading();

	},
	// 滑动跟随
	swiperChange: function(e) {
		this.setData({
			currentSwiper: e.detail.current
		})
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
