<template>
  <ValidationObserver
    v-slot="{ invalid, handleSubmit }"
    ref="form"
    tag="div"
    class="my-5 row justify-content-center"
  >
    <form class="col-md-6" @submit.prevent="handleSubmit(sendOrder)">
      <ValidationProvider
        immediate
        name="Email"
        rules="required|email"
        v-slot="{ errors, classes }"
        tag="div"
        class="form-group"
      >
        <label for="useremail">Email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="useremail"
          v-model="form.user.email"
          placeholder="請輸入 Email"
          :class="classes"
        />
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        immediate
        name="姓名"
        rules="required"
        v-slot="{ errors, classes }"
        tag="div"
        class="form-group"
      >
        <label for="username">收件人姓名</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="username"
          v-model="form.user.name"
          placeholder="輸入姓名"
          :class="classes"
        />
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        immediate
        name="收件人电话"
        rules="required|mobile"
        v-slot="{ errors, classes }"
        tag="div"
        class="form-group"
      >
        <label for="usertel">收件人電話</label>
        <input
          type="tel"
          class="form-control"
          id="usertel"
          v-model="form.user.tel"
          placeholder="請輸入電話"
          :class="classes"
        />
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        immediate
        name="收件人地址"
        rules="required"
        v-slot="{ errors, classes }"
        tag="div"
        class="form-group"
      >
        <label for="useraddress">收件人地址</label>
        <input
          type="text"
          class="form-control"
          name="address"
          id="useraddress"
          v-model="form.user.address"
          placeholder="請輸入地址"
          :class="classes"
        />
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        immediate
        name="留言"
        rules="required"
        v-slot="{ errors, classes }"
        tag="div"
        class="form-group"
      >
        <label for="comment">留言</label>
        <textarea
          name=""
          id="comment"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
          :class="classes"
        ></textarea>
        <span class="invalid-feedback">{{ errors[0] }}</span>
      </ValidationProvider>

      <div class="text-right mt-2">
        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './validation';

export default {
  name: 'Form',
  data() {
    return {
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    sendOrder() {
      // this.$refs.form.validate().then(success => {
      //   if (!success) {
      //     return;
      //   }

      //   alert('Form has been submitted!');

      //   // Resetting Values
      //   this.firstName = this.lastName = this.email = '';

      //   // Wait until the models are updated in the UI
      //   this.$nextTick(() => {
      //     this.$refs.form.reset();
      //   });
      // });

      this.$emit('onSendOrder', this.form);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      };
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
