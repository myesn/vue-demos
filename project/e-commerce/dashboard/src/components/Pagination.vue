<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="onChange(current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in total_pages"
        :key="page"
        :class="{ active: page === current_page }"
      >
        <a class="page-link" href="#" @click.prevent="onChange(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="onChange(current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    has_pre: Boolean,
    has_next: Boolean,
    total_pages: Number,
    current_page: Number,
  },
  methods: {
    onChange(page) {
      this.$emit('onChange', page);
    },
  },
};
</script>
