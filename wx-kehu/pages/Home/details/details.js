// pages/Home/details/details.js
var app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		details: {
			id: null,
			name: '',
			img_url: '',
			job: '',
			jobNum: '',
			score: '',
			label: [],
			introduction: '',
		},
		showIntr: true,
		date: '',
		dateList: [],
		classList: [],
		nowList: {},
		isDoc: true,
		store_id: '',
		url: '',
	},
	// 获取修改页面数据
	setDocData(msg) {
		var id = this.data.isDoc ? msg.doc_id : msg.i_id;
		var title = this.data.isDoc ? "医生详情" : "项目详情";
		var store_id = this.data.store_id;
		wx.setNavigationBarTitle({
			title
		})
		if (this.data.isDoc) {
			// 医生详情
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
					}, () => {
						this.getList();
					})
				}
			})
		} else {
			// 项目详情
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
					}, () => {
						this.getList();
					})
				}
			})
		}
		// this.getList();
	},
	getList() {
		var store_id = this.data.store_id;
		var url = this.data.isDoc ?
			`${this.data.url}docList?doc_id=${this.data.details.id}&time=${this.data.date.split(" ")[0]}&store_id=${store_id}` :
			`${this.data.url}itemList?i_id=${this.data.details.id}&time=${this.data.date.split(" ")[0]}&store_id=${store_id}`;
		wx.request({
			url,
			success: (res) => {
				if (res.data.code == 200 && res.data.data.length > 0) {
					var classList = res.data.data;
					var nowList = classList[0];
					this.setData({
						classList,
						nowList
					})
				} else {
					var classList = [];
					var nowList = [];
					this.setData({
						classList,
						nowList
					})
				}
				wx.hideLoading();
			}
		})
	},
	// 显示更多
	showIntrs() {
		this.setData({
			showIntr: !this.data.showIntr
		})
	},
	// 时间
	getDate() {
		var _date = new Date();
		var date = this.dateFilter(_date);
		var dateList = this.dateWeekList(_date);
		this.setData({
			date,
			dateList
		})
	},
	// 切换时间
	dateChange(e) {
		var date = e.target.dataset.date;
		this.setData({
			date
		})
		this.getList();
	},
	// 切换项目
	listChange(e) {
		var nowList = e.target.dataset;
		this.setData({
			nowList
		})
	},
	// 一周时间数组
	dateWeekList(msg) {
		var date = msg;
		var thisD = date.getDate();
		var thisW = date.getDay();
		var dateList = [];
		var maxDay = this.maxDay(msg);
		for (var i = 0; i <= 7; i++) {
			// 创建对象
			dateList[i] = {
				date: null,
				week: null,
				day: null
			}
			var week = this.weekFilter((thisW + i) % 7);
			var day = thisD + i > maxDay ? thisD + i - maxDay : thisD + i;
			var date = this.dateFilter(new Date().getTime() + 1000 * 60 * 60 * 24 * i);
			dateList[i].week = week;
			dateList[i].day = day;
			dateList[i].date = date;
		}
		return dateList;
	},
	// 格式转换
	dateFilter(msg) {
		var date = new Date(msg);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var w = date.getDay();
		m = m < 10 ? '0' + m : m;
		d = d < 10 ? '0' + d : d;
		w = this.weekFilter(w);
		return `${y}-${m}-${d} 星期${w}`;
	},
	// 星期转换
	weekFilter(w) {
		switch (w) {
			case 1:
				w = '一';
				break;
			case 2:
				w = '二';
				break;
			case 3:
				w = '三';
				break;
			case 4:
				w = '四';
				break;
			case 5:
				w = '五';
				break;
			case 6:
				w = '六';
				break;
			case 0:
				w = '日';
				break;
		}
		return w;
	},
	// 月份最大天数
	maxDay(msg) {
		var date = msg;
		// 获取当前年月
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		// 创建新的时间对象
		var d = new Date(year, month, 0);
		return d.getDate();
	},
	// 跳转提交
	reserveJump() {
		if (!app.globalData.userInfo.u_id) {
			wx.showToast({
				title: '请先登录',
				icon: 'none',
				duration: 1500,
			});
			return;
		}
		var doc_name = this.data.details.name;
		var doc_id = this.data.details.id;
		var i_id = this.data.nowList.id;
		var i_time = this.data.nowList.time;
		var i_price = this.data.nowList.price;
		var i_name = this.data.nowList.name;
		var doc_img = this.data.details.img_url;
		var i_img = this.data.nowList.img;
		var num = this.data.nowList.num;
		if (!doc_name || !doc_id || !i_id || !i_time || !i_price || !i_name || (!doc_img && !i_img) || !num) {
			wx.showToast({
				title: '请选择预约项目',
				icon: 'none',
				duration: 800,
			})
			return;
		}
		if (num == 0) {
			wx.showToast({
				title: '当前可预约数量为0，请选择其他项目',
				icon: 'none',
				duration: 800,
			})
			return;
		}
		var url = this.data.isDoc ?
			`/pages/Home/reserve/reserve?doc_name=${doc_name}&doc_img=${doc_img}&doc_id=${doc_id}&i_id=${i_id}&i_time=${i_time}&i_price=${i_price}&i_name=${i_name}&num=${num}` :
			`/pages/Home/reserve/reserve?doc_name=${i_name}&doc_img=${i_img}&doc_id=${i_id}&i_id=${doc_id}&i_time=${i_time}&i_price=${i_price}&i_name=${doc_name}&num=${num}`;
		wx.navigateTo({
			url
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
		this.getDate();
		if (!!options.doc_id) {
			this.setData({
				isDoc: true
			})
		} else {
			this.setData({
				isDoc: false
			})
		}
		this.setDocData(options);
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
