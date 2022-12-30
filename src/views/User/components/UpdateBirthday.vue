<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      :max-date="maxDate"
      :min-date="minDate"
      title="选择生日"
      type="date"
      @cancel="$parent.$parent.isShowBirthday = false"
      @confirm="updateBirthdayFn"
    />
  </div>
</template>

<script>
import { formetDate } from '@/utils/dayjs'
import { editUserProfileAPI } from '@/api'

export default {
  name: 'UpdateBirthday',

  props: {
    userBirthday: String
  },

  data () {
    return {
      minDate: new Date(1922, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userBirthday)
    }
  },

  methods: {
    async updateBirthdayFn () {
      const birthday = formetDate(this.currentDate)
      await editUserProfileAPI({ birthday })
      this.$emit('update-ubirthday', birthday)
      this.$parent.$parent.isShowBirthday = false
    }
  }
}
</script>

<style scoped></style>
