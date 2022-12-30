<template>
  <div>
    <!--    导航栏-->
    <van-nav-bar
      class="navbar"
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    />

    <!--    修改信息-->
    <!--    头像-->
    <input
      ref="file"
      accept=".png,.jpg"
      hidden
      type="file"
      @change="selectPhoto"
    />
    <van-cell is-link title="头像">
      <van-image
        :src="avator"
        height="0.8rem"
        round
        width="0.8rem"
        @click="$refs.file.click()"
      />

      <!--      头像弹出层-->
      <van-popup
        v-model="isShowPhoto"
        :style="{ height: '100%' }"
        closeable
        position="bottom"
      >
        <update-avator
          v-if="isShowPhoto"
          :avator.sync="avator"
          :photo="photo"
        ></update-avator>
      </van-popup>
    </van-cell>

    <!--      昵称-->
    <van-cell
      :value="userProfile.name"
      class="userNickname"
      is-link
      title="昵称"
      @click="isShowName = true"
    ></van-cell>
    <!--    昵称弹出层-->
    <van-popup
      v-model="isShowName"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <update-nickname
        :user-nickname="userProfile.name"
        @update-uname="userProfile.name = $event"
      ></update-nickname>
    </van-popup>

    <!--      性别-->
    <van-cell
      :value="userProfile.gender === 0 ? '男' : '女'"
      is-link
      title="性别"
      @click="isShowGender = true"
    />
    <!--      性别弹出层-->
    <van-popup
      v-model="isShowGender"
      :style="{ height: '40%' }"
      position="bottom"
    >
      <update-gender
        @update-ugender="userProfile.gender = $event"
      ></update-gender>
    </van-popup>

    <!--      生日-->
    <van-cell
      :value="userProfile.birthday"
      is-link
      title="生日"
      @click="isShowBirthday = true"
    ></van-cell>
    <!--    生日弹出层-->
    <van-popup
      v-model="isShowBirthday"
      :style="{ height: '40%' }"
      position="bottom"
    >
      <update-birthday
        :user-birthday="userProfile.birthday"
        @update-ubirthday="userProfile.birthday = $event"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
import UpdateBirthday from './components/UpdateBirthday'
import UpdateAvator from './components/UpdateAvator'
import UpdateNickname from './components/UpdateNickname'
import UpdateGender from '@/views/User/components/UpdateGender'
import { resolveToBase64 } from '@/utils'
import { userProfileAPI } from '@/api'

export default {
  name: 'index',

  components: { UpdateAvator, UpdateNickname, UpdateGender, UpdateBirthday },

  data () {
    return {
      isShowPhoto: false,
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      userProfile: []
    }
  },

  created () {
    this.getUserProfile()
  },

  methods: {
    // 选择头像
    async selectPhoto () {
      // 获取用户选择的图片
      const file = this.$refs.file.files[0]
      // 文件转base64
      //  - FileReader：文件阅读器
      // 声明photo接收base64
      this.photo = await resolveToBase64(file)
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选择同一张图片
      this.$refs.file.value = ''
    },

    // 获取用户个人信息
    async getUserProfile () {
      const { data } = await userProfileAPI()
      console.log(data)
      this.userProfile = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }

  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
