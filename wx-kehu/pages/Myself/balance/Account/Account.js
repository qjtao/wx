// pages/Account /Account.js
var app = getApp()
var line = "";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		count_Mounth: 0, //月消费总和
		isTrue: 1,
		year: new Date().getFullYear(),
		// 获取数据库传值，计算数据结果
		List: [],
		mounthList: [],
		yearList: [],
		mounth: new Date().getMonth() + 1,
		mm: [],
		url: '',
		imgUR: 'images/pic/moren_icon.png'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	click0: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 2
		})
	},
	click1: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 0
		})
	},
	click2: function() {
		var a = this.data.isTrue;
		this.setData({
			isTrue: 1
		})
	},
	a: function() {
		for (var i = 0; i < this.data.mm.length; i++) {
			if (this.data.mounthList.indexOf(this.data.mm[i]) == this.data.mounthList.lastIndexOf(this.data.mm[i])) {
				this.data.mounthList.push(this.data.mm[i]);
			}
			return this.data.mounthList;
		}
	},
	onLoad: function(options) {
		this.setData({
			url: app.imgUrlFilterAdd(),
		})
		wx.request({
			url: `${this.data.url}selectTran`,
			data: {
				u_id: app.globalData.userInfo.u_id,
				store_id: app.globalData.store_id
			},
			success: (res) => {
				if (res.data.code == 200) {
					var List = res.data.data
					for (var i in List) {
						List[i].tran_money = Number(List[i].tran_money).toFixed(2);
						List[i].year = new Date(Number(List[i].tran_time)).getFullYear();
						List[i].mounth = new Date(Number(List[i].tran_time)).getMonth() + 1;
						List[i].day = new Date(Number(List[i].tran_time)).getDate();
						List[i].time = `${List[i].year}-${List[i].mounth}-${List[i].day}`;
						List[i].Ymtime = `${List[i].year}-${List[i].mounth}`;
						List[i].Ytime = `${List[i].year}`;
					}
					// mnmianfen
					// var year = [],mounth = []
					// for (var i in List) {
					//   if (year.indexOf(List[i].year) == -1) {
					//     year.push(List[i].year)
					//   }
					// }
					// // yuefen
					// for(var i in List){
					// if (mounth.indexOf(List[i].mounth) == -1) {
					//   mounth.push(List[i].mounth)
					// }
					// }
					var YmList = [],
						YList = [];
					for (var i in List) {
						if (YmList.indexOf(List[i].Ymtime) == -1) {
							YmList.push(List[i].Ymtime)
						}
					}
					for (var i in List) {
						if (YList.indexOf(List[i].Ytime) == -1) {
							YList.push(List[i].Ytime)
						}
					}
					this.setData({
						List,
						mounthList: YmList,
						yearList: YList
					})
				}

			}
		})
		// var mmoo=[],a=0
		// // for(var i=0;i<toMounth.length;i++){ 
		//   // 遍历月份
		// // }
		// for (var item of toP){
		//   qq+=item.tran_money
		// }
		// this.setData({
		//   count_Mounth:qq  
		// });
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
