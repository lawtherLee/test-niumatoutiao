<template>
  <div>
    <van-nav-bar
      title="登录"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        :rules="[{ required: true, message: '请填写用户名' }]"
        label="用户名"
        name="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="password"
        :rules="[{ required: true, message: '请填写密码' }]"
        label="密码"
        name="密码"
        placeholder="密码"
      />

      <!--      提交按钮-->
      <div style="margin: 16px;">
        <van-button block native-type="submit" type="info">提交</van-button>
      </div>
      <!--/      提交按钮-->
    </van-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
