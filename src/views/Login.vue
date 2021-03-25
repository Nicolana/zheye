<template>
<div class="form-wrap">
  <validate-form @form-submit="onFormSubmit">
    <validate-input type="text" v-model="emailVal" :rules="emailRules" placeholder="请输入电子邮件"></validate-input>
    <validate-input v-model="passwordVal" :rules="passwordRules" placeholder="请输入密码"></validate-input>
    <template #submit>
      <div class="btn btn-primary w-100">登录</div>
    </template>
  </validate-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'

export default defineComponent({
  components: { ValidateForm, ValidateInput },
  setup () {
    const router = useRouter()
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    const onFormSubmit = (result: boolean | undefined) => {
      if (result as boolean && result) {
        router.push({ name: 'column', params: { id: 1213 } })
      }
    }
    return {
      emailVal,
      passwordVal,
      emailRules,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
.form-wrap {
  width: 1000px;
  margin: 0 auto;
}
</style>
