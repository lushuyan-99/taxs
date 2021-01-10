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
			<div class="condition-wrapper">
				<div class="condition-bar">
					<el-dropdown @command="handleCommand" v-show="showCommand">
					  <el-button class="el-icon-edit exportExcelBtn" style="margin-left:10px;" type="primary" size="small"> 导出</el-button>
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
				</div>
				<div class="conditions">
					
				</div>
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
					showCommand:true
				}
			},
			methods: {
				handleCommand (command) {
				  // this.shFlag = command;
				},
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
			height: calc(100% - 36px);
			.condition-wrapper{
				margin: 20px;
				.condition-bar{
					height: 65px;
					border: 1px solid #e6e6e6;
					background: #fff;
					.exportExcelBtn{
						margin-top: 15px;
					}
				}
				.conditions{
					height: 130px;
					background: #fff;
					border: 1px solid #e6e6e6;
					border-top: none;
				}
			}
		}
	}
</style>
