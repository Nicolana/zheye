<template>
  <div>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/types'

export default defineComponent({
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => {
      return store.state.posts
    })
    return {
      list: testData
    }
  }
})
</script>
