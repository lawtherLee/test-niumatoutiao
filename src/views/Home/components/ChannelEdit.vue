<template>
  <div class="channel-edit">
    <!--    我的频道-->
    <!--    标题-->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        round
        size="mini"
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <!--    频道-->
    <div class="my-pannel">
      <van-grid :border="false" gutter="10">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="item.id"
          :class="{ active: item.name === '推荐' }"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :text="item.name"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!--    推荐频道-->
    <van-cell title="推荐频道"></van-cell>
    <!--    频道-->
    <div class="recommend-pannel">
      <van-grid :border="false" gutter="10">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel', item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'

export default {
  name: 'ChannelEdit',

  props: {
    myChannels: Array
  },

  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },

  created () {
    this.getAllChannels()
  },

  methods: {
    // 获取所有频道
    async getAllChannels () {
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
    },

    handleMyChannel ({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-channel', id)
      } else {
        // 关闭弹窗
        // 切换频道
        this.$emit('change-active', index)
      }
    }
  },

  computed: {
    recommendChannels () {
      // 推荐频道 - 我的频道
      return this.allChannels.filter((allChannelItem) => {
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChannelItem.id
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}

// 取消编辑状态下的文字上边框
:deep(.van-grid-item__text) {
  margin-top: 0;
}

// 取消cell单元格下面横线
.van-cell {
  &::after {
    content: "";
    border-bottom: 1px solid transparent;
  }
}

.channel-edit {
  padding-top: 92px;

  :deep(.btn) {
    width: 100px;
    font-size: 25px;
  }

  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }

  // 我的频道
  .my-pannel {
    // 编辑按钮居中
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__content {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }

  :deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
  }

  // 推荐频道
  .recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }

  van-cell {
    border-color: transparent;
  }
}
</style>
