<template>
  <div>
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
        >Company name</a
      >
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Narbar',
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
};
</script>
