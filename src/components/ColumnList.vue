<template>
<div class="row">
  <div v-for="column in columnList" :key="column.id" class="col-4 mb-4" >
    <div class="card h-100 shadow-sm">
      <div class="card-body text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3">
        <div class="card-title">
          {{ column.title }}
        </div>
        <div class="card-text text-start">
          {{ column.description }}
        </div>
        <router-link :to="{name: 'column', params: {id: column.id}}" class="btn btn-outline-primary">进入专栏</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.png')
        }
        return column
      })
    })
    return { columnList }
  }
})
</script>
