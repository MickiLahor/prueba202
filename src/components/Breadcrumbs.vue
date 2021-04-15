<template>
  <div class="c-subheader px-3">
    <ol class="breadcrumb border-0 m-0">
      <li class="breadcrumb-item" v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" @click="routeTo(idx)">
        <a v-if="breadcrumb.link" href="#">{{ breadcrumb.name }}</a>
        <span v-else>{{ breadcrumb.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: []
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link)
        this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>

<style scoped>
  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }
</style>