<template>
  <div class="grid-gallery">
    <div class="gallery-header">
      <h3>美术设定集</h3>
      <p>点击卡片查看详细设计</p>
    </div>
    
    <!-- 筛选标签 -->
    <div class="filter-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="filter-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <!-- 图片网格 -->
    <div class="artwork-grid">
      <!-- 卡片1：小骑士 -->
      <div class="artwork-card" @click="viewDetail('小骑士设计')">
        <div class="card-image" style="background: linear-gradient(135deg, #4a3c2c, #2c2418);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">角色设计</div>
        </div>
        <div class="card-info">
          <h4>小骑士设计</h4>
          <p>主角角色设定，空洞骑士的标志性形象</p>
          <div class="tags">
            <span class="tag">角色</span>
            <span class="tag">主角</span>
            <span class="tag">标志性</span>
          </div>
        </div>
      </div>
      
      <!-- 卡片2：大黄蜂 -->
      <div class="artwork-card" @click="viewDetail('大黄蜂')">
        <div class="card-image" style="background: linear-gradient(135deg, #2c2c2c, #4a3c2c);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">角色设计</div>
        </div>
        <div class="card-info">
          <h4>大黄蜂</h4>
          <p>猎人角色，敏捷的战斗风格与独特设计</p>
          <div class="tags">
            <span class="tag">角色</span>
            <span class="tag">NPC</span>
            <span class="tag">猎人</span>
          </div>
        </div>
      </div>
      
      <!-- 卡片3：泪水之城 -->
      <div class="artwork-card" @click="viewDetail('泪水之城街景')">
        <div class="card-image" style="background: linear-gradient(135deg, #3c4a6c, #2c3858);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">场景设计</div>
        </div>
        <div class="card-info">
          <h4>泪水之城街景</h4>
          <p>雨中城市的氛围营造与建筑细节设计</p>
          <div class="tags">
            <span class="tag">场景</span>
            <span class="tag">建筑</span>
            <span class="tag">氛围</span>
          </div>
        </div>
      </div>
      
      <!-- 卡片4：武器设计 -->
      <div class="artwork-card" @click="viewDetail('武器设计')">
        <div class="card-image" style="background: linear-gradient(135deg, #6c5c4c, #4a3c2c);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">道具设计</div>
        </div>
        <div class="card-info">
          <h4>武器与道具</h4>
          <p>骨钉、法术、护符等装备的视觉设计</p>
          <div class="tags">
            <span class="tag">道具</span>
            <span class="tag">武器</span>
            <span class="tag">装备</span>
          </div>
        </div>
      </div>
      
      <!-- 卡片5：BOSS设计 -->
      <div class="artwork-card" @click="viewDetail('BOSS设计')">
        <div class="card-image" style="background: linear-gradient(135deg, #6c2c2c, #4a1a1a);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">敌人设计</div>
        </div>
        <div class="card-info">
          <h4>BOSS设计</h4>
          <p>主要敌人的视觉设计与战斗概念</p>
          <div class="tags">
            <span class="tag">敌人</span>
            <span class="tag">BOSS</span>
            <span class="tag">战斗</span>
          </div>
        </div>
      </div>
      
      <!-- 卡片6：概念草图 -->
      <div class="artwork-card" @click="viewDetail('概念草图')">
        <div class="card-image" style="background: linear-gradient(135deg, #5c4a3c, #3c2c2c);">
          <div class="card-overlay">
            <span>👁️ 查看详情</span>
          </div>
          <div class="card-badge">概念设计</div>
        </div>
        <div class="card-info">
          <h4>早期概念草图</h4>
          <p>游戏初期的设定探索与风格尝试</p>
          <div class="tags">
            <span class="tag">概念</span>
            <span class="tag">草图</span>
            <span class="tag">早期</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
  { id: 'all', name: '全部' },
  { id: 'character', name: '角色设计' },
  { id: 'environment', name: '场景设计' },
  { id: 'concept', name: '概念设计' },
  { id: 'prop', name: '道具设计' }
]);

const activeTab = ref('all');

const viewDetail = (title: string) => {
  alert(`查看详情: ${title}\n\n这里是详细的美术设定介绍。\n\n在实际项目中，这里可以跳转到详情页或打开弹窗。`);
};
</script>

<style scoped>
.grid-gallery {
  background: rgba(30, 25, 20, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #5d4d3a;
}

.gallery-header {
  text-align: center;
  margin-bottom: 20px;
}

.gallery-header h3 {
  color: #e8d8b8;
  margin-bottom: 5px;
}

.gallery-header p {
  color: #b8a488;
  font-size: 0.9rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.filter-btn {
  background: #3a2e20;
  color: #b8a488;
  border: 1px solid #5d4d3a;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #4a3c2c;
}

.filter-btn.active {
  background: #5d4d3a;
  color: #f0e6d2;
  border-color: #e8d8b8;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.artwork-card {
  background: rgba(40, 35, 30, 0.8);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #4a3c2c;
}

.artwork-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.4);
}

.card-image {
  height: 180px;
  position: relative;
}

.card-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(93, 77, 58, 0.9);
  color: #f0e6d2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.artwork-card:hover .card-overlay {
  opacity: 1;
}

.card-overlay span {
  background: rgba(120, 100, 75, 0.95);
  color: #f0e6d2;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
}

.card-info {
  padding: 15px;
}

.card-info h4 {
  margin: 0 0 8px 0;
  color: #f0e6d2;
  font-size: 1.1rem;
}

.card-info p {
  margin: 0 0 12px 0;
  color: #b8a488;
  font-size: 0.9rem;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: rgba(93, 77, 58, 0.4);
  color: #e8d8b8;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}
</style>
