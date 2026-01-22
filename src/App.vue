<script setup lang="ts">
import { RouterView } from 'vue-router'
import MouseTrail from '@/components/MouseTrail.vue'

</script>

<template>
  <div>
  <MouseTrail />
  <!-- 全站背景 -->
  <div id="app-bg"></div>
    <MusicPlayer />
  <!--全站导航-->
  <nav class="nav">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/map">地图</RouterLink>
    <RouterLink to="/gallery">图鉴</RouterLink>
    <RouterLink to="/story">世界观</RouterLink>
    <RouterLink to="/feature">美术与音乐</RouterLink>
  </nav>
  <main class="main-content">
  <RouterView />
  </main>
  </div>
</template>
<style scoped>
</style>

<style>
  .nav{
    display: flex;
    background: transparent;
   
    
    position: absolute; 
    top: 200px;         
    left: 50%;          
    transform: translateX(-50%); 
   
    font-size: 1.5rem;
     gap:  120px;
     
  }

  .nav a {
  color: #fff;
  text-decoration: none;
}

.nav a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #fff;
}

.main-content {
  padding-top: 280px;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
