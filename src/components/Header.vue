<template>
	<div class="header">
		<div class="title">自然人电子税务局(扣缴端)</div>
		<div class="header-menus">
			<div class="menus-item">
				<i class="el-icon-document"></i>
				<span>版本切换</span>
			</div>
			<div class="menus-item">
				<i class="el-icon-document"></i>
				<span>操作手册</span>
			</div>
			<div class="menus-item">
				<i class="el-icon-message"></i>
				<span>消息中心</span>
			</div>
			<div class="menus-item">
				<i class="el-icon-tickets"></i>
				<span>单位管理</span>
			</div>
			<div class="menus-item">
				<i class="icon-online"></i>
				<span>在线</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	// import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'Header',
		components: {

		}
	}
</script>
<style lang="less" scoped>
	.header {
		height: 80px;
		background: #009EFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.title{
			font-size: 24px;
			color: #fff;
			padding-left: 80px;
			line-height: 60px;
			background: url(../assets/img/logo.png) no-repeat 10px center;
			background-size: 60px 60px;
		}
		.header-menus{
			float: right;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 60px;
			line-height: 60px;
			justify-content: space-between;
			.menus-item{
				color: #fff;
				padding: 0px 10px;
				cursor: pointer;
				display: flex;
				align-items: center;
				font-size: 14px;
				.icon-online{
					display: inline-block;
					width: 16px;
					height: 16px;
					background: url(../assets/img/icon_online.png) no-repeat left 0px;
				}
				/deep/ i{
					margin-right: 6px;
				}
			}
			.menus-item:hover{
				background: #22a1ef;
				border-radius: 6px;
			}
		}
	}
</style>
