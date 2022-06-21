<template>
  <header-bar></header-bar>
  <nut-cell title="新的朋友" icon="my" is-link style="text-align:left" url="/friend/apply"></nut-cell>
  <ul class="infiniteUl" id="scroll" style="height: 300px">
    <nut-infiniteloading
      containerId="scroll"
      :use-window="false"
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <li
        class="infiniteLi"
        v-for="(item, index) in data.defultList"
        :key="index"
      >
        <nut-cell
          :title="item.username"
          @click="goToChat(item.id)"
          desc-text-align="right"
        >
          <template v-slot:icon>
            <img class="nut-icon" :src="item.avatar" />
          </template>
        </nut-cell>
      </li>
    </nut-infiniteloading>
  </ul>
  <footer-bar></footer-bar>
</template>
<script lang="ts" setup>
import { useMain } from "../../store/index"; // 引入store
import HeaderBar from "../../components/header.vue";
import FooterBar from "../../components/footer.vue";
import { ref, reactive, onMounted, toRefs } from "vue";
import { UserFriendList } from "../../http/api";
import router from "../../router";
const useStoreMain = useMain();
const hasMore = ref(true);
const data = reactive({
  defultList: [],
});
const goToChat = (userId: int) => {
  router.push("/chat/to-chat?userId=" + userId);
};

const loadMore = (done) => {
  setTimeout(() => {
    const curLen = data.defultList.length;
    for (let i = curLen; i < curLen + 10; i++) {
      data.defultList.push(`${i}`);
    }
    if (data.defultList.length > 30) hasMore.value = false;
    done();
  }, 500);
};
const init = () => {
  UserFriendList({
    token: useStoreMain.user.token,
    page: 1,
  })
    .then((friendData) => {
      //保存登陆信息
      friendData.forEach((element) => {
        console.log(element);
        data.defultList.push(element);
      });
    })
    .catch((error) => {
      if (error) {
        console.log("获取到的error信息" + error);
        Toast.text(error);
      }
    });
};
onMounted(() => {
  init();
});
// return { loadMore, hasMore, ...toRefs(data) };
</script>

<style>
.infiniteUl {
  height: 1200px;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: #eee;
}
.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(100, 100, 100, 1);
  text-align: center;
}
</style>