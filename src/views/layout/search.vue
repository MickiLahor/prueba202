<template>
  <div class="c-wrapper c-fixed-components">
    <Header></Header>
    <div class="c-body">
      <main class="c-main">
        <div class="container-fluid">
          <div class="fade-in">
            <router-view></router-view>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/Header.vue";
  import Footer from "../../components/Footer.vue";

  export default {
    components: {
      Header,
      Footer
    }
  };
</script>