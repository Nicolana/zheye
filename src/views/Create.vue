<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">文章标题: </label>
      <validate-input
      type="text"
      placeholder="请输入文章标题"
      v-model="titleVal"
      :rules="titleRules"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">文章详情: </label>
      <validate-input
      type="text"
      tag="textarea"
      rows="10"
      placeholder="请输入文章详情"
      :rules="contentRules"
      v-model="contentVal"
      ></validate-input>
    </div>
    <template #submit>
      <button class="btn btn-primary btn-large">发表文章</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { GlobalDataProps, PostProps } from '../store/types'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '请输入文章标题' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '请输入文章详情' }
    ]
    const router = useRouter()
    const store = useStore<GlobalDataProps>()

    const onFormSubmit = (result: boolean | undefined) => {
      if (result as boolean && result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }

    return {
      titleVal,
      contentVal,
      contentRules,
      titleRules,
      onFormSubmit
    }
  }
})
</script>
