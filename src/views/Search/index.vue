<template>
  <!--  搜索框-->
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        class="search"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/')"
        @focus="isShowSearchResult = false"
        @search="onSearch"
      />
    </form>
    <!--    搜索历史/建议/结果-->
    <!--    <search-history></search-history>-->
    <!--    <search-suggestion></search-suggestion>-->
    <!--    <search-result></search-result>-->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion'
import SearchResult from './components/SearchResult'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Search',

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },

  data () {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },

  computed: {
    ...mapState(['histories']),
    componentName () {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },

  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch (keywords) {
      // 去重：获取没有去重的数组 arr 放在set=newSet(arr) [...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role="button"] {
    color: white;
  }
}

:deep(.van-search__action) {
  &:active {
    background-color: #4f94f2 !important;
  }
}
</style>
