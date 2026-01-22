<template>
  <div class="map-gallery">
    <div class="gallery-header">
      <h2>🗺️ 地图环境艺术画廊</h2>
      <p>探索Hallownest王国的视觉设计 | {{ currentTime }}</p>
    </div>
    
    <!-- 主展示区 -->
    <div class="main-display">
      <div class="selected-area" :style="{ background: currentArea.color }">
        <h3>{{ currentArea.name }}</h3>
        <p class="en-title">{{ currentArea.enName }}</p>
        <p>{{ currentArea.description }}</p>
      </div>
      
      <div class="controls">
        <button @click="prevArea" :disabled="currentIndex === 0">← 上一个</button>
        <span class="counter">{{ currentIndex + 1 }}/{{ areas.length }}</span>
        <button @click="nextArea" :disabled="currentIndex === areas.length - 1">下一个 →</button>
      </div>
    </div>
    
    <!-- 缩略图区域 -->
    <div class="thumbnails">
      <div 
        v-for="(area, index) in areas" 
        :key="area.id"
        class="thumbnail" 
        :class="{ active: index === currentIndex }"
        @click="selectArea(index)"
        :style="{ borderColor: area.color }"
      >
        <div class="color-dot" :style="{ background: area.color }"></div>
        <span>{{ area.name }}</span>
      </div>
    </div>
    
    <!-- 调试信息 -->
    <div class="debug-info" v-if="showDebug">
      <p>✅ 组件状态：正常 | 区域数：{{ areas.length }} | 当前：{{ currentArea.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapBackgroundGallery',
  data() {
    return {
      currentIndex: 0,
      currentTime: new Date().toLocaleTimeString(),
      showDebug: true, // 开发时显示，上线可改为false
      areas: [
        { 
          id: 1, 
          name: '泪水之城', 
          enName: 'City of Tears', 
          color: '#4a6fa5',
          description: '永恒雨幕笼罩的悲伤都市，哥特式拱廊建筑，蓝色调为主，雨幕特效增强氛围。' 
        },
        { 
          id: 2, 
          name: '真菌荒地', 
          enName: 'Fungal Wastes', 
          color: '#8a6d3b',
          description: '发光真菌覆盖的生态区，荧光蘑菇与橙色孢子雾，有机地形设计。' 
        },
        { 
          id: 3, 
          name: '水晶山峰', 
          enName: 'Crystal Peak', 
          color: '#6c5ce7',
          description: '闪耀晶体构成的矿山，水晶簇反射光线，蓝紫色调，尖锐地形。' 
        },
        { 
          id: 4, 
          name: '苍绿之径', 
          enName: 'Greenpath', 
          color: '#27ae60',
          description: '植被茂密的潮湿区域，荧光苔藓，滴水特效，浓密的绿色植被。' 
        },
        { 
          id: 5, 
          name: '深邃巢穴', 
          enName: 'Deepnest', 
          color: '#2d3436',
          description: '黑暗压抑的蜘蛛巢穴，极低光照，蛛网纹理，狭窄通道设计。' 
        }
      ]
    }
  },
  computed: {
    currentArea() {
      return this.areas[this.currentIndex]
    }
  },
  methods: {
    nextArea() {
      if (this.currentIndex < this.areas.length - 1) {
        this.currentIndex++
      }
    },
    prevArea() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    selectArea(index) {
      this.currentIndex = index
    }
  },
  mounted() {
    // 更新时间
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
    console.log('🎯 MapBackgroundGallery组件已加载')
  }
}
</script>

<style scoped>
.map-gallery {
  background: rgba(30, 30, 35, 0.95);
  border-radius: 16px;
  padding: 30px;
  border: 2px solid #5d4d3a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #f0e6d2;
}

.gallery-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #5d4d3a;
  padding-bottom: 20px;
}

.gallery-header h2 {
  color: #e8d8b8;
  font-size: 2rem;
  margin-bottom: 10px;
}

.gallery-header p {
  color: #b8a488;
  font-size: 1.1rem;
}

.main-display {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.selected-area {
  padding: 40px;
  border-radius: 12px;
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
}

.selected-area h3 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.en-title {
  font-style: italic;
  opacity: 0.9;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls button {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #5d4d3a;
  color: #e8d8b8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.controls button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: #b8a488;
}

.controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.counter {
  font-size: 1.2rem;
  color: #b8a488;
  font-weight: bold;
}

.thumbnails {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 15px 0;
  margin-bottom: 20px;
}

.thumbnail {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.thumbnail:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.thumbnail.active {
  border-color: currentColor;
  background: rgba(255, 255, 255, 0.15);
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
}

.debug-info {
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #4ecdc4;
  text-align: center;
  border: 1px dashed #4ecdc4;
}
</style>
