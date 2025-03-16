import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { advancedMerge } from '@/router/router-utils';

const selfRoutes = [
	{
		path: '/',
		component: () => import('@/pages/index.vue'),
		meta: {
			title: '首页',
		},
	},
];

const finalRoutes = advancedMerge(
	routes,
	[...selfRoutes],
	{
		strategy: 'override',
		conflictHandling: 'silent',
		mergeFn: (existing, incoming) => ({
			...existing,
			...incoming,
			meta: { ...existing.meta, ...incoming.meta },
		}),
	},
);
const router = createRouter({
	history: createWebHistory(),
	routes: finalRoutes,
});

console.log('路由数据', finalRoutes);
router.beforeEach(async (to, from, next) => {
	from;
	if (to.meta.title) {
		document.title = `${to.meta.title} - ${ENV.siteName}`;
	}
	next();
});

export default router;
