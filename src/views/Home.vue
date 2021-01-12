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
											<!-- <i :class="item.icon"></i> -->
											<span @click="changeTitle(itemChild)" :title="itemChild.title">{{itemChild.title}}</span>
										</template>
									</el-submenu>

									<el-menu-item v-else :index="itemChild.path" :key="itemChild.path" @click="changeTitle(itemChild)">
										<template slot="title">
											<!-- <i :class="item.icon"></i> -->
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
				activeIndex: '/Index',
				asideList: [{
						title: '人员信息采集',
						disabled: false,
						icon:'icon1',
						path:'/Index'
					},{
						title: '专项附加扣除信息采集',
						disabled: false,
						icon:'icon2',
						path:'/'
					},{
						title: '综合所得申报',
						disabled: false,
						icon:'icon3',
						path:'/'
					},{
						title: '分类所得申报',
						disabled: false,
						icon:'icon4',
						path:'/'
					},{
						title: '非居民所得申报',
						disabled: false,
						icon:'icon5',
						path:'/'
					},{
						title: '限售股所得申报',
						disabled: false,
						icon:'icon6',
						path:'/'
					},{
						title: '税款缴纳',
						disabled: false,
						icon:'icon7',
						path:'/'
					},{
						title: '退付手续费核对',
						disabled: false,
						icon:'icon8',
						path:'/'
					},{
						title: '优惠备案',
						disabled: false,
						icon:'icon9',
						path:'/'
					},
					{
						title: '查询统计',
						disabled: false,
						icon:'icon10',
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
						icon:'icon11',
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
		border: 0px solid red;
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
				.icon1{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon1.png) no-repeat center center;
				}
				.icon2{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon2.png) no-repeat center center;
				}
				.icon3{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon3.png) no-repeat center center;
				}
				.icon4{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon4.png) no-repeat center center;
				}
				.icon5{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon5.png) no-repeat center center;
				}
				.icon6{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon6.png) no-repeat center center;
				}
				.icon7{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon7.png) no-repeat center center;
				}
				.icon8{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon8.png) no-repeat center center;
				}
				.icon9{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon9.png) no-repeat center center;
				}
				.icon10{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon10.png) no-repeat center center;
				}
				.icon11{
					width: 18px;
					height: 18px;
					margin-right: 8px;
					display: inline-block;
					background: url(../assets/aside/icon11.png) no-repeat center center;
				}
			}
		}

		.home-content {
			width: 100%;
			background:rgba(244,246,249);
		}
	}
</style>
