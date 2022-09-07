<template>
  <div>
    <router-view></router-view>
    <h1>
      {{ count }}
    </h1>
    <h1>{{ bigNum }}</h1>
    <button @click="SET_COUNT(3.14)">++</button>
  </div>
</template>

<script>
// 1、下载vant
// 2、main引入组件和css
// 3、让rem动起来

// mapState 将 vuex 的 state 的数据映射到 computed
// mapMutations 将 vuex 的 mutations 的数据映射到 methods

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    // increment () {
    //   this.$store.commit('SET_COUNT', 100)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
