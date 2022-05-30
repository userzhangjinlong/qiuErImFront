<template>
  <div class="footer">
      <nut-tabbar :bottom="true" :safeAreaInsetBottom="true" unactive-color="#7d7e80" active-color="#1989fa">
    <nut-tabbar-item tab-title="消息" @click="toDetail('/')" font-class-name="iconfont" class-prefix="icon" icon="liaotian" num="0">
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="盆友" @click="toDetail('/friend')" font-class-name="iconfont" class-prefix="icon"  icon="friends" num="0"></nut-tabbar-item>
    <nut-tabbar-item tab-title="树洞" @click="toDetail('/hole')" font-class-name="iconfont" class-prefix="icon"  icon="shoudaodeshudong"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" @click="toDetail('/my')" font-class-name="iconfont" class-prefix="icon" icon="wode"></nut-tabbar-item>
  </nut-tabbar>
  </div>
</template>

<script lang="ts" setup>
import router from "../router";
  name:'FooterBar'
  const toDetail = (path: string) => {
      router.push(path);
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
