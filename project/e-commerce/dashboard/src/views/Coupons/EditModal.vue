<template>
  <div
    class="modal fade"
    id="editCouponModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ isNew ? '添加优惠券' : '更新优惠券' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- form begin -->
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >标题</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="标题"
              v-model="coupon.title"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label"
              >优惠码</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput2"
              placeholder="优惠码"
              v-model="coupon.code"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label"
              >到期日</label
            >
            <input
              type="date"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="到期日"
              v-model="coupon.due_date"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label"
              >折扣百分比</label
            >
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="折扣百分比"
              v-model="coupon.percent"
            />
          </div>
          <div class="mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="coupon.is_enabled"
              :true-value="1"
              :false-value="0"
            />
            <label class="form-check-label" for="flexCheckDefault">
              是否启用
            </label>
          </div>

          <!-- form end -->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="onEdit">
            {{ isNew ? '添加优惠券' : '更新优惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModal',
  props: {
    isNew: Boolean,
    item: Object,
  },
  data() {
    return {
      coupon: {},
    };
  },
  methods: {
    onEdit() {
      this.$emit('onEdit', {
        ...this.coupon,
        due_date: new Date(this.coupon.due_date).getTime(),
      });
    },
  },
  watch: {
    item(newVal, oldValue) {
      this.coupon = {
        ...newVal,
        due_date: this.$moment(newVal.due_date, 'YYYY-MM-DD'),
      };
    },
  },
};
</script>
