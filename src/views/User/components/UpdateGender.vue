<template>
  <div>
    <van-picker
      :columns="columns"
      :default-index="0"
      show-toolbar
      title="选择性别"
      @cancel="$parent.$parent.isShowGender = false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'

export default {
  name: 'UpdateGender',

  data () {
    return {
      columns: ['男', '女']
    }
  },

  methods: {
    async onConfirm (value, index) {
      await editUserProfileAPI({
        gender: index
      })
      this.$emit('update-ugender', index)
      this.$parent.$parent.isShowGender = false
    }
  }
}
</script>

<style scoped></style>
