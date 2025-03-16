<template>
	<div class="dashboard-page">
		<div class="content-container">
			<el-card class="welcome-card">
				<h1>PHP+Vite+Vue3</h1>
				<p class="subtitle">
					这里是项目管理仪表盘，一目了然地查看所有项目状态（假装）</p>
			</el-card>

			<el-card class="projects-card">
				<template #header>
					<div class="card-header">
						<h2>项目概览</h2>
						<el-button type="primary" round>
							<el-icon class="mr-1">
								<IconEpPlus />
							</el-icon>
							新建项目
						</el-button>
					</div>
				</template>

				<div class="projects-grid">
					<el-card
						v-for="project in projects"
						:key="project.id"
						class="project-item"
						:body-style="{ padding: '0px' }"
						shadow="hover"
					>
						<div class="project-header"
							 :class="getStatusClass(project.status)">
							<span class="project-status">{{ project.status
								}}</span>
						</div>
						<div class="project-content">
							<h3>{{ project.name }}</h3>
							<p class="project-date">创建于: {{ project.date
								}}</p>
							<div class="project-actions">
								<el-button type="primary" text>查看详情
								</el-button>
								<el-button type="info" text>编辑</el-button>
							</div>
						</div>
					</el-card>
				</div>
			</el-card>

			<el-card class="stats-card">
				<template #header>
					<div class="card-header">
						<h2>数据统计</h2>
					</div>
				</template>

				<div class="stats-grid">
					<div class="stat-item">
						<div class="stat-icon completed">
							<el-icon>
								<IconEpCheck />
							</el-icon>
						</div>
						<div class="stat-info">
							<span class="stat-value">2</span>
							<span class="stat-label">已完成</span>
						</div>
					</div>

					<div class="stat-item">
						<div class="stat-icon in-progress">
							<el-icon>
								<IconEpLoading />
							</el-icon>
						</div>
						<div class="stat-info">
							<span class="stat-value">2</span>
							<span class="stat-label">进行中</span>
						</div>
					</div>

					<div class="stat-item">
						<div class="stat-icon pending">
							<el-icon>
								<IconEpClock />
							</el-icon>
						</div>
						<div class="stat-info">
							<span class="stat-value">2</span>
							<span class="stat-label">待处理</span>
						</div>
					</div>

					<div class="stat-item">
						<div class="stat-icon total">
							<el-icon>
								<IconEpCollection />
							</el-icon>
						</div>
						<div class="stat-info">
							<span class="stat-value">6</span>
							<span class="stat-label">总项目</span>
						</div>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// 项目数据（硬编码）
const projects = ref([
	{ id: 1, name: '企业官网重设计', date: '2023-03-10', status: '进行中' },
	{ id: 2, name: '移动应用开发', date: '2023-02-22', status: '已完成' },
	{ id: 3, name: '数据库迁移方案', date: '2023-04-05', status: '待处理' },
	{ id: 4, name: 'API集成服务', date: '2023-03-18', status: '进行中' },
	{ id: 5, name: '安全审计系统', date: '2023-04-12', status: '待处理' },
	{ id: 6, name: '电子商务平台', date: '2023-01-15', status: '已完成' },
]);

// 获取状态类名
const getStatusClass = (status) => {
	switch (status) {
		case '已完成':
			return 'status-completed';
		case '进行中':
			return 'status-in-progress';
		case '待处理':
			return 'status-pending';
		default:
			return '';
	}
};
</script>

<style scoped>
.dashboard-page {
	min-height: 100vh;
	padding: 2rem;
	display: flex;
	justify-content: center;
}

.content-container {
	max-width: 1200px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.welcome-card {
	background-color: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	border: none;
	border-radius: 12px;
	text-align: center;
	padding: 2rem;
}

.projects-card, .stats-card {
	background-color: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	border: none;
	border-radius: 12px;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 {
	font-size: 2.5rem;
	margin: 0;
	color: #333;
	font-weight: 600;
}

h2 {
	font-size: 1.5rem;
	margin: 0;
	color: #333;
	font-weight: 500;
}

h3 {
	font-size: 1.2rem;
	margin: 0 0 0.5rem 0;
	color: #333;
}

.subtitle {
	font-size: 1.2rem;
	color: #666;
	margin-top: 0.5rem;
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1.5rem;
	margin-top: 1rem;
}

.project-item {
	border-radius: 8px;
	overflow: hidden;
	transition: transform 0.3s ease;
}

.project-item:hover {
	transform: translateY(-5px);
}

.project-header {
	padding: 0.5rem 1rem;
	color: white;
	font-weight: 500;
}

.status-completed {
	background: linear-gradient(135deg, #4caf50, #2e7d32);
}

.status-in-progress {
	background: linear-gradient(135deg, #ff9800, #e65100);
}

.status-pending {
	background: linear-gradient(135deg, #2196f3, #0d47a1);
}

.project-content {
	padding: 1rem;
}

.project-date {
	color: #666;
	font-size: 0.9rem;
	margin-bottom: 1rem;
}

.project-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1.5rem;
	padding: 1rem;
}

.stat-item {
	display: flex;
	align-items: center;
	padding: 1rem;
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 8px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.stat-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 1rem;
	color: white;
	font-size: 1.5rem;
}

.completed {
	background: linear-gradient(135deg, #4caf50, #2e7d32);
}

.in-progress {
	background: linear-gradient(135deg, #ff9800, #e65100);
}

.pending {
	background: linear-gradient(135deg, #2196f3, #0d47a1);
}

.total {
	background: linear-gradient(135deg, #9c27b0, #4a148c);
}

.stat-info {
	display: flex;
	flex-direction: column;
}

.stat-value {
	font-size: 1.5rem;
	font-weight: 600;
	color: #333;
}

.stat-label {
	font-size: 0.9rem;
	color: #666;
}

.mr-1 {
	margin-right: 4px;
}

@media (max-width: 768px) {
	.dashboard-page {
		padding: 1rem;
	}

	.projects-grid {
		grid-template-columns: 1fr;
	}

	.stats-grid {
		grid-template-columns: 1fr 1fr;
	}

	h1 {
		font-size: 2rem;
	}
}

@media (max-width: 480px) {
	.stats-grid {
		grid-template-columns: 1fr;
	}
}
</style>
