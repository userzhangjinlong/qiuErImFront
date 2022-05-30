<template>
<nut-form :model-value="formData" ref="ruleForm">
  <nut-form-item label="手机号" prop="tel" required :rules="[
      { required: true, message: '请填写手机号' },
      { validator: asyncValidator, message: '手机号不正确' }
    ]">
    <input class="nut-input-text" v-model="formData.tel" placeholder="请输入手机号码" type="text" />
  </nut-form-item>
  <nut-form-item label="密码" prop="password" required :rules="[{ required: true, message: '请填写密码' }]">
    <input class="nut-input-text" v-model="formData.password" placeholder="请输入密码" type="password" />
  </nut-form-item>
  <nut-cell>
    <nut-button type="primary" size="large" style="margin-right: 10px" @click="submit">提交</nut-button>
  </nut-cell>
</nut-form>
</template>
<script lang="ts">
import { ref,reactive } from 'vue';
import { Toast } from '@nutui/nutui';
import { Login } from '../../http/api';// 导入我们的api接口
import router from '../../router';
export default {
setup(){
    const formData = reactive({
        tel: '',
        password: ''
    });
    const validate = (item: any) => {
        console.log(item);
    };
    const ruleForm = ref<any>(null);

    const submit = () => {
      ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          Login({
              "username":formData.tel,
              "password":formData.password
          }).then(data => {
              //保存登陆信息
              console.log(data)
              localStorage.setItem('userInfo', JSON.stringify(data))
              router.push("/")
          }).catch(error=>{
            if(error) {
              Toast.text(error)
            }
          })
          
          console.log('success', formData);
        } else {
          console.log('error submit!!', errors);
        }
      });
    };
    const reset = () => {
      ruleForm.value.reset();
    };
    // 失去焦点校验
    const customBlurValidate = (prop: string) => {
      ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success', formData);
        } else {
          console.log('error submit!!', errors);
        }
      });
    };
    // 函数校验
    const customValidator = (val: string) => /^\d+$/.test(val);
    // Promise 异步校验
    const asyncValidator = (val: string) => {
      return new Promise((resolve) => {
        //请求登陆
        Toast.loading('模拟异步验证中...');
        setTimeout(() => {
          Toast.hide();
          resolve(/^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val));
        }, 1000);
      });
    };
    return { ruleForm, formData, validate, customValidator, asyncValidator, customBlurValidate, submit, reset };
}
}
</script>
