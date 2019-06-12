// pages/Myself/set/safe/toPass/toPass.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ist: 0,
		btnValue: "获取验证码",
		countDownNum: '60',
		timer: '',
		pass1: '',
		pass2: '',
		url: ''
	},
	getPass() {
		this.data.ist = 1
		if (this.data.ist == 1) {
			this.setData({
				btnValue: 1
			})
			this.countDown()
		}
	},
	countDown() {
		clearInterval(this.data.timer);
		let that = this;
		let countDownNum = that.data.countDownNum; //获取倒计时初始值
		//如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
		that.setData({
			timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
				//每隔一秒countDownNum就减一，实现同步
				countDownNum--;
				//然后把countDownNum存进data，好让用户知道时间在倒计着
				that.setData({
					countDownNum: countDownNum
				})
				//在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
				if (countDownNum == 0) {
					//这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
					//因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
					clearInterval(that.data.timer);
					//关闭定时器之后，可作其他处理codes go here
					// 如果一分钟内没有填写信息
					// 自动重置信息
					that.setData({
						btnValue: '获取验证码',
						ist: 0,
						countDownNum: '60'
					})
				}
			}, 1000)
		})
	},
	toYz() {
		clearInterval(this.data.timer);
		this.setData({
			btnValue: '获取验证码',
			ist: 0,
			countDownNum: '60'
		})
		this.getPass()
	},
	toSelect() {
		// 查询对比三项数据是否正确
		if (this.data.pass1 !== this.data.pass2) {} else {
			wx.request({
				method: "post",
				url: `${this.data.url}upassword`,
				data: {
					u_id: app.globalData.userInfo.u_id,
					u_paypassword: this.data.pass2,
					store_id: app.globalData.store_id
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					if (res.data.code == 200) {
						wx.showToast({
							title: '修改成功',
							icon: "none",
							duration: 500
						})
						// 如果修改数据成功向页面·清空两次密码框的数值
						this.setData({
							pass1: '',
							pass2: ''
						})
					}
				}
			})
		}
	},
	passa(e) {
		var pass1 = e.detail.value
		this.setData({
			pass1: pass1
		})
	},
	passb(e) {
		// js获取再次输入密码的数值
		var pass2 = e.detail.value
		this.setData({
			pass2
		})
		// 如果再次输入的密码和前者不相同，则提示两次数值不一致，清空第二次的输入框的值
		if (pass2 !== this.data.pass1) {
			if (pass2 == '') {
				// 如果第二次输入框值为null 则不执行语句
			} else {
				// 两次数值不一致的响应信息
				wx.showToast({
					title: '两次输入数值不一致',
					icon: "none",
					duration: 500
				})
				this.setData({
					pass2: ''
				})
			}
		} else {
			// 如果两次数值相同的情况
			// 第一次输入框的值为null的时候不执行，下需操作
			if (this.data.pass1 == '') {} else {
				// 若是都不为0 执行以下操作，向数据库插入支付密码数据
			}

		}
	},
	// time(){
	//     this.data.s--
	// },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd()
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
