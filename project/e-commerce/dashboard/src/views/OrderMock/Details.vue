<template>
  <div
    class="modal fade"
    id="detailModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ item.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <span
            class="badge badge-secondary float-right ml-2"
            style="color:black"
            >{{ item.category }}</span
          >
          <h5 class="card-title">
            <a href="#" class="text-dark">{{ item.title }}</a>
          </h5>
          <p class="card-text">{{ item.content }}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="!item.price">
              {{ item.origin_price | currency }} 元
            </div>
            <del class="h6" v-if="item.price"
              >原價 {{ item.origin_price | currency }} 元</del
            >
            <div class="h5" v-if="item.price">
              現在只要 {{ item.price | currency }} 元
            </div>
          </div>
          <select class="form-control mr-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num"
              >选取 {{ num }} {{ product.unit }}</option
            >
          </select>
        </div>
        <div class="modal-footer">
          <div class="text-muted text-nowrap-mr-3">
            小计 <strong>{{ product.num * product.price }}</strong> 元
          </div>
          <button type="button" class="btn btn-primary" @click="addToCart">
            <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
            加到购物车
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  props: {
    item: Object,
    isLoading: Boolean,
  },
  data() {
    return {
      product: { ...this.item },
    };
  },
  methods: {
    addToCart() {
      const { id, num } = this.product;

      this.$emit('addToCart', id, num);
    },
  },
  watch: {
    item(newVal, oldVal) {
      this.product = { ...this.item };
    },
  },
};
</script>
