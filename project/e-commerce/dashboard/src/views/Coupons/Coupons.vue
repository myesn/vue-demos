<template>
  <div>
    <div class="mt-4 text-end">
      <button class="btn btn-primary" @click="openEditModal(true)">
        添加新的优惠券
      </button>
    </div>
    <loading :active.sync="isLoading"></loading>
    <Table
      :coupons="coupons"
      @onOpenEdit="openEditModal"
      @onOpenDel="openDelModal"
    />
    <Pagination
      :has_pre="pagination.has_pre"
      :has_next="pagination.has_next"
      :total_pages="pagination.total_pages"
      :current_page="pagination.current_page"
      @onChange="getCoupons"
    />

    <EditModal :isNew="isNew" :item="coupon" @onEdit="editCoupon" />
    <DelModal :item="coupon" @onDel="delCoupon" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

import Pagination from '@/components/Pagination';
import Table from './Table';
import EditModal from './EditModal';
import DelModal from './DelModal';

export default {
  name: 'Coupons',
  data() {
    return {
      isLoading: false,
      coupons: [],
      isNew: false,
      coupon: {},
      pagination: {},
      modal: {
        edit: {},
        del: {},
      },
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/coupons?page=${page}`;

      this.isLoading = true;
      this.$http.get(api).then((response) => {
        const { success, coupons, pagination, message } = response.data;

        if (success) {
          this.coupons = coupons;
          this.pagination = pagination;
        } else {
          this.$bus.$emit(
            'message:push',
            `获取优惠券失败:${message}`,
            'danger'
          );
        }

        this.isLoading = false;
      });
    },
    editCoupon(coupon) {
      let api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/coupon`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/coupon/${this.coupon.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, { data: coupon }).then((response) => {
        const { success, message } = response.data;

        if (success) {
          this.closeEditModal();
          this.getCoupons();
        } else {
          this.$bus.$emit(
            'message:push',
            `${this.isNew ? '创建' : '更新'}失败:${message}`
          );
        }
      });
    },
    delCoupon(item) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/coupon/${item.id}`;

      this.$http.delete(api).then((response) => {
        const { success, message } = response.data;

        if (success) {
          this.closeDelModal();
          this.getCoupons();
        } else {
          this.$bus.$emit('message:push', `删除失败:${message}`);
        }
      });
    },
    openEditModal(isNew, item = {}) {
      this.isNew = isNew;
      this.coupon = item;

      this.modal.edit.show();
    },
    closeEditModal() {
      this.modal.edit.hide();
    },
    openDelModal(item) {
      this.coupon = item;
      this.modal.del.show();
    },
    closeDelModal() {
      this.modal.del.hide();
    },
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    this.modal.edit = new Modal(document.getElementById('editCouponModal'), {
      keyboard: false,
    });

    this.modal.del = new Modal(document.getElementById('delCouponModal'), {
      keyboard: false,
    });
  },
  components: {
    Pagination,
    Table,
    EditModal,
    DelModal,
  },
};
</script>
