import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import usePHP from 'vite-plugin-php';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { imagetools } from 'vite-imagetools';
import { existsSync } from 'node:fs';

import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig(({ command }) => {
	const publicBasePath = '/'; // Change if deploying under a nested public path. Needs to end with a /. See https://vitejs.dev/guide/build.html#public-base-path

	const base = command === 'serve' ? '/' : publicBasePath;
	const BASE = base.substring(0, base.length - 1);

	return {
		base,
		plugins: [
			VueRouter({
				routesFolder: ['src/pages'],
				dts: 'src/typed-router.d.ts',
			}),
			AutoImport({
				imports: [
					'vue',
					{ 'vue-router/auto': ['useRoute', 'useRouter'] },
				],
				dts: 'src/auto-imports.d.ts',
				eslintrc: {
					enabled: true,
				},
				vueTemplate: true,
			}),
			Components({
				dts: 'src/components.d.ts',
				resolvers: [
					IconsResolver({
						prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
						// {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
						// alias: { park: 'icon-park' } 集合的别名
						enabledCollections: ['ep'], // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
					}),
				],
			}),
			vue(),
			Fonts({
				google: {
					families: [{
						name: 'Roboto',
						styles: 'wght@100;300;400;500;700;900',
					}],
				},
			}),
			Icons({
				autoInstall: true,
				compiler: 'vue3',
				scale: 1,
				defaultStyle: '',
				defaultClass: '',
			}),
			imagetools(),
			usePHP({
				entry: [
					'init.php',
					'index.php',
					'.env',
					'php/**/*.php',
				],
				rewriteUrl(requestUrl) {
					const pathname = requestUrl.pathname
					// 排除自动路由请求和 Vite 相关资源
					if (
						pathname.startsWith('/__vue-router/auto-routes') ||
						pathname.startsWith('/@vite/') ||
						pathname.startsWith('/@id/') ||
						pathname.startsWith('/node_modules/')
					) {
						return undefined
					}
					const filePath = fileURLToPath(
						new URL('.' + requestUrl.pathname, import.meta.url),
					);
					const publicFilePath = fileURLToPath(
						new URL(
							'./public' + requestUrl.pathname,
							import.meta.url,
						),
					);

					if (
						!requestUrl.pathname.includes('.php') &&
						(existsSync(filePath) || existsSync(publicFilePath))
					) {
						return undefined;
					}

					requestUrl.pathname = 'index.php';

					return requestUrl;
				},
			}),
			ViteEjsPlugin({
				BASE,
			}),
			viteStaticCopy({
				targets: [
					{ src: 'public', dest: '' },
					{ src: 'system', dest: '' },
					{ src: 'configs', dest: '', overwrite: false },
					{ src: 'vendor', dest: '' },
				],
				silent: command === 'serve',
			}),
		],
		define: {
			'BASE': JSON.stringify(BASE),
			'import.meta.env.BASE': JSON.stringify(BASE),
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src/', import.meta.url)),
			},
			extensions: [
				'.js',
				'.json',
				'.jsx',
				'.mjs',
				'.ts',
				'.tsx',
				'.vue',
			],
		},
		publicDir: command === 'build' ? 'raw' : 'public',
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
		server: {
			port: 3000,
		},
		build: {
			assetsDir: 'public',
			emptyOutDir: true,
		},
	};
});
