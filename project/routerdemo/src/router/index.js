import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';

Vue.use(VueRouter);

export default new VueRouter({
  // mode: 'history', // history 需要前后端都支持
  // base: '/admin/',
  linkActiveClass: 'active',
  routes: [
    {
      name: '首页', // 组件呈现的名称
      path: '/', // 对应的虚拟路径
      component: Home, // 对应的组件
    },
    {
      // name: '分页', // 组件呈现的名称
      path: '/page', // 对应的虚拟路径
      component: Page, // 对应的组件
      components: {
        default: Page,
        menu: Menu,
      },
      children: [
        {
          name: '卡片1', // 组件呈现的名称
          path: '', // 对应的虚拟路径
          component: child, // 对应的组件
        },
        {
          name: '卡片2', // 组件呈现的名称
          path: 'child2', // 对应的虚拟路径
          component: child2, // 对应的组件
        },
        {
          name: '卡片3', // 组件呈现的名称
          path: 'child/', // 对应的虚拟路径
          component: child3, // 对应的组件
        },
      ],
    },
  ],
});
