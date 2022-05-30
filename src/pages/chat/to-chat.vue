<template>
  <header-bar :title="title"></header-bar>
  <div class="chat-content" ref="chatContent">
     <!-- recordContent 聊天记录数组-->
     <div v-for="(item, index) in formData.messageList" :key="index">
          <!-- 对方 -->
          <div class="word" v-if="item.fromUserId != useStoreMain.user.userId">
               <img :src="useStoreMain.user.avatar">
               <div class="info">
                    <!-- <p class="time">{{toUserInfo.username}}  2022-01-01</p> -->
                    <div class="info-content">{{item.content}}</div>
               </div>
          </div>
          <!-- 我的 -->
          <div class="word-my" v-else>
               <div class="info">
                    <!-- <p class="time">{{itemc.nickName}}  2022-01-02</p> -->
                    <div class="info-content">{{item.content}}</div>
               </div>
               <img :src="useStoreMain.user.avatar">
           </div>
      </div>
</div>
<div class="chat-area">
    <nut-input
    v-model="formData.msg"
    font-class-name="iconfont"
    class-prefix="icon"
    label=""
    left-icon="voice"
    right-icon="JIMI40"
    clearable
    placeholder="聊天内容"
    @click-left-icon="clickLeftIcon"
    @click-right-icon="clickRightIcon"
    @keyup.enter="sendMsg"
  />
</div>
  
</template>
<script lang="ts" setup>
import { useMain } from "../../store"; // 引入store
import HeaderBar from "../../components/header.vue";
import { reactive,onMounted,ref,watch } from "vue";
import {useRouter} from 'vue-router'
import SocketService from "../../http/websocket";
import { socketHandShakeMain } from "../../store/socketHandShake";
import { HistoryMessageList } from "../../http/api";
import { Toast } from '@nutui/nutui';

const useStoreMain = useMain();
const socketHandShake = socketHandShakeMain();
const router = useRouter();
const formData = reactive({
  msg: "",
  socketServe: SocketService.Instance,
  messageList: [],
  toUserInfo: "",
});
const title = ref("");
const chatContent = ref();
const height = ref(0);
const clickLeftIcon = (value: string | number) => {
  console.log("clickLeftIcon:", value);
};
const clickRightIcon = (value: string | number) => {
  console.log("clickRightIcon:", value);
};
const sendData = (msg) => {
  let query = router.currentRoute.value.query
  var sendMsgData = {
    "path":"to-chat",
    "data":{
      "msg":msg,
      "token":useStoreMain.user.token,
      "toUserId":query.userId
      // "secret":socketHandShake.socketShakeInfo.
    }
  }
  formData.socketServe.send(sendMsgData);
};
const sendMsg = () => {
  sendData(formData.msg)
}

//获取ws消息
formData.socketServe.ws.onmessage = msg => {
  let data = JSON.parse(msg.data);
  formData.messageList.push(data.data);
  formData.msg = "";
  console.log("滑动的高度")
  console.log(height.value)
  setTimeout(() => {
    window.scrollTo(0,height.value)
    }, 500);
  
};

const init = () => {
  let query = router.currentRoute.value.query
  HistoryMessageList({
    token: useStoreMain.user.token,
    page: 1,
    toUserId:query.userId
  })
    .then((msgData) => {
      //保存登陆信息
      title.value = msgData.toUserInfo.username;
      formData.toUserInfo = msgData.toUserInfo;
      msgData.msgList.forEach((element) => {
        formData.messageList.push(element);
      });
    })
    .catch((error) => {
      if (error) {
        Toast.text("服务异常，请重试！");
      }
    });
};

onMounted(() => {
  init();
  setTimeout(() => {
    height.value = chatContent.value?.clientHeight;
    window.scrollTo(0,height.value)
}, 1000);
  

});
</script>

<style lang="scss">
.chat-content{
  width: 100%;
  margin-bottom:60px;
  .word{
     display: flex;
     margin-bottom: 20px;
     img{
       width: 40px;
       height: 40px;
       border-radius: 50%;
     }
     .info{
       margin-left: 10px;
       text-align: left;
       .time{
         font-size: 12px;
         color: rgba(51,51,51,0.8);
         margin: 0;
         height: 20px;
         line-height: 20px;
         margin-top: -5px;
       }
       .info-content{
          padding: 10px;
          font-size: 14px;
          background: #f6f0f0;
          position: relative;
          margin-top: 8px;
          border-radius: 10px;
          max-width: 70%;
        }
        //小三角形
        .info-content::before{
            position: absolute;
            left: -8px;
            top: 8px;
            content: '';
            border-right: 10px solid #f6f0f0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
        }
     }
  }
 
.word-my{
    display: flex;
    justify-content:flex-end;
    margin-bottom: 20px;
    img{
       width: 40px;
       height: 40px;
       border-radius: 50%;
     }
     .info{
       width: 90%;
       margin-left: 10px;
       text-align: right;
       .time{
         font-size: 12px;
         color: rgba(51,51,51,0.8);
         margin: 0;
         height: 20px;
         line-height: 20px;
         margin-top: -5px;
         margin-right: 10px;
       }
       .info-content{
          max-width: 70%;
          padding: 10px;
          font-size: 14px;
          float: right;
          margin-right: 10px;
          position: relative;
          margin-top: 8px;
          background: #A3C3F6;
          text-align: left;
          border-radius: 10px;
        }
        //小三角形
        .info-content::after{
            position: absolute;
            right: -8px;
            top: 8px;
            content: '';
            border-left: 10px solid #A3C3F6;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
        }
     }
  }
}
.chat-area {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>>