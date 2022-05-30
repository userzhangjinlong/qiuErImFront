
<template>
  <router-view />
</template>
<script setup>
import { onMounted, reactive } from "vue";
import SocketService from "./http/websocket";
name: "App";
const data = reactive({
  socketServe: SocketService.Instance,
});
SocketService.Instance.connect();
//握手 心跳
data.socketServe = SocketService.Instance;
data.socketServe.registerCallBack("callback1", data.socketServe);
//默认链接即发起握手 获取握手消息
data.socketServe.ws.onmessage = msg => {
  localStorage.setItem('socketShakeInfo', JSON.stringify(msg.data))
	      console.log(msg.data.data, '从服务端获取到了数据');
};
//心跳
let hertCheckMsg = {
    "path":"heart-check",
    "data":{
      "msg":"handshake",
    }
  }
// data.socketServe.heartCheck(hertCheckMsg)
onMounted(() => {
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
