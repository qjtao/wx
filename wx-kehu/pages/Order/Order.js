// pages/Order/Order.js
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		url: '',
		myList: [], //已完成的订单表信息
		sucList: [], //已支付的订单表信息
		faList: [], //未支付的订单信息
		allList: [], //所有的订单信息
		backList: [], //退款的订单信息
		currentData: 1, //默认显示未支付页面的选项卡位置
		order_url: "/pages/Order/orderInfo/orderInfo" //跳转订单接口
	},
	// 跳转支付页面
	payfor: function() {
		wx.showToast({
			title: '支付页面走起',
			icon: "none"
		})
	},
	payback: function(e) {
		var o_id = e.target.dataset.o_id;
		wx.navigateTo({
			url: '/pages/Order/orderInfo/orderInfo?o_id=' + o_id + "&o_state=" + 4,
		})
	},
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd()
		}, () => {
			this.pay();
		})
	},
	pay: function() {
		// 支付
		var u_id = app.globalData.userInfo.u_id;
		var store_id = app.globalData.store_id;
		wx.request({
			url: `${this.data.url}orderList`,
			data: {
				u_id,
				store_id
			},
			success: (res) => {
				if (res.data.code == 200) {
					var myList = [],
						sucList = [],
						faList = [],
						backList = [],
						allList = res.data.data;
					//向客户端页面传输信息
					for (var item of allList) {
						item.all_price = Number(item.all_price).toFixed(2);
						if (item.o_state == 2 || item.o_state == 3) { //完成订单
							myList.push(item)
						} else if (item.o_state == 1) { //支付成功
							sucList.push(item)
						} else if (item.o_state == 0) { //未支付订单
							faList.push(item)
						} else if (item.o_state == 5 || item.o_state == 6) { //申请退款订单
							backList.push(item)
						}
					}
					this.setData({
						// 载入界面信息
						myList,
						sucList,
						faList,
						allList,
						backList
					})
					var line0 = Math.ceil(this.data.allList.length * 1.0); //全部信息高度
					var line1 = Math.ceil(this.data.myList.length * 1.0); //已完成信息高度
					var line2 = Math.ceil(this.data.sucList.length * 1.0); //已支付信息高度
					var line3 = Math.ceil(this.data.faList.length * 1.0); //未支付订单信息高度
					var line4 = Math.ceil(this.data.backList.length * 1.0); //退款信息高度
					// 所有的订单
					if (this.data.currentData == 0) {
						this.setData({
							height: 150 + 220 * line0
						});
					}
					// 未支付的订单表
					else if (this.data.currentData == 1) {
						this.setData({
							height: 150 + 220 * line3
						});
					}
					// 已支付的订单表
					else if (this.data.currentData == 2) {
						this.setData({
							height: 150 + 220 * line2
						});
					}
					// 已完成的订单表
					else if (this.data.currentData == 3) {
						this.setData({
							height: 150 + 220 * line1
						});
					}
					// 退款订单表
					else if (this.data.currentData == 4) {
						this.setData({
							height: 150 + 220 * line4
						});
					}

				}
			}
		})
	},
	//获取当前滑块的index
	bindchange: function(e) {
		const that = this;
		that.setData({
			currentData: e.detail.current
		})
		var line0 = Math.ceil(this.data.allList.length * 1.0); //全部信息高度
		var line1 = Math.ceil(this.data.myList.length * 1.0); //已完成信息高度
		var line2 = Math.ceil(this.data.sucList.length * 1.0); //已支付信息高度
		var line3 = Math.ceil(this.data.faList.length * 1.0); //未支付订单信息高度
		var line4 = Math.ceil(this.data.backList.length * 1.0); //退款信息高度
		// 所有的订单
		if (this.data.currentData == 0) {
			this.setData({
				height: 150 + 220 * line0
			});
		}
		// 未支付的订单表
		else if (this.data.currentData == 1) {
			this.setData({
				height: 150 + 220 * line3
			});
		}
		// 已支付的订单表
		else if (this.data.currentData == 2) {
			this.setData({
				height: 150 + 220 * line2
			});
		}
		// 已完成的订单表
		else if (this.data.currentData == 3) {
			this.setData({
				height: 150 + 220 * line1
			});
		}
		// 退款订单表
		else if (this.data.currentData == 4) {
			this.setData({
				height: 150 + 220 * line4
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
		//调用函数渲染页面
		this.pay();
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
