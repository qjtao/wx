// // pages/map/map.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     phone:'18638982919',
//     openid:'',
//     session_key:''
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },
//   toMap(){
//       wx.chooseAddress({
//     success(res) {    
//       console.log(res.userName)
//       console.log(res.postalCode)
//       console.log(res.provinceName)
//       console.log(res.cityName)
//       console.log(res.countyName)
//       console.log(res.detailInfo)
//       console.log(res.nationalCode)
//       console.log(res.telNumber)
//       // var userName = res.userName
//       // wx.request({
//       //   url: `http://192.168.2.199:8080/getPhoneNumber`,
//       //   data:{
//       //     userName
//       //   }
//       // })
//     }
//   })
//   },
//   toPhone(){
//     // 拨打电话操作
//     wx.makePhoneCall({
//       phoneNumber:this.data.phone
//     })
//   },
//   toVib(){
//     wx.vibrateLong()
//     console.log(11)
//   },
//   toAppid(){
//     const accountInfo = wx.getAccountInfoSync()
//     console.log(accountInfo.miniProgram.appId) // 小程序 appId
//     var appID = accountInfo.miniProgram.appId
//     wx.showToast({
//       title:appID,
//       icon:"none",
//       duration:1000
//     })
//   },
//   getOpenIdTap(){
//       const APP_ID = 'wx38a25e712b7234e1'; //输入小程序appid 
//       const APP_SECRET = 'aa6c4e719decb8572a3f6850cef430c0'; //输入小程序app_secret 
//       var OPEN_ID = '' //储存获取到openid 
//       var SESSION_KEY = '' //储存获取到session_key

//       var that = this;
//       wx.login({
//         success: function (data) {
//           console.log(data);
//           wx.request({
//             //获取openid接口
//             url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + APP_SECRET + '&js_code=' + data.code + '&grant_type=authorization_code',
//             data: {},
//             method: 'GET',
//             success: function (res) {
//               console.log(res.data)
//               OPEN_ID = res.data.openid; //获取到的openid 
//               SESSION_KEY = res.data.session_key; //获取到session_key 
//               // that.setData({
//               //   openid: OPEN_ID,
//               //   session_key: SESSION_KEY
//               // });
//             }
//           })
//         }
//       })

// },
// getOpenid: function () {
//   let that = this;
//   //获取openid不需要授权
//   wx.login({
//     success: function (res) {
//       //请求自己后台获取用户openid
//       console.log(res)
//       wx.request({
//         url: 'http://192.168.2.199:3000/getPhonenumber',
//         data: {
//           // appid: 'wx38a25e712b7234e1',
//           // secret: 'aa6c4e719decb8572a3f6850cef430c0',
//           code: res.code
//         },
//         success: function (response) {
//           console.log(response)
//           var openid = response.data.openid;
//           console.log('请求获取openid:' + openid);
//           //可以把openid存到本地，方便以后调用
//           wx.setStorageSync('openid', openid);
//           that.setData({
//             openid: "获取到的openid：" + openid
//           })
//         }
//       })
//     }
//   })
// },
//   getPhoneNumber(e){
//     // console.log(e.detail.errMsg)
//     console.log(e.detail.iv)
//     console.log(e.detail.encryptedData)
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		session_key: '',
		openid: '',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	onLoad: function() {


	},
	getPhoneNumber: function(e) {
		var that = this;
		console.log(e)
		var encryptedData = e.detail.encryptedData;
		var iv = e.detail.iv;
		wx.login({
			success: function(res) {
				//请求自己后台获取用户openid
				console.log(res)
				wx.request({
					url: 'http://192.168.2.199:8080/getPhonenumber',
					data: {
						encryptedData,
						iv,
						code: res.code
					},
					success: function(response) {
						console.log(response.data.phoneNumber)

					}
				})
			}
		})

	},

	pay(money) {
		// console.log('发起微信支付')
		// var money = 0.01;
		wx.login({
			success(res) {
				if (res.code) {
					wx.request({
						url: 'http://192.168.2.199:8080/pay',
						data: {
							code: res.code,
							money
						},
						success(res) {
							console.log(res, '统一下单接口返回信息')
							console.log(res.data.package);
							console.log(res.data.timeStamp);
							console.log(res.data.nonceStr);
							console.log(res.data.paySign);
							wx.requestPayment({
								// "appId":'wx38a25e712b7234e1',
								"timeStamp": res.data.timeStamp.toString(),
								"nonceStr": res.data.nonceStr,
								"package": res.data.package,
								"signType": 'MD5',
								"paySign": res.data.paySign,
								success: (res) => {
									console.log(res, '微信支付成功！！！')
								},
								fail: (res) => {
									console.log(res);
									console.log('支付失败');
									return;
								},
								complete: (res) => {
									console.log('支付完成');
									// var url = this.data.url;
									// console.log('get url', url)
									if (res.errMsg == 'requestPayment:ok') {
										wx.showModal({
											title: '提示',
											content: '充值成功'
										});
										// if (url) {
										//   setTimeout(function () {
										//     wx.redirectTo({
										//       url: '/pages' + url
										//     });
										//   }, 2000)
										// } else {
										//   setTimeout(() => {
										//     wx.navigateBack()
										//   }, 2000)
										// }
									}
									return;
								}
								// 'success': function (res) { },
								// 'fail': function (res) { },
								// 'complete': function (res) { }
							})


							// wx.requestPayment({
							//   timeStamp: res.data.timeStamp+'',  //时间搓
							//   nonceStr: res.data.nonceStr, //随机字符串
							//   package: res.data.package,  //repay_id
							//   // signType: 'HMAC-SHA256', //签名算法
							//   signType: 'MD5', //签名算法
							//   paySign: res.data.paySign,  //签名
							// })

						},
					})
				}
			}
		})

		// ---------------------
		//   作者：yemuxia_sinian
		// 来源：CSDN
		// 原文：https://blog.csdn.net/yemuxia_sinian/article/details/86672495 
		// 版权声明：本文为博主原创文章，转载请附上博文链接！
	},
	getOpenid: function() {
		let that = this;
		//获取openid不需要授权
		// wx.login({
		//   success: function (res) {
		//     //请求自己后台获取用户openid
		//     console.log(res)
		//     wx.request({
		//       url: 'http://192.168.2.199:8080/getPhonenumber',
		//       data: {
		//         // appid: 'wx38a25e712b7234e1',
		//         // secret: 'aa6c4e719decb8572a3f6850cef430c0',
		//         code: res.code
		//       },
		//       success: function (response) {
		//         console.log(response)
		//         var openid = response.data.openid;
		//         console.log('请求获取openid:' + openid);
		//         //可以把openid存到本地，方便以后调用
		//         wx.setStorageSync('openid', openid);
		//         that.setData({
		//           openid: "获取到的openid：" + openid
		//         })
		//       }
		//     })
		// }
		// })
		wx.login({
			success: function(loginCode) {
				var appid = 'wx38a25e712b7234e1'; //填写微信小程序appid
				var secret = 'aa6c4e719decb8572a3f6850cef430c0'; //填写微信小程序secret
				var code = loginCode.code
				//调用request请求api转换登录凭证
				wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session',
					data: {
						appid,
						secret,
						grant_type: `authorization_code`,
						js_code: code
					},
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						console.log(res.data.session_key)
						console.log(res.data.openid) //获取openid
					}
				})
			}
		})
	}
})
