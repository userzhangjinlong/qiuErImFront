<template>
  <header-bar></header-bar>
    <nut-skeleton width="250px" height="15px" title animated avatar row="3"  avatarSize="100px" :loading="checked">
      <div class="container">
        <nut-avatar
        width="20px"
          size="large"
          :icon="useStoreMain.user.avatar"
        />
        <div class="right-content">
          <div class="title">{{useStoreMain.user.username}}</div>
          <div class="desc">
            {{useStoreMain.user.username}}
          </div>
        </div>
      </div>
    </nut-skeleton>
  <footer-bar></footer-bar>
</template>
<script lang="ts" setup>
import { useMain } from "../../store"; // 引入store
import HeaderBar from "../../components/header.vue";
import FooterBar from "../../components/footer.vue";
import { ref,onMounted } from 'vue';
const useStoreMain = useMain();

const checked = ref(false);
onMounted(() => {
  checked(false);
});
</script>

<style lang="scss">

  .container {
    display: flex;
    height:60px;
    .nut-avatar-round {
        width: 70px;
    }
    .right-content {
      margin-left: 19px;
      font-family: PingFangSC;
      display: flex;
      flex-direction: column;
      text-align: left;
      .title {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      .desc {
        margin-top: 10px;
        font-size: 13px;
        color: rgba(154, 155, 157, 1);
      }
    }
  }
</style>