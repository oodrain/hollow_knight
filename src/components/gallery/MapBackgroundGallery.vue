<template>
  <div class="carousel-gallery">
    <div class="carousel-header">
      <h3>地图背景轮播展示</h3>
      <p>点击缩略图切换不同区域</p>
    </div>
    
    <!-- 主展示区 -->
    <div class="main-image-placeholder">
      <div class="placeholder-content">
        <div class="image-sim" style="background: linear-gradient(135deg, #2c2418, #4a3c2c);">
          <span>德特茅斯 - 起始小镇</span>
        </div>
      </div>
    </div>
    
    <!-- 缩略图导航 -->
    <div class="thumbnail-nav">
      <div class="thumbnail active">
        <div style="background: linear-gradient(135deg, #2c2418, #4a3c2c);"></div>
        <span>德特茅斯</span>
      </div>
      <div class="thumbnail">
        <div style="background: linear-gradient(135deg, #1a3c1a, #2c5c2c);"></div>
        <span>苍绿之径</span>
      </div>
      <div class="thumbnail">
        <div style="background: linear-gradient(135deg, #2c3858, #3c4a6c);"></div>
        <span>泪水之城</span>
      </div>
      <div class="thumbnail">
        <div style="background: linear-gradient(135deg, #3c2c5c, #4c3c6c);"></div>
        <span>水晶山峰</span>
      </div>
    </div>
    
    <!-- 控制按钮 -->
    <div class="gallery-controls">
      <button class="control-btn" @click="prevImage">← 上一个</button>
      <span class="counter">{{ currentIndex + 1 }} / {{ totalImages }}</span>
      <button class="control-btn" @click="nextImage">下一个 →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentIndex = ref(0);
const totalImages = 4;

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % totalImages;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + totalImages) % totalImages;
};
</script>

<style scoped>
.carousel-gallery {
  background: rgba(30, 25, 20, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #5d4d3a;
}

.carousel-header {
  text-align: center;
  margin-bottom: 20px;
}

.carousel-header h3 {
  color: #e8d8b8;
  margin-bottom: 5px;
}

.carousel-header p {
  color: #b8a488;
  font-size: 0.9rem;
}

.main-image-placeholder {
  margin-bottom: 20px;
}

.placeholder-content {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
}

.image-sim {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.thumbnail-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.thumbnail {
  width: 100px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
}

.thumbnail:hover {
  opacity: 0.9;
}

.thumbnail.active {
  opacity: 1;
  transform: translateY(-5px);
}

.thumbnail > div {
  height: 70px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.thumbnail span {
  display: block;
  text-align: center;
  color: #b8a488;
  font-size: 0.85rem;
}

.gallery-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.control-btn {
  background: #5d4d3a;
  color: #e8d8b8;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover {
  background: #6b5a45;
}

.counter {
  color: #b8a488;
  min-width: 60px;
  text-align: center;
}
</style>
