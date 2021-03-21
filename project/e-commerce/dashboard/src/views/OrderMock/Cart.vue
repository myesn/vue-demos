<template>
  <div class="mt-4 container">
    <table class="table">
      <thead>
        <th></th>
        <th>品名</th>
        <th>数量</th>
        <th>单价</th>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="delCart(item.id)"
            >
              <i data-feather="trash-2"></i>
              <i class="fas fa-spinner fa-spin" v-if="delItem === item.id"></i>
            </button>
          </td>
          <td>
            <span>{{ item.product.title }}</span>
            <br />
            <span class="text-success" v-if="item.coupon != null"
              >已套用优惠券</span
            >
          </td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td>{{ item.product.price }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end">总计</td>
          <td class="text-end">{{ total }}</td>
        </tr>
        <tr class="text-success" v-if="final_total !== total">
          <td colspan="3" class="text-end">折扣价</td>
          <td class="text-end">{{ final_total }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 套用优惠券 -->
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="请输入优惠码"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        v-model="code"
      />
      <button class="btn btn-outline-secondary" @click="applyCoupon">
        套用优惠码
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    carts: Array,
    total: Number,
    final_total: Number,
    delItem: String,
  },
  data() {
    return {
      code: '',
    };
  },
  methods: {
    delCart(id) {
      this.$emit('onDelCart', id);
    },
    applyCoupon() {
      this.$emit('onApplyCoupon', this.code);
      this.code = '';
    },
  },
};
</script>

<style scoped>
.container {
  width: 600px;
  margin: 0 auto;
}
</style>
