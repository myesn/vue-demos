<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
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
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="findProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <Cart
      :carts="cartData.carts"
      :total="cartData.total"
      :final_total="cartData.final_total"
      :delItem="status.delingItem"
      @onDelCart="delCart"
      @onApplyCoupon="applyCoupon"
    />

    <Form @onSendOrder="sendOrder" />

    <Details
      :item="product"
      :isLoading="status.loadingItem !== null"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Details from './Details';
import Cart from './Cart';
import Form from './Form';

export default {
  name: 'OrderMock',
  data() {
    return {
      products: [],
      product: {},
      pagination: {},
      status: {
        loadingItem: null, // product id
        delingItem: null, // 正在删除的购物车id
      },
      isLoading: false,
      detailModal: {},
      cartData: {},
    };
  },
  methods: {
    getProducts() {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/products`;

      this.isLoading = true;
      this.$http.get(api).then((response) => {
        const { success, products, pagination, message } = response.data;

        if (success) {
          this.products = products;
          this.pagination = pagination;
        } else {
          this.$bus.$emit(
            'message:push',
            `获取产品列表失败:${message}`,
            'danger'
          );
        }

        this.isLoading = false;
      });
    },
    findProduct(id) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/product/${id}`;

      this.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        const { success, product, message } = response.data;

        if (success) {
          this.product = product;
        } else {
          this.$bus.$emit(
            'message:push',
            `获取产品列表失败:${message}`,
            'danger'
          );
        }

        this.status.loadingItem = null;
        this.openDetailModal();
      });
    },
    addToCart(id, qty = 1) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/cart`;
      const data = {
        product_id: id,
        qty,
      };

      this.status.loadingItem = id;
      this.$http.post(api, { data: data }).then((response) => {
        const { success, data, message } = response.data;

        if (success) {
          this.getCart();
        } else {
          this.$bus.$emit(
            'message:push',
            `获取产品列表失败:${message}`,
            'danger'
          );
        }

        this.status.loadingItem = null;
        this.closeDetailModal();
      });
    },
    getCart() {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/cart`;

      this.isLoading = true;
      this.$http.get(api).then((response) => {
        const { success, data, message } = response.data;

        if (success) {
          this.cartData = data;
        } else {
          this.$bus.$emit(
            'message:push',
            `获取购物车列表失败:${message}`,
            'danger'
          );
        }

        this.isLoading = false;
      });
    },
    delCart(id) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/cart/${id}`;

      this.status.delingItem = id;
      this.$http.delete(api).then((response) => {
        const { success, message } = response.data;

        if (success) {
          this.getCart();
        } else {
          this.$bus.$emit(
            'message:push',
            `删除购物车失败:${message}`,
            'danger'
          );
        }

        this.status.delingItem = null;
      });
    },
    applyCoupon(code) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/coupon`;
      const data = { code: code };

      this.isLoading = true;
      this.$http.post(api, { data: data }).then((response) => {
        const { success, data, message } = response.data;

        if (success) {
          //this.cartData.final_total = data.final_total; // 因为要显示哪些商品套用了优惠券，不能只改价格
          this.getCart();
        } else {
          this.$bus.$emit(
            'message:push',
            `套用优惠券失败:${message}`,
            'danger'
          );
        }

        this.isLoading = false;
      });
    },
    sendOrder(form) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/order`;

      this.isLoading = true;
      this.$http.post(api, { data: form }).then((response) => {
        const { success, total, create_at, orderId, message } = response.data;

        if (success) {
          // this.getCart();
          this.$router.push(`/checkoutmock/${orderId}`);
        } else {
          this.$bus.$emit('message:push', `送出订单失败:${message}`, 'danger');
        }

        this.isLoading = false;
      });
    },
    openDetailModal() {
      this.detailModal.show();
    },
    closeDetailModal() {
      this.detailModal.hide();
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  mounted() {
    this.detailModal = new Modal(document.getElementById('detailModal'), {
      keyboard: false,
    });
  },
  components: {
    Details,
    Cart,
    Form,
  },
};
</script>
