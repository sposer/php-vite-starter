<template>
	<div class="animated-gradient-background"></div>
	<router-view />
</template>

<script setup>
</script>

<style>
body {
	margin: 0;
	padding: 0;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	overflow-x: hidden;
}

.animated-gradient-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
