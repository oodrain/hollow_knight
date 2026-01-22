<!-- Home.vue - 极简版 -->
<template>
  <div class="home-page">
    <PageTitle msg="空洞骑士" />
    
    <div class="minimal-nav-container">
      <RouterLink to="/npcandenemy" class="minimal-nav-item">
        <img 
          src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/d/d1/Hunters_Journal.png/200px-Hunters_Journal.png" 
          alt="猎人日志" 
          class="minimal-nav-image"
        />
        <span>猎人日志</span>
      </RouterLink>
      
      <RouterLink to="/charm" class="minimal-nav-item">
        <img 
          src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/e3/Charm_Notch.png/100px-Charm_Notch.png" 
          alt="护符" 
          class="minimal-nav-image"
        />
        <span>护符</span>
      </RouterLink>
      
      <RouterLink to="/skill" class="minimal-nav-item">
        <img 
          src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/63/Soul_Meter.png/50px-Soul_Meter.png" 
          alt="技能" 
          class="minimal-nav-image"
        />
        <span>技能</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* 极简导航容器 */
.minimal-nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin: 40px 0;
  flex-wrap: wrap;
}

/* 极简导航项 */
.minimal-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 160px;
}

/* 极简导航图片 */
.minimal-nav-image {
  background: #0A0A0A;
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 5px;
  object-fit: cover;
}

/* 导航标签 */
.minimal-nav-item span {
  font-size: 1.2rem;
  color: black;
  text-align: center;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .minimal-nav-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .minimal-nav-item {
    flex-direction: row;
    width: auto;
    gap: 15px;
  }
  
  .minimal-nav-image {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
  }
  
  .minimal-nav-item span {
    font-size: 1.1rem;
  }
}
</style>