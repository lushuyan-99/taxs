<template>
	<div class="content">
		<header class="system_header">
		  <el-breadcrumb separator=">>" class="breadcrumb">
		    <el-breadcrumb-item>首页</el-breadcrumb-item>
		  </el-breadcrumb>
		</header>
		
		<div>
			首页
		</div>
	</div>
</template>

<script>
	export default {
			name: 'Index',
			components: {
				
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
			.breadcrumb{
				width: 100%;
				height: 40px;
				line-height: 40px;
			}
		}
	}
</style>
