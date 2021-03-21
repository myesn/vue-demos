import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// message(String): 消息内容
// status(String): Alert 的样式（参考 bootstrap alert-{status})
// this.$bus.$emit('message:push', message, status)