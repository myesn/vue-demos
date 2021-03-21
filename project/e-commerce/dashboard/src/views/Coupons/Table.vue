<template>
  <table class="table mt-4">
    <thead>
      <th>名称</th>
      <th>折扣百分比</th>
      <th>到期日</th>
      <th>是否启用</th>
      <th>编辑</th>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent + '%' }}</td>
        <td>{{ item.due_date | moment('YYYY/MM/DD') }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">启用</span>
          <span v-else>未启用</span>
        </td>
        <td>
          <button class="btn btn-outline-primary me-1" @click="onOpenEdit(item)">
            编辑
          </button>
          <button class="btn btn-outline-danger" @click="onOpenDel(item)">
            删除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    coupons: Array,
  },
  methods: {
    onOpenEdit(item) {
      this.$emit('onOpenEdit', false, item);
    },
    onOpenDel(item) {
      this.$emit('onOpenDel', item);
    },
  },
};
</script>
