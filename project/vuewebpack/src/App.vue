<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />

    <h1>APP H1</h1>

    <div class="card" style="width: 18rem;">
      <!-- <img src="./assets/login/png" class="card-img-top" alt="..." /> -->
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary" @click.prevent>Go somewhere</a>
      </div>
    </div>

    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
  data() {
    return {
      msg: process.env,
      user: null
    };
  },
  created() {
    this.$http.get('https://randomuser.me/api/').then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
</style>
