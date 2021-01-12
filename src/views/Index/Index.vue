<template>
	<div class="content">
		<header class="system_header">
		  <el-breadcrumb separator=">>" class="breadcrumb">
		    <el-breadcrumb-item><img class="icon-home" src="../../assets/img/icon_home.png">首页</el-breadcrumb-item>
		  </el-breadcrumb>
		</header>
		<div class="head-time">
			<span class="demonstration">税款所属月份</span>
			<el-date-picker
			  v-model="value2"
			  type="month"
			  placeholder="选择月份">
			</el-date-picker>
		</div>
		<div class="index-contanier">
			<!-- 常用功能 -->
			<div class="content-wrapper">
				<div class="fun-title">
					<div class="title-iconafter"></div>
					常用功能
				</div>
				<div class="fun-con">
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon1.png" />
						</div>
						<div>
							<div class="item-pic-top">人员信息采集</div>
							<div class="item-pic-info">自然人基础信息登记、报送和公安系统身份验证</div>
						</div>
					</div>
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon2.png" />
						</div>
						<div>
							<div class="item-pic-top">专项附加扣除信息采集</div>
							<div class="item-pic-info">子女教育支出、住房租金支出等信息采集</div>
						</div>
					</div>
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon3.png" />
						</div>
						<div>
							<div class="item-pic-top">综合所得申报</div>
							<div class="item-pic-info">工资薪金、劳务报酬、稿酬、特许权使用费等月度申报</div>
						</div>
					</div>
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon4.png" />
						</div>
						<div>
							<div class="item-pic-top">分类所得申报</div>
							<div class="item-pic-info">利息股息红利、财产租赁、财产转让等月度申报</div>
						</div>
					</div>
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon5.png" />
						</div>
						<div>
							<div class="item-pic-top">非居民所得申报</div>
							<div class="item-pic-info">工资薪金、劳务报酬、稿酬、特许权使用费等月度申报</div>
						</div>
					</div>
					<div class="fun-items">
						<div class="item-pic">
							<img src="../../assets/img/home_icon6.png" />
						</div>
						<div>
							<div class="item-pic-top">税款缴纳</div>
							<div class="item-pic-info">个人所得税税款在线缴纳</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content-wrapper">
				<div class="fun-title">
					<div class="title-iconafter"></div>
					待处理事项<span style="color: #ff0000;">(0)</span>
				</div>
				<div class="undo-con">
					暂无待处理事项
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
			name: 'Index',
			components: {
				
			},
			data(){
				return{
					value2:''
				}
			},
			created() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var toMonth = year + "-" + (month + 1) ;
				this.value2 = toMonth;
			},
			methods: {
				
			}
		}
	</script>
</script>

<style lang="less" scoped>
	.content{
		width: 100%;
		.system_header{
			height: 32px;
			background: #fff;
			padding-left: 10px;
			border-bottom: 1px solid #e6e6e6;
			.breadcrumb{
				width: 100%;
				height: 32px;
				line-height: 32px;
				/deep/.el-breadcrumb__inner{
					color: #409eff;
				}
				.icon-home{
					vertical-align: middle;
					margin-right: 6px;
				}
			}
		}
		.head-time{
			height: 44px;
			line-height: 44px;
			background: #fff;
			font-size: 14px;
			.demonstration{
				margin: 0px 10px;
			}
			/deep/ .el-input__inner{
				height: 32px;
				line-height: 32px;
			}
			/deep/ .el-date-editor .el-range__icon{
				line-height: 24px;
			}
			/deep/ .el-date-editor .el-range-separator{
				font-size: 14px;
				line-height: 23px;
			}
		}
		.index-contanier{
			margin: 20px;
			height: calc(100% - 100px);
			border: 0px solid red;
			.content-wrapper{
				// min-height: 48%;
				background: #fff;
				margin-bottom: 10px;
				.fun-title{
					height: 46px;
					line-height: 46px;
					position: relative;
					display: flex;
					flex-direction: row;
					align-items: center;
					.title-iconafter {
						width: 4px;
						height: 16px;
						background-color: rgb(66,133,244);
						border-radius: 10px;
						margin: 0px 10px;
					}
				}
				.fun-con{
					// height:300px;
					border: 0px solid red;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 0px 6px;
					.fun-items{
						width: 33%;
						height: 106px;
						border: 1px solid #e6e6e6;
						border-radius: 6px;
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-bottom: 10px;
						cursor: pointer;
						.item-pic{
							width: 48px;
							height: 48px;
							line-height: 48px;
							text-align: center;
							display: inline-block;
							border-radius: 50%;
							background: #EAF4FF;
							margin: 0px 10px 0px 4px;
							img{
								margin-top: 10px;
							}
						}
						.item-pic-top{
							color: #333;
							font-size: 16px;
							margin-bottom: 8px;
						}
						.item-pic-info{
							color: #999999;
							font-size: 14px;
						}
					}
					.fun-items:hover{
						border: 1px solid #009EFF;
					}
				}
				.undo-con{
					height: 100%;
					line-height: 200px;
					text-align: center;
					color: #999;
				}
			}
			
		}
	}
</style>
