<template>
  <div id="app" class="container">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="準備要做的任務"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTodo">
          新增
        </button>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility === 'all' }"
              @click="visibility = 'all'"
              href="#"
              >全部</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility === 'active' }"
              @click="visibility = 'active'"
              href="#"
              >進行中</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility === 'completed' }"
              @click="visibility = 'completed'"
              href="#"
              >已完成</a
            >
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush text-left">
        <li
          class="list-group-item"
          v-for="(item, key) in filteredTodos"
          @dblclick="editTodo(item)"
          :key="key"
        >
          <div class="d-flex" v-if="item.id !== cacheTodo.id">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="item.completed"
                :id="item.id"
              />
              <label
                class="form-check-label"
                :class="{ completed: item.completed }"
                :for="item.id"
              >
                {{ item.title }}
              </label>
            </div>
            <button
              type="button"
              class="close ml-auto"
              @click="removeTodo(item)"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <input
            type="text"
            class="form-control"
            v-model="cacheTitle"
            @keyup.esc="cancelEdit"
            @keyup.enter="doneEdit(item)"
            v-if="item.id === cacheTodo.id"
          />
        </li>
        <!-- <li class="list-group-item">
        <div class="d-flex">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="a1">
            <label class="form-check-label completed" for="a1">
              Cras justo odio
            </label>
          </div>
          <button type="button" class="close ml-auto" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </li> -->
        <!-- <li class="list-group-item">
        <input type="text" class="form-control">
      </li> -->
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span v-if="undoneTodoCount > 0"
          >還有 {{ undoneTodoCount }} 筆任務未完成</span
        >
        <span v-else>恭喜你，已完成全部任务</span>
        <a href="#" @click.prevent="todos = []">清除所有任務</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [{ id: 'fdsa', title: 'hello', completed: false }],
      cacheTodo: {},
      cacheTitle: '',
      visibility: 'all',
    };
  },
  methods: {
    addTodo: function () {
      var value = this.newTodo.trim();
      var timestamp = Math.floor(Date.now());
      if (!value) {
        return;
      }

      this.todos.push({
        id: timestamp,
        title: value,
        completed: false,
      });
      this.newTodo = '';
    },
    removeTodo: function (todo) {
      var vm = this;
      var newIndex = vm.todos.findIndex((item) => todo.id === item.id);
      this.todos.splice(newIndex, 1);
    },
    editTodo: function (item) {
      console.log(item);
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function () {
      this.cacheTodo = {};
    },
    doneEdit: function (item) {
      item.title = this.cacheTitle;
      this.cacheTitle = '';
      this.cacheTodo = {};
    },
  },
  computed: {
    filteredTodos: function () {
      if (this.visibility === 'all') {
        return this.todos;
      } else if (this.visibility === 'active') {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.visibility === 'completed') {
        return this.todos.filter((todo) => todo.completed);
      }

      return [];
    },
    undoneTodoCount: function () {
      return this.todos.filter((todo) => !todo.completed).length;
    },
  },
};
</script>

<style>
@import url(./css/all.css);

.completed {
  text-decoration: line-through;
}
</style>
