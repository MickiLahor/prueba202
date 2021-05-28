<template>
	<div class="container">
		<router-view/>
	</div>
</template>

<script>
	export default {
		mounted() {
			document.getElementById("app").classList.add("flex-row", "align-items-center");
		},
		unmounted() {
			document.getElementById("app").classList.remove("flex-row", "align-items-center");
		}
	};
</script>