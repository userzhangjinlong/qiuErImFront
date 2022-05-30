<template>
  <div>
      <nut-navbar  :left-show="false" @click="title" @on-click-title="title" :title="title" fixed="true">
      <template #right>
        <nut-icon class="right" name="uploader"></nut-icon>
      </template>
    </nut-navbar>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
export default {
    name: 'HeaderBar',
    props: {
        msg: String,
        title: String
    },
    setup() {
      const visible = ref({
      showIcon: true,
    });
    const methods = {
      back() {
        alert('header头部， 点击返回');
      },
      title() {
        alert('header头部， 点击title');
      },
      rightClick() {
        alert('右侧点击事件');
      }
    };
    const itemList = reactive([
      {
        name: '选项一',
        icon: 'my2'
      },
      {
        name: '选项二',
        icon: 'cart2'
      },
      {
        name: '选项三',
        icon: 'location2'
      }
    ]);
    return {
      ...methods,
      visible,
      itemList
    };
}
}
</script>

<style lang="scss">
  .popoverContent{
    position: fixed;
    left:77%;
  }
  .nut-navbar {
    z-index:100;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
