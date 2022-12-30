<template>
  <div>
    <!--    导航条-->
    <van-nav-bar
      left-text="返回"
      right-text="保存"
      title="更新昵称"
      @click-left="$parent.$parent.isShowName = false"
      @click-right="onClickRight"
    />

    <!--    输入框-->
    <van-field
      v-model.trim="name"
      autofocus
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
      type="text"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'

export default {
  name: 'UpdateNickname',

  props: {
    userNickname: String
  },
  data () {
    return {
      name: this.userNickname
    }
  },

  methods: {
    async onClickRight () {
      // 判断用户输入合法性
      const reg = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/
      if (reg.test(this.name) && this.name !== '') {
        // 发起修改请求
        await editUserProfileAPI({ name: this.name })
        // 昵称回显
        this.$emit('update-uname', this.name)
        // 关闭弹出层
        this.$parent.$parent.isShowName = false
      } else {
        this.$toast.fail('请设置正确的用户名')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
