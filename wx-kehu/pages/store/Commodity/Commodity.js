// pages/Commodity/Commodity.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		commodity: {
			com_id: '',
			com_details: "商品的详情商品的详情商品的详情",
			com_discount_money: "99",
			com_img: "images/store/2.png",
			com_money: "12",
			com_name: "疼痛蜂蜡灸",
			com_number: "100",
			com_once_buy: "1",
			com_sales: "0",
			com_score: "400",
			com_state: "分类一",
			com_title: "疼痛蜂蜡灸",
			store_id: 1,
		},
		map: "河南省郑州市郑东新区", //邮寄地址
		count: 10009, //销量
		integral: 200, //积分
		money: 200, //市场价
		mname: "lorem", //商品名称
		List: [{
				u_id: 1,
				img_url: 'images/img/touxiang.jpg',
				nickName: "小吴",
				sayto: "产品不错值得勾描",
				count: 4,
				time: "2019-5-6 10:41:23"
			},
			// { u_id: 2, nickName: "小吴", sayto:"产品不错值得勾描",count:4,time:"2019-5-6 10:41:23"},
			// { u_id: 3, nickName: "2", sayto:"产品不错值得勾描",count:4,time:"2019-5-6 10:41:23"},
			// { u_id: 4, nickName: "3", sayto:"产品不错值得勾描",count:4,time:"2019-5-6 10:41:23"},
			// { u_id: 5, nickName: "12312", sayto:"产品不错值得勾描",count:4,time:"2019-5-6 10:41:23"},
		],
		url: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// 等待传入参数数据
		var title = options.title;
		var com_id = options.com_id;
		this.setData({
			url: app.imgUrlFilterAdd(),
			'commodity.store_id': app.globalData.store_id,
			'commodity.com_id': com_id,
		})
		wx.setNavigationBarTitle({
			title
		})
		this.getData(com_id);
	},
	getData(com_id) {
		wx.request({
			url: `${this.data.url}findScoreShop`,
			data: {
				com_id
			},
			success: (res) => {
				if (res.data.code == 200) {
					var msg = res.data.data[0];
					this.setData({
						commodity: {
							com_id: com_id,
							com_details: msg.com_details,
							com_discount_money: msg.com_discount_money,
							com_img: msg.com_img,
							com_money: msg.com_money,
							com_name: msg.com_name,
							com_number: msg.com_number,
							com_once_buy: msg.com_once_buy,
							com_sales: msg.com_sales,
							com_score: msg.com_score,
							com_state: msg.com_state,
							com_title: msg.com_title,
						}
					})
				}
			}
		});

	},
	tosayMore: function() {
		wx.navigateTo({
			url: './sayto/sayto',
		})
	},
	// 快速发货按钮
	toExpress: function() {
		wx.navigateTo({
			url: './express/express',
		})
	},
	oneselfGet: function() {
		wx.navigateTo({
			url: './oneselfGet/oneselfGet',
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
