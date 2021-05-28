<template>
  <Sidebar/>
  <div class="c-wrapper c-fixed-components">
    <Header/>
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
  import Sidebar from "../../components/Sidebar.vue";
  import Header from "../../components/Header.vue";
  import Footer from "../../components/Footer.vue";

  export default {
    components: {
      Sidebar,
      Header,
      Footer
    }
  };
</script>