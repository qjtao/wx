// pages/Home/evaluate/evaluate.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		doctor: {
			doc_id: '',
			name: '',
			img_url: '',
			job: '',
			label: [],
			introduction: '',
			score: '',
			jobNum: ''
		},
		evaluate: {
			value: '',
			placeholder: '是否为您解决了问题？说说您的感受，分享给预约医生的他们吧',
			imgs: [],
			img: [],
		},
		user: {
			id: '',
		},
		scorelist: {
			list1: {
				title: '医生',
				score: '5.0'
			},
			list2: {
				title: '诊所',
				score: '5.0'
			},
			list3: {
				title: '药品',
				score: '5.0'
			},
		},
		stars: [{
				score: '1.0'
			},
			{
				score: '2.0'
			},
			{
				score: '3.0'
			},
			{
				score: '4.0'
			},
			{
				score: '5.0'
			},
		],
		i_id: '',
		store_id: '',
		url: '',
	},
	getData(options) {
		wx.setNavigationBarTitle({
			title: '发表评价'
		})
		var store_id = this.data.store_id;
		var o_id = options.o_id;
		var id = options.doc_id;
		wx.request({
			url: `${this.data.url}hdoctor`,
			data: {
				id,
				store_id
			},
			success: (res) => {
				if (res.data.code == 200 && res.data.data.length > 0) {
					var doc_id = res.data.data[0][0].doc_id,
						name = res.data.data[0][0].doc_name,
						img_url = this.data.url + res.data.data[0][0].doc_img,
						job = res.data.data[0][0].doc_office,
						label = res.data.data[1],
						introduction = res.data.data[0][0].doc_info,
						score = res.data.data[0][0].doc_score,
						jobNum = res.data.data[0][0].doc_jobNum;
					this.setData({
						doctor: {
							doc_id,
							name,
							img_url,
							job,
							label,
							introduction,
							score,
							jobNum
						}
					})
					wx.hideLoading();
				}
			}
		})
		var useInfo = app.globalData.userInfo;
		this.setData({
			user: {
				id: useInfo.u_id
			},
			i_id: options.i_id
		})
	},
	// 获取输入内容
	textareablur(e) {
		var value = e.detail.value;
		this.setData({
			'evaluate.value': value
		})
	},
	scoreChange(e) {
		var list = e.target.dataset.list;
		var score = e.target.dataset.score;
		var scorelist = this.data.scorelist;
		scorelist[list].score = score;
		this.setData({
			scorelist
		})
	},
	// 拍摄照片
	chooseImage(e) {
		var sourcetype = e.target.dataset.sourcetype;
		var _this = this;
		this.setData({
			isShowDel: false
		})
		wx.chooseImage({
			sourceType: [sourcetype],
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
					formData:{msg:'evaluate'},
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
							var img = _this.data.evaluate.img;
							var imgs = _this.data.evaluate.imgs;
							img.push(res.data.data);
							imgs.push(imageSrc);
							_this.setData({
								'evaluate.img': img,
								'evaluate.imgs': imgs
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
	handleTouchStart(e) {
		this.startTime = e.timeStamp;
	},
	handleTouchEnd(e) {
		this.endTime = e.timeStamp;
	},
	// 放大照片
	previewImage(e) {
		if (this.endTime - this.startTime < 350) {
			var current = e.target.dataset.src;
			var i = e.target.dataset.i;
			var urls = [this.data.evaluate.imgs[i]];
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
		var img = this.data.evaluate.img;
		var imgs = this.data.evaluate.imgs;
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
					'evaluate.img': img,
					'evaluate.imgs': imgs,
					isShowDel: false
				})
			}
		})
	},
	// 提交
	submit() {
		var imgs = this.data.evaluate.imgs;
		imgs = imgs.length == 0 ? "" : imgs.length == 1 ? imgs : imgs.split(',');
		var exa_text = this.data.evaluate.value,
			u_id = this.data.user.id,
			i_id = this.data.i_id,
			doc_id = this.data.doctor.doc_id,
			time = new Date().getTime(),
			store_id = this.data.store_id,
			doc_once_score = this.data.scorelist.list1.score,
			store_once_score = this.data.scorelist.list2.score,
			drug_once_score = this.data.scorelist.list3.score;
		if (!exa_text || !doc_once_score || !store_once_score || !drug_once_score || !u_id || !doc_id) {
			this.toast('请填写评价内容');
		} else {
			// this.toast('提交成功！');
			// setTimeout(() => {
			//   wx.navigateTo({
			//     url: `/pages/Home/payResult/payResult?msg=4&i_id=${i_id}&doc_id=${doc_id}&u_id=${u_id}`
			//   })
			// }, 500);
			wx.request({
				url: `${this.data.url}hdoctor`,
				data: {
					exa_text,
					imgs,
					u_id,
					doc_id,
					doc_once_score,
					store_once_score,
					drug_once_score,
					time,
					store_id
				},
				method: "POST",
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					if (res.data.code == 200) {
						setTimeout(() => {
							wx.navigateTo({
								url: `/pages/Home/payResult/payResult?msg=4&i_id=${i_id}&doc_id=${doc_id}&u_id=${u_id}`
							})
						}, 500);
					}
				}
			})
		}
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
			store_id: app.globalData.store_id
		})
		this.getData(options);
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
