// pages/Home/order/order.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order: {
			id: '',
			doc_id: '',
			i_id: '',
			doctor: '',
			num: '',
			office: '',
			docimg: '',
			pimg: '',
			pname: '',
			page: '',
			phone: '',
			time: '',
			price: '',
			site: '',
			state: '',
		},
		refund: {
			value: '',
			img: [],
			imgs: [],
			type: [],
			money: '0',
			phone: '',
		},
		typeList: {
			type1: {
				title: '退挂号费',
				checked: false,
				value: 'type1',
				price: '19.50'
			},
			// type2: { title: '退诊疗费', checked: false, value: 'type2', price: '58.30' },
			// type3: { title: '退药费', checked: false, value: 'type3', price: '26.80' },
			// all: { title: '全选', checked: false, value: 'all', price: '0' },
		},
		info: {
			type: '',
		},
		user: {
			balance: '',
			integral: '',
			u_id: null,
			avatarUrl: '',
			pwdVal: '', //输入的密码
		},
		state: {
			stopRefund: false,
			isRefund: false,
			goBack: false,
			goComment: false,
			goRefund: false,
			goCancel: false,
			goPay: false,
			title: '',
			img: ''
		},
		progress: {
			start: {
				title: '卖家退款',
				time: '2019-4-21 19:00'
			},
			center: {
				title: '与商家协商',
				time: '进行中……'
			},
			end: {
				title: '退款结果',
				time: '预计一个工作日回复'
			},
		},
		pay: `images/icon/finish.png`,
		nopay: `images/icon/waiting.png`,
		pickerShow: false,
		isShowDel: false,
		store_id: '',
		payPwdInput: false, //是否展示密码输入层
		payFocus: false, //文本框焦点
		row: false, //密码输入错误提示
		url: '',
	},
	showPicker() {
		if (!this.data.state.goPay && !this.data.state.goRefund) {
			return;
		}
		this.setData({
			pickerShow: true,
		})
	},
	hidePicker() {
		this.setData({
			pickerShow: false,
		})
	},
	textareaBlur(e) {
		var value = e.detail.value;
		this.setData({
			'refund.value': value
		})
	},
	goBack() {
		// 返回
		wx.switchTab({
			url: '/pages/Order/Order',
		})
	},
	// 去评价
	goComment() {
		var o_id = this.data.order.id;
		var doc_id = this.data.order.doc_id;
		var i_id = this.data.order.i_id;
		wx.navigateTo({
			url: `/pages/Home/evaluate/evaluate?o_id=${o_id}&doc_id=${doc_id}&i_id=${i_id}`
		})
	},
	// 单选
	radioChange(e) {
		var type = e.detail.value == 'surplus' ? 1 : 2;
		this.setData({
			'info.type': type
		})
	},
	// 多选
	checktype(e) {
		var arr = this.data.typeList;
		var arr2 = [];
		var type = [];
		var value = e.target.dataset.value;
		arr[value].checked = !arr[value].checked;
		if (value == 'all') {
			for (var i in arr) {
				arr[i].checked = arr[value].checked;
				if (arr[value].checked) {
					arr2.push(arr[i]);
				} else {
					arr2 = [];
				}
			}
		} else {
			for (var i in arr) {
				if (arr[i].checked) {
					arr2.push(arr[i])
				}
			};
		}
		var price = 0;
		for (var item of arr2) {
			price += parseFloat(item.price)
			if (item.title == '全选') {} else {
				type.push(item.title);
			}
		}
		type = type.join(',');
		price = price.toFixed(2);
		this.setData({
			typeList: arr,
			'refund.type': type,
			'refund.money': price,
		})
	},
	// 提交退款申请
	applyRefund() {
		var _this = this;
		wx.showModal({
			title: '',
			content: '确认提交退款申请？',
			confirmText: '我意已决',
			cancelText: '容我三思',
			success(res) {
				if (res.confirm) {
					var id = _this.data.order.id;
					var type = _this.data.refund.type;
					var money = _this.data.refund.money;
					var phone = _this.data.refund.phone;
					var reason = _this.data.refund.value;
					var img = _this.data.refund.img;
					var store_id = _this.data.store_id;
					var apply_time = new Date().getTime();
					if (!id || !money || !phone || !reason || !type || img.length == 0) {
						_this.toast('请完善申请信息');
						return;
					}
					wx.request({
						url: `${_this.data.url}applyRefund`,
						method: "POST",
						data: {
							id,
							type,
							money,
							phone,
							reason,
							img,
							store_id,
							apply_time
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code == 200) {
								_this.toast('提交申请成功');
								_this.switchTab();
							} else {
								_this.toast('提交申请失败');
								_this.switchTab();
							}
						}
					})
				}
			}
		})
	},
	// 取消退款
	cancelRefund() {
		var _this = this;
		var store_id = this.data.store_id;
		wx.showModal({
			title: '',
			content: '确认取消退款申请？',
			confirmText: '我意已决',
			cancelText: '容我三思',
			success(res) {
				if (res.confirm) {
					var id = _this.data.refund.id;
					console.log(id, store_id);
					wx.request({
						url: `${_this.data.url}cancelRefund`,
						method: "POST",
						data: {
							id,
							store_id
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							console.log(res);
							if (res.data.code == 200) {
								_this.toast('取消申请成功');
								_this.switchTab();
							} else {
								_this.toast('取消申请失败');
								_this.switchTab();
							}
							// else 删除失败，服务器错误
						}
					})
				}
			}
		})
	},
	// 取消订单
	cancelOrder() {
		var _this = this;
		var store_id = this.data.store_id;
		wx.showModal({
			title: '',
			content: '确认取消该订单？',
			confirmText: '我意已决',
			cancelText: '容我三思',
			success(res) {
				if (res.confirm) {
					// 点击确认按钮发送请求删除
					var id = _this.data.order.id;
					wx.request({
						url: `${_this.data.url}cancelOrder`,
						method: "POST",
						data: {
							id,
							store_id
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.code == 200) {
								// 删除成功
								_this.toast('取消订单成功');
								_this.switchTab();
							} else {
								// 删除失败
								_this.toast('取消订单失败');
								_this.switchTab();
							}
						}
					})
				}
			}
		})
	},
	// 改变页面数据
	changeData(msg) {
		if (msg.o_state >= '5') {
			var imgs = [];
			for (var item of msg.img) {
				imgs.push(`${this.data.url}${item.img_url}`);
			}
			this.setData({
				refund: {
					id: msg.refund_id,
					value: msg.refund_reason,
					imgs,
					type: msg.refund_type,
					money: msg.refund_money,
					phone: msg.refund_phone,
				},
				'order.state': msg.o_state,
				// 'progress.start.time':this.timeFilter(1557885243572),
				'progress.start.time': this.timeFilter(Number(msg.apply_time)),
				// 'progress.end.time': msg.o_state == '5' ? '预计一个工作日回复' : this.timeFilter(1557885243572),
				'progress.end.time': msg.o_state == '5' ? '预计一个工作日回复' : this.timeFilter(Number(msg.approval_time)),
			})
		} else {
			this.setData({
				order: {
					id: msg.o_id,
					doc_id: msg.doc_id,
					i_id: msg.i_id,
					num: msg.o_num,
					time: this.timeFilter(Number(msg.o_time)),
					doctor: msg.doc_name,
					office: msg.doc_office,
					docimg: this.data.url + msg.doc_img,
					pimg: msg.o_img,
					pname: msg.o_name,
					page: msg.o_age + '岁',
					phone: msg.o_phone,
					site: msg.s_site,
					price: msg.all_price,
					state: msg.o_state
				},
				'refund.phone': msg.o_phone,
				'typeList.type1.price': msg.all_price,
			})
		}
		wx.hideLoading();
	},
	// 请求页面数据
	dataRequest(msg) {
		var url = this.data.url;
		var store_id = app.globalData.store_id;
		var title = msg.o_state == '0' ? "待支付" :
			msg.o_state == '1' ? "已支付" :
			msg.o_state == '2' ? "已完成" :
			msg.o_state == '3' ? "已评价" :
			msg.o_state == '4' ? "退款" :
			msg.o_state == '5' ? "退款中" :
			msg.o_state == '6' ? "已退款" :
			msg.o_state == '7' ? "退款失败" :
			''
		var img = msg.o_state == '0' ? url + this.data.nopay :
			msg.o_state == '1' ? url + this.data.pay :
			msg.o_state == '2' ? url + this.data.pay :
			msg.o_state == '3' ? url + this.data.pay :
			msg.o_state == '4' ? url + this.data.pay :
			msg.o_state == '5' ? url + this.data.pay :
			msg.o_state == '6' ? url + this.data.pay :
			msg.o_state == '7' ? url + this.data.pay :
			''
		var goCancel = msg.o_state == '0' ? true : msg.o_state == '1' ? true : false
		var goPay = msg.o_state == '0' ? true : false
		var goRefund = msg.o_state == '4' ? true : false
		var goBack = msg.o_state == '5' ? true : msg.o_state == '6' ? true : false
		var goComment = msg.o_state == '2' ? true : false
		var isRefund = msg.o_state >= '4' ? true : false
		var stopRefund = msg.o_state == '5' ? true : false
		this.setData({
			state: {
				title,
				img,
				goPay,
				goCancel,
				goRefund,
				goComment,
				goBack,
				isRefund,
				stopRefund
			},
		})
		var title = msg.o_state == '4' ? "申请退款" : msg.o_state >= '5' ? "退款详情" : '订单详情';
		wx.setNavigationBarTitle({
			title
		});
		if (title == '退款详情') {
			var centerMsg = msg.o_state == '5' ? '进行中……' :
				msg.o_state == '6' ? '商家同意退款' :
				msg.o_state == '7' ? '退款被驳回' : '';
			var endMsg = msg.o_state == '5' ? '退款结果' :
				msg.o_state == '6' ? '退款成功' :
				msg.o_state == '7' ? '退款失败' : '';
			this.setData({
				progress: {
					start: {
						title: '买家申请退款',
						time: '8888-88-88 88:88'
					},
					center: {
						title: '与商家协商',
						time: centerMsg
					},
					end: {
						title: endMsg,
						time: '8888-88-88 88:88'
					},
				},
			})
			var id = msg.o_id;
			wx.request({
				url: `${this.data.url}queryRefund`,
				data: {
					id,
					store_id
				},
				success: (res) => {
					if (res.data.code == 200 && res.data.data.length > 0) {
						var msgRes = res.data.data[0][0]
						msgRes.img = res.data.data[1]
						msgRes.o_state = msg.o_state || res.o_state
						this.changeData(msgRes);
					} else {
						this.toast('数据加载异常')
					}
				}
			})
		} else {
			var o_id = msg.o_id;
			wx.request({
				url: `${this.data.url}idOrderList`,
				data: {
					o_id,
					store_id
				},
				success: (res) => {
					if (res.data.code == 200 && res.data.data.length > 0) {
						var res = res.data.data[0]
						res.o_state = msg.o_state || res.o_state
						this.changeData(res);
					}
				}
			})
		}
	},
	// 拍摄照片
	chooseImage() {
		var _this = this;
		this.setData({
			isShowDel: false
		})
		wx.chooseImage({
			sourceType: ['camera'],
			sizeType: ['compressed'],
			count: 9,
			success(res) {
				wx.showLoading({
					title: '上传中'
				})
				var imageSrc = res.tempFilePaths[0];
				wx.uploadFile({
					url: `${_this.data.url}file/uploadImg`,
					filePath: imageSrc,
					formData:{msg:'refund'},
					name: 'file',
					success(res) {
						res.data = JSON.parse(res.data)
						wx.hideLoading();
						if (res.data.code == 200) {
							wx.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							})
							var img = _this.data.refund.img;
							var imgs = _this.data.refund.imgs;
							img.push(res.data.data);
							imgs.push(imageSrc);
							_this.setData({
								'refund.img': img,
								'refund.imgs': imgs
							})
						} else {
							wx.showToast({
								title: '上传失败',
								icon: 'none',
								duration: 1000
							})
						}
					}
				})
			}
		})
	},
	// 按下保存时间戳
	handleTouchStart(e) {
		this.startTime = e.timeStamp;
	},
	// 抬起保存时间戳
	handleTouchEnd(e) {
		this.endTime = e.timeStamp;
	},
	// 放大照片
	previewImage(e) {
		if (this.endTime - this.startTime < 350) {
			var current = e.target.dataset.src;
			var i = e.target.dataset.i;
			var urls = [this.data.refund.imgs[i]];
			wx.previewImage({
				current,
				urls
			})
			this.setData({
				isShowDel: false
			})
		} else {
			this.setData({
				isShowDel: true
			})
		}
	},
	// 删除照片
	delImage(e) {
		wx.showLoading({
			title: '正在删除'
		})
		var i = e.target.dataset.i;
		var img = this.data.refund.img;
		var imgs = this.data.refund.imgs;
		var url = img[i];
		wx.request({
			method: "POST",
			url: `${this.data.url}file/removeFilter`,
			data: {
				url
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				wx.hideLoading();
				if (res.data.code == 200) {
					img.splice(i, 1);
					imgs.splice(i, 1);
					this.toast('删除成功')
				} else {
					this.toast('删除失败')
				}
				this.setData({
					'refund.img': img,
					'refund.imgs': imgs
				})
			}
		})
	},
	// 跳转Order
	switchTab() {
		setTimeout(() => {
			wx.switchTab({
				url: '/pages/Order/Order',
			})
		}, 800)
	},
	// 去支付
	goPay() {
		var tran_type = this.data.info.type;
		if (!tran_type) {
			this.toast('请选择支付方式');
			return;
		}
		wx.showLoading({
			title: '正在前往支付'
		});
		if (tran_type == 1) {
			// 账户支付
			this.showPayLayer();
			// this.payrequest( o_id, u_id, tran_money, tran_time, tran_direction, tran_type, inte_money, inte_time, inte_direction, inte_type, u_balance, u_integral, o_state, store_id);
		} else if (tran_type == 2) {
			// 微信支付
			var price = this.data.order.price;
			// app.pay(price)
			if (app.pay(price) == `success`) {
				this.payrequest();
			} else {
				console.log("支付失败");
			}

			// this.payrequest(o_id, u_id, tran_money, tran_time, tran_direction, tran_type, inte_money, inte_time, inte_direction, inte_type, u_balance, u_integral, o_state, store_id);
		}
	},
	// 支付请求
	payrequest() {
		var msg = 1;
		var o_id = this.data.order.id;
		var u_id = this.data.user.u_id;
		var tran_money = this.data.order.price;
		var tran_time = new Date().getTime();
		var tran_direction = 2;
		var tran_type = this.data.info.type;
		var inte_money = Math.floor(parseFloat(tran_money) * 10) + "";
		var inte_time = tran_time;
		var inte_direction = 1;
		var inte_type = 1;
		var u_integral = Math.floor((parseFloat(this.data.user.integral) * 10000 + parseFloat(inte_money) * 10000) / 10000);
		var o_state = 1;
		var store_id = this.data.store_id;
		var u_balance = tran_type == 1 ?
			((parseFloat(this.data.user.balance) * 10000 - parseFloat(tran_money) * 10000) / 10000).toFixed(2) :
			this.data.user.balance;
		if (u_balance < 0) {
			this.toast('余额不足，请使用其他方式支付');
			return;
		}
		wx.request({
			method: "POST",
			url: `${this.data.url}payOrder`,
			data: {
				o_id,
				u_id,
				tran_money,
				tran_time,
				tran_direction,
				tran_type,
				inte_money,
				inte_time,
				inte_direction,
				inte_type,
				u_balance,
				u_integral,
				o_state,
				store_id
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				if (res.data.code == 200) {
					setTimeout(() => {
						wx.hideLoading();
						app.globalData.userInfo.u_integral = u_integral;
						app.globalData.userInfo.u_balance = u_balance;
						this.toast('支付成功')
						wx.navigateTo({
							url: `/pages/Home/payResult/payResult?msg=${msg}&o_id=${o_id}`,
						});
					}, 2000);
				} else {
					wx.hideLoading();
					this.toast('支付失败，请联系客服')
				}
			}
		})
	},
	// 密码判断
	requestPwd() {
		var u_id = this.data.user.u_id;
		var u_paypassword = this.data.user.pwdVal;
		wx.request({
			method: "POST",
			url: `${this.data.url}userPay`,
			data: {
				u_id,
				u_paypassword
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				if (res.data.code == 200) {
					this.payrequest();
					wx.showLoading({
						title: '支付中'
					})
					this.setData({
						payPwdInput: false,
						payFocus: false,
						'user.pwdVal': ''
					});
				} else {
					this.toast('密码输入有误,请前往安全页修改密码')
				}
			}
		})
	},
	// 隐藏支付密码输入层
	hidePayLayer() {
		this.setData({
			payPwdInput: false,
			payFocus: false,
			'user.pwdVal': ''
		});
	},
	// 显示输入层
	showPayLayer() {
		wx.hideLoading();
		this.setData({
			payPwdInput: true,
			payFocus: false
		});
	},
	// 忘记密码
	forgetPwd() {},
	// 获取焦点
	getFocus() {
		this.setData({
			payFocus: true
		});
	},
	// 输入密码监听
	inputPwd(e) {
		var pwdVal = e.detail.value;
		pwdVal = pwdVal + 1 > 0 ? pwdVal : "";
		this.setData({
			'user.pwdVal': pwdVal
		});
		if (pwdVal.length >= 6) {
			this.requestPwd();
		}
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
		wx.showLoading({
			title: '加载中……',
		});
		this.setData({
			url: app.imgUrlFilterAdd(),
			'user.balance': app.globalData.userInfo.u_balance,
			'user.integral': app.globalData.userInfo.u_integral,
			'user.u_id': app.globalData.userInfo.u_id,
			'user.avatarUrl': app.globalData.userInfo.avatarUrl,
			store_id: app.globalData.store_id,
		}, () => {
			this.dataRequest(options);
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
