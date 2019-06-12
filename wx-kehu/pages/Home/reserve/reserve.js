// pages/home/reserve/reserve.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		patient: {
			name: '',
			age: '',
			phone: '',
		},
		info: {
			doc_id: '',
			i_id: '',
			office: '',
			doctor: '',
			time: '',
			price: '',
			doc_img: '',
			num: '',
			o_id: '',
			type: '',
		},
		user: {
			balance: '',
			integral: '',
			u_id: null,
			avatarUrl: ''
		},
		pickerShow: false,
		store_id: '',
		url: '',
	},
	// 获取输入框内容
	nameChange: function(e) {
		var name = e.detail.value;
		var reg = /^([\u4E00-\u9FFF]){1,11}$/;
		if (!reg.test(name)) {
			this.toast('请输入正确的姓名');
			return;
		}
		this.setData({
			'patient.name': name
		});
	},
	ageChange: function(e) {
		var age = e.detail.value;
		var reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
		if (!reg.test(age)) {
			this.toast('请输入正确的年龄');
			return;
		}
		this.setData({
			'patient.age': age
		});
	},
	phoneChange: function(e) {
		var phone = e.detail.value;
		var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
		if (!reg.test(phone)) {
			this.toast('请输入正确的手机号');
			return;
		}
		this.setData({
			'patient.phone': phone
		});
	},
	radioChange(e) {
		var type = e.detail.value == 'surplus' ? 1 : 2;
		this.setData({
			'info.type': type
		})
	},
	// 提交订单操作
	submit() {
		var store_id = this.data.store_id;
		var u_id = this.data.user.u_id;
		var doc_id = this.data.info.doc_id;
		var i_id = this.data.info.i_id;
		var num = this.data.info.num-- + "";
		var name = this.data.patient.name;
		var age = this.data.patient.age;
		var phone = this.data.patient.phone;
		var office = this.data.info.office;
		var doctor = this.data.info.doctor;
		var time = this.data.info.time;
		var price = this.data.info.price;
		var o_state = '0';
		var o_num = this.reserveTime();
		var o_time = new Date().getTime() + "";
		var s_site = '汇国一分店';
		// 获取全局头像
		var doc_img = app.imgUrlFilterRem(this.data.info.doc_img);
		var o_img = this.data.user.avatarUrl;
		if (!/^([\u4E00-\u9FFF]){1,11}$/.test(name) || !/^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(age) || !
			/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone)) {
			this.toast('请完善基本信息');
			return;
		}
		wx.showLoading({
			title: '提交订单中',
		})
		// 发送请求
		wx.request({
			url: `${this.data.url}insertOrder`,
			method: 'post',
			data: {
				u_id,
				name,
				age,
				phone,
				office,
				doctor,
				time,
				price,
				o_state,
				o_num,
				o_time,
				o_img,
				doc_img,
				s_site,
				doc_id,
				i_id,
				num,
				store_id
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				wx.hideLoading();
				if (res.data.code == 200) {
					var o_id = res.data.data[0].o_id;
					this.setData({
						'info.o_id': o_id
					})
					wx.navigateTo({
						url: `/pages/Order/orderInfo/orderInfo?o_id=${o_id}&o_state=0`,
					})
					// this.show();
				} else {
					this.toast('订单提交失败');
				}
			}
		})
	},
	// 生成订单编号
	reserveTime() {
		var date = new Date();
		var num = date.getTime();
		var r = Math.floor(Math.random() * 899 + 100);
		return `${num}${r}`;
	},
	// 封装toast方法
	toast(msg, icon = 'none') {
		wx.showToast({
			title: msg,
			icon: icon,
			duration: 800
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.setNavigationBarTitle({
			title: '预约信息'
		})
		var office = options.i_name;
		var doc_id = options.doc_id;
		var i_id = options.i_id;
		var doctor = options.doc_name;
		var time = options.i_time;
		var price = options.i_price;
		var doc_img = options.doc_img;
		var num = options.num;
		this.setData({
			'info.office': office,
			'info.doc_id': doc_id,
			'info.i_id': i_id,
			'info.doctor': doctor,
			'info.doc_img': doc_img,
			'info.time': time,
			'info.price': price,
			'info.num': num,
			// 'user.balance': app.globalData.userInfo.u_balance,
			// 'user.integral': app.globalData.userInfo.u_integral,
			'user.u_id': app.globalData.userInfo.u_id,
			'user.avatarUrl': app.globalData.userInfo.avatarUrl,
			store_id: app.globalData.store_id,
			url: app.imgUrlFilterAdd(),
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
