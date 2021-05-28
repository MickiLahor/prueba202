<template>
  <div class="c-wrapper c-fixed-components">
    <HeaderPublic/>
    <div class="c-body">
      <main class="c-main">
        <div class="container-fluid">
          <div class="fade-in">
            <router-view/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  </div>
</template>

<script>
  import HeaderPublic from "../../components/HeaderPublic.vue";
  import Footer from "../../components/Footer.vue";

  export default {
    components: {
      HeaderPublic,
      Footer
    }
  };
</script>