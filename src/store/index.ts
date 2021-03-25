import { routerKey } from 'vue-router'
import { createStore } from 'vuex'
import { testColumns, testPosts } from './testData'
import { ColumnProps, PostProps } from './types'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testColumns,
    posts: testPosts,
    user: { isLogin: false, name: '', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'viking' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (id: number) => {
      return state.posts.filter(post => post._id === id)
    }
  }
})

export default store
