import { extend, configure, localize } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';

extend('required', required);

extend('email', email);

extend('mobile', {
  validate: (value) => /^1[3-9]\d{9}$/.test(value),
  message: '{_field_}格式错误',
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

localize('zh_CN', zh_CN);
