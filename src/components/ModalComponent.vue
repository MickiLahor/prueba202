<template>
  <transition name="modal">
    <div class="modal-backdrop" v-show="show" @click="close" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-primary" role="document">
        <div class="modal-content" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, required: true },
  },
  mounted: function () {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>

.modal-backdrop {
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-content {
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>