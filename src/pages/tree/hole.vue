<template>
  <header-bar></header-bar>
  <footer-bar></footer-bar>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMain } from '../../store' // 引入store
import HeaderBar from '../../components/header.vue'
import FooterBar from '../../components/footer.vue'
const useStoreMain = useMain()
</script>