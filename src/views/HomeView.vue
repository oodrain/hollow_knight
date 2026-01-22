<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'  
</script>

<template>
  <PageTitle msg="空洞骑士" />
  <!-- 插入宣传片 -->
  <div class="video-container">
    <iframe 
      src="https://player.bilibili.com/player.html?bvid=BV1SW411S7wN&cid=15733231&page=1"
      scrolling="no"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      width="800"
      height="450"
    ></iframe>
  </div>
</template>

<style scoped>
.video-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

iframe {
  border-radius: 8px;
}
</style>