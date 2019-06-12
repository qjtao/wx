// pages/store/Commodity/site/site.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addressList: [{
				consignee: "徐洋",
				mobile: "默认地址",
				address: "132585878888",
				transportDay: "河南省郑州市东新区路"
			},
			{
				consignee: "徐洋",
				mobile: "",
				address: "132585878888",
				transportDay: "河南省郑州市东新区路"
			}
		],
		url: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// var arr = wx.getStorageSync('addressList') || [];
		// console.info("缓存数据："+arr);
		// // 更新数据
		// this.setData({
		//   addressList:arr
		// })
		this.setData({
			url: app.imgUrlFilterAdd()
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		// this.onLoad();
	},
	addAddress: function() {
		wx.navigateTo({
			url: '../address/address',
		})
	},
	// 删除item
	delAddress: function(e) {
		this.data.addressList.splice(e.target.id.substring(3), 1);
		// 更新data数据对象
		if (this.data.addressList.splice) {
			this.setData({
				addressList: this.data.addressList
			})
			wx.setStorageSync('addressList', this.data.addressList);
		} else {
			this.setData({
				addressList: this.data.addressList
			})
			wx.setStorageSync('addressList', []);
		}
		// wx.showModal({
		//   title: '提示',
		//   content: '请确认是否删除该地址',
		//   success: function (res) {
		//     if (res.confirm) {
		//       console.log('用户点击确定')
		//     } else if (res.cancel) {
		//       console.log('用户点击取消')
		//     }
		//   }  
		// })

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
