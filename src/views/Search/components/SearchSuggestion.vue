<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      :title="item"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',

  data () {
    return {
      suggestions: []
    }
  },

  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },

  methods: {
    // 发起请求获取搜索建议
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },

  computed: {
    // 搜索建议关键字高亮
    highLightSuggestions () {
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  }
}
</script>

<style scoped></style>
