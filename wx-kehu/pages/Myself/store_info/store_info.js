// pages/Myself/store_info/store_info.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
		store_name: '',
		store_site: '',
		store_info: '',
		store_phone: '',
		name: '',
		address: ''
	},
	listenerBtnGetLocation: function() {
		wx.getLocation({
			//定位类型 wgs84, gcj02
			type: 'gcj02',
			success: function(res) {
				wx.openLocation({
					//当前经纬度
					latitude: res.latitude,
					longitude: res.longitude,
					//缩放级别默认28
					scale: 15,
					//位置名
					name: '', //凯利国际
					//详细地址
					address: '', //河南省郑州市东新区凯利国际A座2718
					//成功打印信息
					success: function(res) {},
					//失败打印信息
					fail: function(err) {},
					//完成打印信息
					complete: function(info) {},
				})
			},
			fail: function(err) {},
			complete: function(info) {},
		})
	},
	toPhones() {
		app.toPhone(this.data.store_phone)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var url = app.imgUrlFilterAdd();
		wx.request({
			url: `${url}userFindStoreInfo`,
			data: {
				store_id: app.globalData.store_id
			},
			success: res => {
				if (res.data.code == 200) {
					this.setData({
						store_name: res.data.data[0].store_name,
						store_site: res.data.data[0].store_site,
						store_info: res.data.data[0].store_info,
						store_phone: res.data.data[0].store_phone
					})

				}
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
