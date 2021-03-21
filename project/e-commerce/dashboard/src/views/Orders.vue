<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th>购买时间</th>
        <th>Email</th>
        <th>购买款项</th>
        <th>应付金额</th>
        <th>是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.paid_date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <div v-for="p in item.products" :key="p.id">
              <span class="me-2">{{ p.product.title }}</span>
              <span>{{ p.qty }}/{{ p.product.unit }}</span>
            </div>
          </td>
          <td>{{ item.total }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :has_pre="pagination.has_pre"
      :has_next="pagination.has_next"
      :total_pages="pagination.total_pages"
      :current_page="pagination.current_page"
      @onChange="getOrders"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'Orders',
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/orders?page=${page}`;

      this.isLoading = true;
      this.$http.get(api).then((response) => {
        const { success, orders, pagination, message } = response.data;

        if (success) {
          this.orders = orders;
          this.pagination = pagination;
        } else {
          this.$bus.$emit('message:push', `获取订单失败:${message}`, 'danger');
        }

        this.isLoading = false;
      });
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
};
</script>
