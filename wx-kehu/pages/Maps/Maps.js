// pages/Maps/Maps.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
		name: '',
		show: true,
		myStoreList: [{
				store_id: '1',
				store_name: '济回堂中牟店',
				store_logo: 'images/img/touxiang.jpg',
				store_site: '店铺地址',
				store_phone: '15038704739'
			},
			{
				store_id: '2',
				store_name: '济回堂景开店',
				store_logo: 'images/img/touxiang.jpg',
				store_site: '店铺地址',
				store_phone: "18638982919"
			},
		]
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// console.log(options.name)
		this.setData({
			url: app.imgUrlFilterAdd()
		})
		var msg1 = options.name
		this.setData({
			name: msg1
		})
		this.showStore(msg1)
	},
	searchStores(e) {
		// 接收前端页面传输的数值，传递给后端数据请求
		// console.log(e.detail.value)
		var msg = e.detail.value
		this.showStore(msg);
	},
	showStore(msg) {
		// 查询用户输入的值匹配相近似的店铺信息
		if (msg.length == 0) {

		} else {
			wx.request({
				url: `${this.data.url}searchStoreList`,
				data: {
					show: msg
				},
				method: 'GET',
				success: (res) => {
					if (res.data.code == 200) {
						this.setData({
							myStoreList: res.data.data
						})
					} else {
						this.setData({
							myStoreList: []
						})
					}
				}
			});
		}

	},
	toPhone(e) {
		wx.makePhoneCall({
			phoneNumber: e.target.dataset.phone
		})
	},
	btnMap(e) {
		var store_id = e.target.dataset.id,
			store_name = e.target.dataset.name;
		console.log(store_id, store_name)
		// 进入店铺定位显示的信息值
		// wx.getLocation({
		//   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
		//   success (res) {
		//     const latitude = res.latitude
		//     const longitude = res.longitude
		//     wx.openLocation({
		//       latitude,
		//       longitude,
		//       scale: 18
		//     })
		//   }
		//  })

		wx.getLocation({
			type: 'wgs84',
			success(res) {
				const latitude = res.latitude
				const longitude = res.longitude
				const speed = res.speed
				const accuracy = res.accuracy
				console.log(latitude, longitude, speed, accuracy)
				wx.openLocation({
					latitude,
					longitude,
					scale: 18
				})
			}
		})
	},
	btnStore(e) {
		// 获取当前点击事件传递的参数值，加载后台，更改后台数据信息
		// console.log(e.target.dataset.id,e.target.dataset.name)
		app.globalData.store_name = e.target.dataset.name;
		app.globalData.store_id = e.target.dataset.id;
		// 切换延迟加载数据

		// 跳转主页面
		wx.switchTab({
			url: '/pages/Home/Home'
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
