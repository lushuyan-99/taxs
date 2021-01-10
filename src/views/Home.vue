<template>
	<div class="home">
		<home-header></home-header>
		<el-container class='home-contanier'>
			<el-aside class='home-aside'>
				<el-menu router :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<!-- 所有路由 -->
					<template v-for="(item,index) in asideList">
						<el-submenu v-if="item.children && item.children.length" :index="item.path" :key="item.path">
							<template slot="title">
								<i :class="item.icon"></i>
								<span :title="item.title">{{item.title}}</span>
							</template>

							<!-- 二级菜单 -->
							<div class="submenuWrap">
								<template v-for="itemChild in item.children">
									<el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.path" :key="itemChild.path">
										<template slot="title">
											<i :class="item.icon"></i>
											<span @click="changeTitle(itemChild)" :title="itemChild.title">{{itemChild.title}}</span>
										</template>
									</el-submenu>

									<el-menu-item v-else :index="itemChild.path" :key="itemChild.path" @click="changeTitle(itemChild)">
										<template slot="title">
											<i :class="item.icon"></i>
											<span :title="itemChild.title">{{itemChild.title}}</span>
										</template>
									</el-menu-item>
								</template>
							</div>
						</el-submenu>
						<el-menu-item v-else>
							<template slot="title">
								<i :class="item.icon"></i>
								<span :title="item.title">{{item.title}}</span>
							</template>
						</el-menu-item>
					</template>
				</el-menu>
			</el-aside>
			<el-container class='home-content'>
				<router-view></router-view>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import HomeHeader from '../components/Header.vue'
	export default {
		name: 'Home',
		components: {
			HomeHeader
		},
		data() {
			return {
				currentIndex: 0,
				activeIndex: '/',
				asideList: [{
						title: '人员信息采集',
						disabled: false,
						icon:'el-icon-user',
						path:'/Index'
					},{
						title: '专项附加扣除信息采集',
						disabled: false,
						icon:'el-icon-menu',
						path:'/'
					},{
						title: '综合所得申报',
						disabled: false,
						icon:'el-icon-pie-chart',
						path:'/'
					},{
						title: '分类所得申报',
						disabled: false,
						icon:'el-icon-pie-chart',
						path:'/'
					},{
						title: '非居民所得申报',
						disabled: false,
						icon:'el-icon-pie-chart',
						path:'/'
					},
					{
						title: '查询统计',
						disabled: false,
						icon:'el-icon-pie-chart',
						path:'/',
						children:[{
								title: '单位申报记录查询',
								disabled: false,
								icon:'el-icon-pie-chart',
								path:'/Company'
							},
							{
								title: '个人扣缴明细查询',
								disabled: false,
								icon:'el-icon-pie-chart',
								path:'/Personal'
							},
							{
								title: '缴税记录查询',
								disabled: false,
								icon:'el-icon-pie-chart',
								path:'/Index'
							}
						]
					},{
						title: '系统设置',
						disabled: false,
						icon:'el-icon-pie-chart',
						path:'/'
					}
				]
			}
		},
		created() {
          
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			changeTitle(item){
				this.activeIndex = item.path;
			}
		}
	}
</script>
<style lang="less" scoped>
	.home-contanier {
		border: 1px solid red;
		position: absolute;
		left: 0;
		right: 0px;
		bottom: 0;
		top: 80px;
		overflow: hidden;
		.home-aside {
			width: 210px !important;
			border-right: 1px solid #e6e6e6;
			/deep/ .el-menu{
				border-right: none;
			}
		}

		.home-content {
			width: 100%;
			background:rgba(244,246,249);
		}
	}
</style>
