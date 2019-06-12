// pages/store/store.js
var app = getApp()
Page({
	data: {
		// height:0,
		url: '',
		u_id: '',
		currentData: 0,
		currentSwiper: 0,
		productImg: [{
			img_url: "images/store/1.jpg"
		}, {
			img_url: "images/store/3.jpg"
		}, {
			img_url: "images/store/4.jpg"
		}, {
			img_url: "images/store/5.jpg"
		}],
		proList: [{
				img_url: "images/store/2.png",
				title: "疼痛蜂蜡灸",
				introduce: "产品介绍产品介绍产品介绍",
				score: 400,
				number: 212,
				state: 0
			},
			{
				img_url: "images/store/2.png",
				title: "疼痛蜂蜡灸",
				introduce: "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
				score: 400,
				number: 100,
				state: 1
			},
			{
				img_url: "images/store/2.png",
				title: "疼痛蜂蜡灸",
				introduce: "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
				score: 400,
				number: 125,
				state: 2
			},
			{
				img_url: "images/store/2.png",
				title: "疼痛蜂蜡灸",
				introduce: "产品介绍产品介绍产品介绍",
				score: 400,
				number: 166,
				state: 3
			}
		],
		proList1: [], //首页渲染列表
		proList2: [], //分类一渲染列表
		proList3: [], //分类二渲染列表
		proList4: [], //订单列表
		titleList: ['首页', '分类一', '分类二', '订单']
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
	//获取当前滑块的index
	bindchange(e) {
		const that = this;
		that.setData({
			currentData: e.detail.current
		})
		var count = this.data.currentData;
		// console.log(count)
		this.showMost(this.data.titleList[count])
		if (count == 0) {
			this.home() //默认值为0时显示你首页信息高度
		} else if (count == 1) {
			this.list1() //默认值为1时显示分类1的信息高度
		} else if (count == 2) {
			this.list2() //默认值为2时显示分类2的信息高度    
		} else if (count == 3) {
			this.order() //默认值为3时显示订单信息列表
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd(),
			u_id: app.globalData.userInfo.u_id
		}, () => {
			/*
			初始化加载默认首页页面高度
			Initialize loading default home page height
			*/
			this.home();
			this.showMost();
		})
	},
	/*
	  渲染积分商城选项卡信息
	  Rendering Integral Mall Tab Information
	*/
	showMost(msg = '首页') {
		wx.request({
			url: `${this.data.url}scoreShop`,
			data: {
				store_id: app.globalData.store_id,
				type: msg,
				u_id: this.data.u_id
			},
			success: (res) => {
				console.log(res);
				if (res.data.code == 200) {
					var list = this.data.titleList;
					if (msg == list[0]) {
						this.setData({
							proList1: res.data.data,
						}, () => {
							this.home();
						})
					} else if (msg == list[3]) {
						for (var item of res.data.data) {
							item.com_o_time = this.timeFilter(Number(item.com_o_time));
						}
						this.setData({
							proList4: res.data.data
						}, () => {
							this.order();
						})
					} else if (msg == list[1]) {
						this.setData({
							proList2: res.data.data,
						}, () => {
							this.list1();
						})
					} else if (msg == list[2]) {
						this.setData({
							proList3: res.data.data,
						}, () => {
							this.list2();
						})
					}
					console.log("加载成功");
				} else {
					console.log("加载失败");
				}
			}
		})
	},
	/*
	  以下部分渲染数据
	*/
	home() {
		var line1 = this.data.proList1.length;
		this.setData({
			height: 620 + line1 * 200
		})
	},
	list1() {
		//分类1信息
		var line2 = this.data.proList2.length;
		this.setData({
			height: 120 + line2 * 200
		})
	},
	list2() {
		//分类2信息
		var line2 = this.data.proList3.length;
		this.setData({
			height: 120 + line2 * 200
		})
	},
	order() {
		//积分兑换订单信息
		var line3 = this.data.proList4.length;
		this.setData({
			height: line3 * 296
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
