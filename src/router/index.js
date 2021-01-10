import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Home',
	component: () => import('../views/Home.vue'),
	children: [{
			path: '/Index',
			name: 'Index',
			component: () => import('../views/Index/Index.vue'),
		},
		{
			path: '/Personal',
			name: 'Personal',
			component: () => import('../views/Personal/Personal.vue'),
		}, {
			path: '/Company',
			name: 'Company',
			component: () => import('../views/Company/Company.vue'),
		}
	]
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
