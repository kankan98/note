<template>
  <div>
    <div class="title">{{ message }}</div>
    <button>点击</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello Webpack',
    }
  }
};
</script>

<style scoped>
.title{
  color: green;
}
</style>