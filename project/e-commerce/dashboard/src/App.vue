<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/products`;
    // this.$http.get(api).then((response) => {
    //   console.log(response.data);
    // });

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    console.log('add token to axios header', token);
    this.$http.defaults.headers.common['Authorization'] = token;
  },
};
</script>

<style lang="scss">
@import './assets/all';
</style>
