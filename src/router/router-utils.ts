import { RouteRecordRaw } from 'vue-router';

interface MergeOptions {
	/**
	 * 合并策略：
	 * - override: 自定义路由覆盖自动路由
	 * - prepend: 自定义路由插入到前面
	 * - append: 自定义路由追加到后面
	 * - smart: 智能合并（根据路径层级）
	 */
	strategy?: 'override' | 'prepend' | 'append' | 'smart';
	/**
	 * 冲突处理方式：
	 * - warn: 显示警告但继续
	 * - throw: 抛出错误
	 * - silent: 静默处理
	 */
	conflictHandling?: 'warn' | 'throw' | 'silent';
	/**
	 * 自定义合并函数
	 */
	mergeFn?: (existing: RouteRecordRaw, incoming: RouteRecordRaw) => any;
}

export function advancedMerge(
	autoRoutes: RouteRecordRaw[],
	customRoutes: RouteRecordRaw[],
	options: MergeOptions = {},
): RouteRecordRaw[] {
	const {
		strategy = 'override',
		conflictHandling = 'warn',
		mergeFn = (existing, incoming) => ({ ...existing, ...incoming }),
	} = options;

	const routeMap = new Map<string, RouteRecordRaw>();

	const process = (routes: RouteRecordRaw[], isAuto = true) => {
		routes.forEach(route => {
			const key = route.path;
			const existing = routeMap.get(key);

			if (existing) {
				if (conflictHandling === 'warn') {
					console.warn(`路由冲突: ${key}`, {
						existing,
						incoming: route,
					});
				} else if (conflictHandling === 'throw') {
					throw new Error(`路由路径冲突: ${key}`);
				}

				if (strategy === 'override') {
					routeMap.set(key, mergeFn(existing, route));
				}
			} else {
				routeMap.set(key, route);
			}

			if (route.children) {
				route.children = advancedMerge(
					isAuto ? route.children : [],
					isAuto ? [] : route.children,
					options,
				);
			}
		});
	};

	// 根据策略决定处理顺序
	switch (strategy) {
		case 'prepend':
			process(customRoutes, false);
			process(autoRoutes);
			break;
		case 'append':
			process(autoRoutes);
			process(customRoutes, false);
			break;
		case 'smart':
			// 智能合并逻辑（可根据路径深度排序）
			const allRoutes = [...autoRoutes, ...customRoutes]
				.sort((a, b) => b.path.split('/').length - a.path.split('/').length);
			process(allRoutes);
			break;
		default:
			process(autoRoutes);
			process(customRoutes, false);
	}

	return Array.from(routeMap.values());
}
