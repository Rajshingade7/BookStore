<template>
  <footer class="footer">

    <p>Copyright &copy; 2020. Bookstore Private Limited. All rights reserved.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterComponent',
});
</script>

<style scoped>
.footer {
  background-color: black;
  color: white;
  text-align: left;
  padding: 0.2rem 12rem;
}
</style>
