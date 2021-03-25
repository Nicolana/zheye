<template>
<div class="validate-input-container pb-3">
  <input type="text"
    v-if="tag!=='textarea'"
    class="form-control"
    :value="inputRef.val"
    :class="{'is-invalid': inputRef.error}"
    @blur="validateInput"
    @input="updateValue"
    v-bind="$attrs"
  />
  <textarea type="text"
    v-else
    class="form-control"
    :value="inputRef.val"
    :class="{'is-invalid': inputRef.error}"
    @blur="validateInput"
    @input="updateValue"
    v-bind="$attrs"
   />
  <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/

interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = !(inputRef.val.trim() === '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return { inputRef, validateInput, updateValue }
  }
})
</script>
