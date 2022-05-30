<template>
    <header-bar></header-bar>
    <nut-cell title="图片" desc-text-align="right">
      <template v-slot:icon>
        <img
          class="nut-icon"
          src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
        />
      </template>
    </nut-cell>

    <nut-cell title="图片" desc-text-align="right">
      <template v-slot:icon>
        <img
          class="nut-icon"
          src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
        />
      </template>
    </nut-cell>
    <footer-bar></footer-bar>
</template>
<script lang="ts" setup>
import { useMain } from '../../store' // 引入store
import HeaderBar from '../../components/header.vue'
import FooterBar from '../../components/footer.vue'
import { onMounted, reactive, toRefs } from 'vue';
const useStoreMain = useMain()
const state = reactive({
      count: new Array(100).fill(0)
    });

    const handleScroll = () => {
      let arr = new Array(100).fill(0);
      const len = state.count.length;
      state.count = state.count.concat(arr.map((item: number, index: number) => len + index + 1));
    };

    onMounted(() => {
      state.count = state.count.map((item: number, index: number) => index + 1);
    })
</script>