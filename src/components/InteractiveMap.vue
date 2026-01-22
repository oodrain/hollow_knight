<template>
  <div class="map-page-wrapper">
    <div class="map-viewport">
      <div class="map-container">
        <img class="hk-map-image" :src="imageUrl" alt="Hollow Knight World Map" />
        <div class="region-overlay">
          <div
            v-for="region in regions"
            :key="region.id"
            class="region-mask"
            :data-id="region.id"
            :style="getClipPathStyle(region)"
            @mouseenter="handleRegionHover(region, $event)"
            @mouseleave="handleRegionLeave"
          ></div>
        </div>
      </div>
      <!-- 智能跟随的详情框 -->
      <div v-if="activeRegion && detailPosition" class="floating-detail" :style="detailPosition">
        <h3>{{ activeRegion.name }}</h3>
        <p>{{ activeRegion.description }}</p>
        <img :src="activeRegion.image" :alt="activeRegion.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MapRegion {
  id: string
  name: string
  description: string
  image: string
}

defineProps<{
  regions: MapRegion[]
  imageUrl: string
}>()

const MAP_WIDTH = 1068
const MAP_HEIGHT = 695

// 使用像素坐标为 15 个区域建立映射
const coordMap: Record<string, number[]> = {
  // 呼啸悬崖（howling-cliffs）
  // 注意：第一个点改为 156x20（其余点保持你提供的顺序）
  'howling-cliffs': [156, 20, 155, 102, 259, 133, 263, 161, 310, 161, 310, 99, 351, 96, 351, 22],
  // 苍绿之径（greenpath）
  greenpath: [64, 148, 53, 199, 169, 202, 170, 248, 355, 255, 367, 181, 252, 178, 233, 146],
  // 王后花园（queens-gardens）
  'queens-gardens': [54, 287, 55, 408, 269, 401, 270, 326, 197, 326, 202, 280],
  // 雾之峡谷（fog-canyon）
  'fog-canyon': [
    208, 266, 212, 318, 287, 316, 288, 366, 343, 365, 339, 323, 411, 319, 412, 263, 385, 269,
  ],
  // 深邃巢穴（deepnest）
  deepnest: [17, 477, 19, 600, 408, 590, 341, 535, 387, 494, 333, 420],
  // 真菌荒地（fungal-wastes）
  'fungal-wastes': [
    284, 379, 354, 377, 355, 338, 432, 331, 432, 264, 467, 259, 493, 287, 492, 455, 435, 491, 398,
    411, 284, 410,
  ],
  // 遗忘十字路（forgotten-crossroads）
  'forgotten-crossroads': [381, 180, 630, 171, 630, 257, 387, 246],
  // 水晶山峰（crystal-peak）
  'crystal-peak': [561, 115, 749, 25, 805, 131, 766, 216, 646, 213, 639, 127],
  // 安息之地（resting-grounds）
  'resting-grounds': [648, 234, 814, 230, 821, 170, 909, 170, 914, 259, 652, 263],
  // 泪水之城（city-of-tears）
  'city-of-tears': [509, 288, 811, 299, 813, 375, 870, 380, 873, 436, 514, 427],
  // 皇家水道（royal-waterways）
  'royal-waterways': [
    504, 452, 820, 446, 813, 525, 695, 530, 695, 559, 599, 564, 593, 516, 478, 505,
  ],
  // 古老盆地（ancient-basin）
  'ancient-basin': [426, 616, 602, 611, 599, 579, 692, 573, 694, 610, 792, 624, 787, 689, 417, 680],
  // 蜂巢（hive）
  hive: [877, 519, 1044, 514, 1044, 611, 875, 616],
  // 王国边缘（kingdoms-edge）
  'kingdoms-edge': [
    835, 348, 841, 295, 930, 298, 937, 396, 1054, 404, 1063, 503, 872, 510, 870, 594, 755, 596, 758,
    578, 833, 578, 836, 488, 880, 481, 880, 354,
  ],
  // 德特茅斯（dirtmouth）
  dirtmouth: [383, 93, 380, 112, 327, 115, 327, 161, 539, 162, 538, 96],
}

const activeRegion = ref<MapRegion | null>(null)
const detailPosition = ref<{
  left: string
  top: string
  position: 'fixed'
} | null>(null)

function getClipPathStyle(region: MapRegion) {
  const pixels = coordMap[region.id]
  if (!pixels || pixels.length < 6) {
    return {}
  }

  // 将像素坐标转换为百分比坐标
  let polygonString = ''
  for (let i = 0; i < pixels.length; i += 2) {
    const x = pixels[i]!
    const y = pixels[i + 1]!
    const xPercent = ((x / MAP_WIDTH) * 100).toFixed(2)
    const yPercent = ((y / MAP_HEIGHT) * 100).toFixed(2)
    polygonString += `${xPercent}% ${yPercent}%, `
  }

  polygonString = polygonString.replace(/, $/, '')

  return {
    clipPath: `polygon(${polygonString})`,
  }
}

function handleRegionHover(region: MapRegion, event: MouseEvent) {
  activeRegion.value = region

  detailPosition.value = {
    left: `${event.clientX + 20}px`,
    top: `${event.clientY}px`,
    position: 'fixed',
  }
}

function handleRegionLeave() {
  activeRegion.value = null
  detailPosition.value = null
}
</script>

<style scoped>
.map-page-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-container {
  position: relative;
  display: inline-block;
  transform: scale(0.7);
  transform-origin: top center;
}

.hk-map-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
}

.region-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.region-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%);
  transition: background-color 0.2s;
}

.region-mask:hover {
  background-color: rgba(255, 215, 0, 0.15); 
}

.floating-detail {
  position: fixed; 
  z-index: 1000;
  background: rgba(26, 26, 46, 0.95);
  border: 1px solid #4a4a6d;
  border-radius: 8px;
  padding: 12px;
  max-width: 250px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  color: #e0e0e0;
  pointer-events: none;
}

.floating-detail h3 {
  color: #ffdd57;
  margin-top: 0;
  font-size: 1.1em;
}

.floating-detail img {
  width: 100%;
  height: auto;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
