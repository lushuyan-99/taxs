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
						<el-date-picker v-model="value1" 
						 type="monthrange" 
						 format="yyyy-MM"
                         value-format="yyyy-MM" 
						 range-separator="至"
						 start-placeholder="开始日期" 
						 end-placeholder="结束日期"
						 @change="getPickerTime">
						</el-date-picker>
					</div>
					<div class="el-row">
						<div class="row-caption">
							<span class="red-text">*</span>
							姓名：
						</div>
						<el-input v-model="inputName" placeholder="请输入姓名" @change='inputChange'></el-input>
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
						<div class="btns active" @click="toSearch">查询</div>
						<div class="btns">重置</div>
					</div>
				</div>
			</div>
			<!-- 搜索结果 -->
			<div class="result-con">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="汇总" name="first">
						<el-table :data="tableData" id="tableData" ref='table' v-loading="loading" border :show-summary="isShowSummary" height="350" style="width: 100%;margin-top: 20px">
							<el-table-column fixed prop="date" label="税款所属期" width="120">
							</el-table-column>
							<el-table-column fixed prop="sdxm" label="所得项目" width="150">
							</el-table-column>
							<el-table-column prop="bqsr" label="收入" width="150">
							</el-table-column>
							<el-table-column prop="bqmssr" label="免税收入">
							</el-table-column>
							<el-table-column prop="bqjcfy" label="减除费用">
							</el-table-column>
							<el-table-column prop="bqjbylbxf" label="基本养老保险费用" width="150">
							</el-table-column>
							<el-table-column prop="bqjbylbxf2" label="基本医疗保险费用" width="150">
							</el-table-column>
							<el-table-column prop="bqsybxf" label="失业保险费用" width="120">
							</el-table-column>
							<el-table-column prop="bqzfgjj" label="住房公积金" width="120">
							</el-table-column>
							<el-table-column prop="bqnj" label="年金">
							</el-table-column>
							<el-table-column prop="bqsyjkbx" label="商业健康保险" width="120">
							</el-table-column>
							<el-table-column prop="bqsyylbx" label="税延养老保险" width="120">
							</el-table-column>
							<el-table-column prop="bqqt" label="其他扣除">
							</el-table-column>
							<el-table-column prop="bqccyz" label="税前扣除项目财产原值" width="240">
							</el-table-column>
							<el-table-column prop="bqyxkcsj" label="税前扣除项目允许扣除的税费" width="240">
							</el-table-column>
							<!-- 不确定如下 -->
							<el-table-column prop="ljqtkc" label="税前扣除项目其他" width="200">
							</el-table-column>
							<el-table-column prop="zykcjze" label="税前扣除项目准予扣除的捐赠额" width="240">
							</el-table-column>
							<el-table-column prop="jmse" label="减免税额">
							</el-table-column>
							<el-table-column prop="ynse" label="应扣缴税额" width="120">
							</el-table-column>
							<el-table-column prop="yjse" label="已缴税额">
							</el-table-column>
							<el-table-column prop="ybtse" label="应补(退)税额" width="120">
							</el-table-column>
						</el-table>
					    <div class="scroll-bar" ref='scrollBar'>
							<div class="scroll-inner" id="scrollInner"></div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="综合所得申报表" name="second">
						
					</el-tab-pane>
					<el-tab-pane label="分类所得申报表" name="third">
						
					</el-tab-pane>
					<el-tab-pane label="非居民所得申报表" name="fourth">
						
					</el-tab-pane>
					<el-tab-pane label="限售股所得申报表" name="five">
						
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import { personalData } from "../../js/enums.js";
	import { personalData4 } from "../../js/enum4.js";
	import { personalData5 } from "../../js/enum5.js";
	import { personalData6 } from "../../js/enum6.js";
	import { personalData7 } from "../../js/enum7.js";
	import { personalData8 } from "../../js/enum8.js";
	import { personalData9 } from "../../js/enum9.js";
	import { personalData10 } from "../../js/enum10.js";
	import { personalData11 } from "../../js/enum11.js";
	import { personalData12 } from "../../js/enum12.js";
	function getTime(arry){
		let array = arry
		console.log(array)
		let len = array.length
	   let aa = len-1;
	   if(array[len-aa]-array[0]>1){
		let bb = array[len-aa]-1
		array.splice(1,0,bb)
		getTime(array)
	   }
	    return array
	}
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
				loading:false,
				originSourceList:[],  //原数据
				tableData: [],  //查询过滤后的数据
				dates:[],
				isShowSummary:true
			}
		},
		created() {
			// let allArray = [...personalData,...personalData4];
			let allArray = personalData.concat(personalData4).concat(personalData5).concat(personalData6).concat(personalData7).concat(personalData8).concat(personalData9).concat(personalData10).concat(personalData11).concat(personalData12);
			this.originSourceList = JSON.parse(JSON.stringify(allArray));
			this.originSourceList.map((item,index)=>{	//数据中添加月份，方便查询
				item.month = this.getMonth(item.date);
				item.name = item.name.replace(/\[.*?\]/g,'');
			})
			// 模拟表格滚动条
			this.$nextTick(()=>{
				document.getElementById("scrollInner").style.width = document.getElementById("tableData").querySelector(".el-table__header").style.width;
				this.$refs.scrollBar.addEventListener('scroll', ()=>{
					document.getElementById("tableData").querySelector(".el-table--scrollable-x .el-table__body-wrapper").scrollLeft = this.$refs.scrollBar.scrollLeft
				})
				this.$refs.scrollBar.addEventListener('resize', ()=>{
					document.getElementById("tableData").querySelector(".el-table--scrollable-x .el-table__body-wrapper").scrollLeft = this.$refs.scrollBar.scrollLeft
				})
				
				// this.$refs("table")
			})
			 
		},
		methods: {
			handleCommand(command) {
				// this.shFlag = command;
			}, 
			handleClick(tab, event) {
				console.log(tab, event);
			},
			getPickerTime(dates,dateStrings){
				this.dates = dates;
			},
			// 姓名输入框输入值后动态获取身份证号码填充
			inputChange(value){
				if(value && value !=''){
					let curNode = this.originSourceList.find(item => item.name == value);
					console.log(curNode)
					this.inputCode = curNode.idCode
				}else{
					this.inputCode = ''
				}
			},
			// 点击搜索按钮查询
			toSearch(){
				console.log(this.dates)
				
				if(this.dates == null || this.dates.length == 0){
					this.$message.error('请选择月份！');
					return false
				}
				if(this.inputName == ''){
					this.$message.error('请输入姓名！');
					return false
				}
				if(this.dates && this.dates.length>0){
					this.loading = true;
					this.isShowSummary = true
					 let month0 = parseInt(this.dates[0].split("-")[1])
					 let month1 = parseInt(this.dates[1].split("-")[1])
					 let newDateTime = [month0,month1];
					 let getDates = getTime(newDateTime)
					 this.tableData = [];
					 
					 setTimeout(() =>{
					 	this.loading = false;
					 },500)
					 this.tableData = this.originSourceList.filter(
					   (node) => getDates.indexOf(node.month) > -1 && node.name == this.inputName
					 );
					 this.$nextTick(() => {
					 	this.$refs['table'].doLayout();
					  })
				}else{
					setTimeout(() =>{
						this.loading = false;
					},500)
				}
				
				
			},
			getMonth(date){
				let month = parseInt(date.split("-")[1])
				return month
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
				/deep/.el-table--scrollable-x ::-webkit-scrollbar {
				  display: none;
				}
				/deep/ .el-tabs__content{
					min-height: 400px;
				}
				#pane-first{
					padding-bottom: 17px;
				}
				.scroll-bar{
					position: absolute;
					// height: 17px;
					width: 100%;
					bottom: 0;
					overflow: auto;
					.scroll-inner{
						height: 17px;
						min-width: calc(100% + 1px);
					}
				}
			}

		}
	}
</style>
