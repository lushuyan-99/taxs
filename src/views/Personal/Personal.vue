<template>
	<div class="content">
		<header class="system_header">
			<el-breadcrumb separator=">>" class="breadcrumb">
				<el-breadcrumb-item><img class="icon-home" src="../../assets/img/icon_home.png">首页</el-breadcrumb-item>
				<el-breadcrumb-item>查询统计</el-breadcrumb-item>
				<el-breadcrumb-item>个人扣缴明细查询</el-breadcrumb-item>
			</el-breadcrumb>
		</header>

		<div class="contanier">
			<!-- 搜索条件 -->
			<div class="condition-wrapper">
				<div class="condition-bar">
					<el-dropdown @command="handleCommand" v-show="showCommand">
						<el-button class="exportExcelBtn" type="primary" size="small"> 导出<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command=1>
								<el-button type="text" style="color: #333;">汇总表</el-button>
							</el-dropdown-item>
							<el-dropdown-item command=2>
								<el-button type="text" style="color: #333;">综合所得明细表</el-button>
							</el-dropdown-item>
							<el-dropdown-item command=3>
								<el-button type="text" style="color: #333;">分类所得明细表</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

					<div class="show-condition-btn">收折查询条件</div>
				</div>
				<div class="conditions">
					<div class="con-time">
						<span class="red-text">*</span>
						税款所属期：
						<el-date-picker v-model="value1" type="monthrange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
						<el-input v-model="inputCity" :disabled="true" placeholder="中国"></el-input>
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
					<el-tab-pane label="汇总" name="first">
						<!-- <el-table bordered show-summary :data="tableData" style="width: 100%" height="300">
							<el-table-column fixed prop="date" label="税款所属期" width="150">
							</el-table-column>
							<el-table-column fixed prop="project" label="所得项目" width="150">
							</el-table-column>
							<el-table-column prop="name" label="收入" width="120">
							</el-table-column>
							<el-table-column prop="province" label="免税收入" width="120">
							</el-table-column>
							<el-table-column prop="city" label="市区" width="120">
							</el-table-column>
							<el-table-column prop="address" label="地址" width="300">
							</el-table-column>
							<el-table-column prop="zip" label="邮编">
							</el-table-column>
						</el-table> -->
						<el-table :data="tableData" border show-summary height="250" style="width: 100%;margin-top: 20px">
							<el-table-column fixed prop="id" label="ID" width="180">
							</el-table-column>
							<el-table-column fixed prop="name" label="姓名">
							</el-table-column>
							<el-table-column prop="amount1" label="数值 1">
							</el-table-column>
							<el-table-column prop="amount2" label="数值 2">
							</el-table-column>
							<el-table-column prop="amount3" label="数值 3">
							</el-table-column>
							<el-table-column prop="amount4" label="数值 2">
							</el-table-column>
							<el-table-column prop="amount5" label="数值 3">
							</el-table-column>
							<el-table-column prop="amount6" label="数值 2">
							</el-table-column>
							<el-table-column prop="amount7" label="数值 3">
							</el-table-column>
							<el-table-column prop="amount8" label="数值 2">
							</el-table-column>
							<el-table-column prop="amount9" label="数值 3">
							</el-table-column>
							<el-table-column prop="amount10" label="数值 2">
							</el-table-column>
							<el-table-column prop="amount11" label="数值 3">
							</el-table-column>
						</el-table>
					</el-tab-pane>
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
		data() {
			return {
				showCommand: true,
				value1: '', //选择时间
				inputName: '',
				inputCity: '',
				inputCode: '',
				activeName: 'first',
				tableData: [{
					id: '12987122',
					name: '王小虎',
					amount1: '234',
					amount2: '3.2',
					amount3: 10,
					amount4: '234',
					amount5: '3.2',
					amount6: 10,
					amount7: '234',
					amount8: '3.2',
					amount9: 10,
					amount10: '3.2',
					amount11: 10
				}, {
					id: '12987123',
					name: '王小虎',
					amount1: '165',
					amount2: '4.43',
					amount3: 12,
					amount4: '234',
					amount5: '3.2',
					amount6: 10,
					amount7: '234',
					amount8: '3.2',
					amount9: 10,
					amount10: '3.2',
					amount11: 10
				}, {
					id: '12987124',
					name: '王小虎',
					amount1: '324',
					amount2: '1.9',
					amount3: 9,
					amount4: '234',
					amount5: '3.2',
					amount6: 10,
					amount7: '234',
					amount8: '3.2',
					amount9: 10,
					amount10: '3.2',
					amount11: 10
				}, {
					id: '12987125',
					name: '王小虎',
					amount1: '621',
					amount2: '2.2',
					amount3: 17,
					amount4: '234',
					amount5: '3.2',
					amount6: 10,
					amount7: '234',
					amount8: '3.2',
					amount9: 10,
					amount10: '3.2',
					amount11: 10
				}, {
					id: '12987126',
					name: '王小虎',
					amount1: '539',
					amount2: '4.1',
					amount3: 15,
					amount4: '234',
					amount5: '3.2',
					amount6: 10,
					amount7: '234',
					amount8: '3.2',
					amount9: 10,
					amount10: '3.2',
					amount11: 10
				}]
			}
		},
		methods: {
			handleCommand(command) {
				// this.shFlag = command;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>
</script>

<style lang="less">
	.content {
		width: 100%;

		.system_header {
			height: 32px;
			background: #fff;
			padding-left: 20px;
			border-bottom: 1px solid #e6e6e6;

			.breadcrumb {
				width: 100%;
				height: 32px;
				line-height: 32px;

				.icon-home {
					vertical-align: middle;
					margin-right: 6px;
					color: #409eff;
				}
			}
		}

		.contanier {
			height: calc(100% - 52px);

			.condition-wrapper {
				margin: 20px;

				.condition-bar {
					height: 65px;
					border: 1px solid #e6e6e6;
					background: #fff;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					/deep/ .el-button--primary {
						background-color: #3574db;
						border-color: #3574db;
					}

					.exportExcelBtn {
						margin-left: 26px;
					}

					.show-condition-btn {
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

				.conditions {
					height: 130px;
					background: #fff;
					border: 1px solid #e6e6e6;
					border-top: none;

					.con-time {
						display: flex;
						align-items: center;
						font-size: 14px;
						padding-top: 10px;

						/deep/ .el-input__inner {
							height: 32px;
							line-height: 32px;
						}

						/deep/ .el-date-editor .el-range__icon {
							line-height: 24px;
						}

						/deep/ .el-date-editor .el-range-separator {
							font-size: 14px;
							line-height: 23px;
						}

						.red-text {
							color: #ff0000;
							margin-left: 20px;
							margin-right: 6px;
						}
					}

					/deep/ .el-row {
						display: flex;
						align-items: center;
						margin: 10px 0px;

						.row-caption {
							width: 118px;
							display: inline-block;
							text-align: right;
							font-size: 14px;

							.red-text {
								color: #ff0000;
								margin-left: 20px;
								margin-right: 6px;
							}
						}

						/deep/ .el-input {
							width: 180px;

							/deep/ .el-input__inner {
								height: 32px;
								line-height: 32px;
							}
						}
					}

					.condition-btns {
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.btns {
							width: 60px;
							height: 28px;
							line-height: 28px;
							text-align: center;
							border: 1px solid #009EFF;
							color: #009EFF;
							border-radius: 4px;
							margin-right: 20px;
							font-size: 14px;
							cursor: pointer;
						}

						.active {
							background: rgb(53, 116, 219);
							border: none;
							color: #fff;
						}
					}
				}
			}

			.result-con {
				margin: 10px 20px;
				background: #fff;

				/deep/ .el-tabs__item {
					padding: 0px 10px;
				}

				/deep/ .el-table th {
					background: #F4F6F9;
					color: #333;
				}
			}

		}
	}
</style>
