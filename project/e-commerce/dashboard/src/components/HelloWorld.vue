<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    signout() {
      const api = `${this.API_ENDPOINT}/logout`;

      this.$http.post(api).then((response) => {
        const { success } = response.data;
        if (success) {
          document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          this.$router.push('/login');
        }
      });
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    console.log('add token to axios header', token);
    this.$http.defaults.headers.common['Authorization'] = token;
  },
};
</script>
