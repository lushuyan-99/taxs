<template>
	<div class="content">
		<header class="system_header">
		  <el-breadcrumb separator=">>" class="breadcrumb">
		    <el-breadcrumb-item>首页</el-breadcrumb-item>
		    <el-breadcrumb-item>查询统计</el-breadcrumb-item>
		    <el-breadcrumb-item>个人扣缴明细查询</el-breadcrumb-item>
		  </el-breadcrumb>
		</header>
		
		<div class="contanier">
			<!-- 搜索条件 -->
			<div class="condition-wrapper">
				<div class="condition-bar">
					<el-dropdown @command="handleCommand" v-show="showCommand">
					  <el-button class="el-icon-edit exportExcelBtn" type="primary" size="small"> 导出</el-button>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command=1>
					      <el-button type="text" icon="el-icon-check">通过</el-button>
					    </el-dropdown-item>
					    <el-dropdown-item command=2>
					      <el-button type="text" icon="el-icon-close">不通过</el-button>
					    </el-dropdown-item>
					    <el-dropdown-item command=3>
					      <el-button type="text" icon="el-icon-delete">删除</el-button>
					    </el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
					
					<div class="show-condition-btn">收折查询条件</div>
				</div>
				<div class="conditions">
					<div class="con-time">
						<span class="red-text">*</span>
						税款所属期：
					<el-date-picker
					      v-model="value1"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</div>
					<div class="el-row">
						<div class="row-caption">
							<span class="red-text">*</span>
							姓名：
						</div>
						<el-input v-model="inputName" placeholder="请输入姓名"></el-input>
						<div class="row-caption">
							国籍/地区：
						</div>
						<el-input v-model="inputCity" :disabled="true" placeholder=""></el-input>
						<div class="row-caption">
							<span class="red-text">*</span>
							证件号码：
						</div>
						<el-input v-model="inputCode" placeholder="请输入证件号码"></el-input>
					</div>
					<div class="condition-btns">
						<div class="btns active">查询</div>
						<div class="btns">重置</div>
					</div>
				</div>
			</div>
			<!-- 搜索结果 -->
			<div class="result-con">
				<el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="汇总" name="first">汇总</el-tab-pane>
				    <el-tab-pane label="综合所得申报表" name="second">综合所得申报表</el-tab-pane>
				    <el-tab-pane label="分类所得申报表" name="third">分类所得申报表</el-tab-pane>
				    <el-tab-pane label="非居民所得申报表" name="fourth">非居民所得申报表</el-tab-pane>
					<el-tab-pane label="限售股所得申报表" name="five">限售股所得申报表</el-tab-pane>
				  </el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
			name: 'Personal',
			components: {
				
			},
			data(){
				return{
					showCommand:true,
					value1:'' ,//选择时间
					inputName:'',
					inputCity:'',
					inputCode:'',
					activeName: 'first'
				}
			},
			methods: {
				handleCommand (command) {
				  // this.shFlag = command;
				},
				handleClick(tab, event) {
					console.log(tab, event);
				  }
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
			padding-left: 20px;
			border-bottom: 1px solid #e6e6e6;
			.breadcrumb{
				width: 100%;
				height: 32px;
				line-height: 32px;
			}
		}
		.contanier{
			height: calc(100% - 52px);
			.condition-wrapper{
				margin: 20px;
				.condition-bar{
					height: 65px;
					border: 1px solid #e6e6e6;
					background: #fff;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.exportExcelBtn{
						margin-left: 26px;
					}
					.show-condition-btn{
						width: 140px;
						height: 32px;
						line-height: 32px;
						text-align: center;
						border: 1px solid #009EFF;
						color: #009EFF;
						border-radius: 4px;
						margin-right: 26px;
						font-size: 14px;
						cursor: pointer;
					}
				}
				.conditions{
					height: 130px;
					background: #fff;
					border: 1px solid #e6e6e6;
					border-top: none;
					.con-time{
						display: flex;
						align-items: center;
						font-size: 14px;
						padding-top: 10px;
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
						.red-text{
							color: #ff0000;
							margin-left: 20px;
							margin-right:6px;
						}
					}
					/deep/ .el-row{
						display: flex;
						align-items: center;
						margin: 10px 0px;
						.row-caption{
							width: 118px;
							display: inline-block;
							text-align: right;
							font-size: 14px;
							.red-text{
								color: #ff0000;
								margin-left: 20px;
								margin-right:6px;
							}
						}
						/deep/ .el-input{
							width: 180px;
							/deep/ .el-input__inner{
								height: 32px;
								line-height: 32px;
							}
						}
					}
					.condition-btns{
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.btns{
							width: 60px;
							height: 28px;
							line-height: 28px;
							text-align: center;
							border: 1px solid #009EFF;
							color: #009EFF;
							border-radius: 4px;
							margin-right: 26px;
							font-size: 14px;
							cursor: pointer;
						}
						.active{
							background: rgb(53,116,219);
							border: none;
							color: #fff;
						}
					}
				}
			}
			.result-con{
				margin:10px 20px;
				background: #fff;
				/deep/ .el-tabs__item{
					padding: 0px 10px;
				}
			}
				
		}
	}
</style>
