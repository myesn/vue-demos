<template>
  <div class="hello my-3">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/page/">卡片1</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child2">卡片2</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page/child/">卡片3</router-link>
      </li>
      <li class="nav-item">
        <!-- <router-link class="nav-link" to="/page/child/">卡片3</router-link> -->
        <a href="#" class="nav-link" @click.prevent="updatePath">切换到指定页面</a>
      </li>
      <li class="nav-item">
        <!-- <router-link class="nav-link" to="/page/child/">卡片3</router-link> -->
        <a href="#" class="nav-link" @click.prevent="beforePath">回到上一页</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods:{
    updatePath(){
      // this.$router.push('/page/child2'); // 会产生历史记录，可以 back
      this.$router.replace('/page/child2'); // 不会产生历史记录，无法 back
    },
    beforePath(){
      // this.$router.back();
      this.$router.go(-1);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
