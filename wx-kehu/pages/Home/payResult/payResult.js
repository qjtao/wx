// pages/home/payResult/payResult.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		success: 'icon-success',
		error: 'icon-error',
		shareBg: 'images/9.jpg',
		o_id: 1,
		msg: {
			header: '',
			title: '',
			img: '',
			body: '',
			jump: ''
		},
		msg1: {
			header: '支付成功',
			title: '支付结果',
			img: '1',
			body: '订单详情',
			jump: 'order'
		},
		msg2: {
			header: '支付失败',
			title: '支付结果',
			img: '0',
			body: '返回订单',
			jump: 'order'
		},
		msg3: {
			header: '退款关闭',
			title: '取消退款',
			img: '0',
			body: '返回首页',
			jump: 'Order'
		},
		msg4: {
			header: '发布成功',
			title: '发表评价',
			img: '1',
			body: '返回首页',
			jump: 'Order'
		},
		show: false,
		doc_id: '',
		i_id: '',
		store_id: '',
		url: '',
	},
	// 按状态修改页面内容 1支付成功 2支付失败 3取消退款 4发表评价
	changeData(options) {
		var o_id = options.o_id || '';
		var msg = {};
		msg = options.msg == '1' ? this.data.msg1 :
			options.msg == '2' ? this.data.msg2 :
			options.msg == '3' ? this.data.msg3 :
			options.msg == '4' ? this.data.msg4 : '';
		msg.img = msg.img == '1' ? this.data.success : this.data.error;
		var show = options.msg == '4' ? true : false;
		wx.setNavigationBarTitle({
			title: msg.title
		});
		this.setData({
			msg,
			o_id
		})
		wx.hideLoading();
		if (show) {
			setTimeout(() => {
				var doc_id = options.doc_id;
				var i_id = options.i_id;
				var u_id = options.u_id;
				this.setData({
					show,
					doc_id,
					i_id,
					u_id
				})
			}, 800);
		}
	},
	// 跳转页面
	jump() {
		if (this.data.msg.jump == 'order') {
			wx.navigateTo({
				url: `/pages/Order/orderInfo/orderInfo?o_id=${this.data.o_id}&o_state=1`,
			});
		} else if (this.data.msg.jump == 'Order') {
			wx.switchTab({
				url: '/pages/Order/Order',
			})
		}
	},
	shareItem() {
		var store_id = this.data.store_id;
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: `${this.data.url}hdoctor`,
			data: {
				id,
				store_id
			},
			success: (res) => {
				res = res.data.data;
				var id = res[0][0].doc_id,
					name = res[0][0].doc_name,
					img_url = this.data.url + res[0][0].doc_img,
					job = res[0][0].doc_office,
					jobNum = res[0][0].doc_jobNum,
					score = res[0][0].doc_score,
					label = res[1],
					introduction = res[0][0].doc_info;
				this.setData({
					details: {
						id,
						name,
						img_url,
						job,
						jobNum,
						score,
						label,
						introduction
					}
				})
				wx.hideloading();
			}
		})
	},
	shareDoc() {
		var store_id = this.data.store_id;
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: `${this.data.url}hitems`,
			data: {
				id,
				store_id
			},
			success: (res) => {
				res = res.data.data;
				var id = res[0][0].i_id,
					name = res[0][0].i_name,
					img_url = this.data.url + res[0][0].i_img,
					introduction = res[0][0].i_details,
					label = res[1];
				this.setData({
					details: {
						id,
						name,
						img_url,
						introduction,
						label
					}
				})
				wx.hideloading();
			}
		})
	},
	showShare() {
		this.setData({
			show: true
		})
	},
	hideShare() {
		this.setData({
			show: false
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.showLoading({
			title: '加载中……',
		});
		this.setData({
			url: app.imgUrlFilterAdd(),
			store_id: app.globalData.store_id
		})
		this.changeData(options);
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
