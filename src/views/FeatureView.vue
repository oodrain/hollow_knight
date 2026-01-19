<script setup lang="ts">
// 导入两个画廊组件
import MapBackgroundGallery from '@/components/gallery/MapBackgroundGallery.vue'
import ArtworkGridGallery from '@/components/gallery/ArtworkGridGallery.vue'
</script>

<template>
  <div class="feature-container">
    <!-- 页面标题 -->
    <header class="feature-header">
      <h1>美术与视觉设计</h1>
      <p class="subtitle">探索《空洞骑士》独特的黑暗幻想艺术风格</p>
    </header>
    
    <!-- 地图背景展示区 -->
    <section class="gallery-section">
      <div class="section-header">
        <h2>🗺️ 地图环境艺术</h2>
        <p class="section-description">Hallownest 王国的各个区域拥有截然不同的视觉风格</p>
      </div>
      <!-- 轮播画廊将在这里显示 -->
      <MapBackgroundGallery />
    </section>
    
    <!-- 美术设定展示区 -->
    <section class="gallery-section">
      <div class="section-header">
        <h2>🎨 美术设定集</h2>
        <p class="section-description">角色设计、场景概念与视觉开发</p>
      </div>
      <!-- 网格画廊将在这里显示 -->
      <ArtworkGridGallery />
    </section>
    
    <!-- 设计理念文字区 -->
    <section class="design-concept">
      <h2>设计理念</h2>
      <div class="concept-content">
        <p>《空洞骑士》的艺术风格融合了手绘质感、黑暗幻想与昆虫美学，创造出一个既美丽又危险的 underground 世界。</p>
        <ul>
          <li><strong>手绘质感</strong>：所有角色和环境均为手绘风格，保留笔触感</li>
          <li><strong>色彩叙事</strong>：不同区域使用不同的主色调传达情绪</li>
          <li><strong>细节密度</strong>：场景中充满精心设计的细节，增强探索感</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.feature-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.feature-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #5d4d3a;
}

.feature-header h1 {
  color: #f0e6d2;
  font-size: 2.8rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.subtitle {
  color: #b8a488;
  font-size: 1.2rem;
  font-style: italic;
}

.gallery-section {
  margin-bottom: 60px;
}

.section-header {
  margin-bottom: 25px;
}

.section-header h2 {
  color: #e8d8b8;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.section-description {
  color: #a89575;
  font-size: 1rem;
}

.design-concept {
  background: rgba(40, 35, 30, 0.6);
  border-radius: 10px;
  padding: 25px;
  border: 1px solid #5d4d3a;
  margin-top: 30px;
}

.design-concept h2 {
  color: #e8d8b8;
  margin-bottom: 15px;
}

.concept-content {
  color: #c8b8a0;
  line-height: 1.6;
}

.concept-content p {
  margin-bottom: 15px;
}

.concept-content ul {
  padding-left: 20px;
}

.concept-content li {
  margin-bottom: 8px;
}

.concept-content strong {
  color: #f0e6d2;
}
</style>
