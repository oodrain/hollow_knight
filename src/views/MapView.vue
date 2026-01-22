<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import InteractiveMap from '@/components/InteractiveMap.vue'

interface MapRegion {
  id: string
  name: string
  description: string
  image: string
}

const mapRegions = ref<MapRegion[]>([
  {
    id: 'howling-cliffs',
    name: '呼啸悬崖',
    description: '偏远而风声呼啸的高处，是部分新路线的起点与隐藏内容的聚集地。',
    image: new URL('@/assets/map_image/howling-cliffs.png', import.meta.url).href,
  },
  {
    id: 'dirtmouth',
    name: '德特茅斯',
    description: '安全的枢纽小镇，是骑士往返各区域、补给与休整的起点。',
    image: new URL('@/assets/map_image/dirtmouth.png', import.meta.url).href,
  },
  {
    id: 'crystal-peak',
    name: '水晶山峰',
    description: '布满紫色水晶与危险传送带的平台区域，节奏紧凑、机关密集。',
    image: new URL('@/assets/map_image/crystal-peak.png', import.meta.url).href,
  },
  {
    id: 'greenpath',
    name: '苍绿之径',
    description: '被藤蔓与雾气覆盖的新手友好区域，拥有清新的自然景观与适中的战斗难度。',
    image: new URL('@/assets/map_image/greenpath.png', import.meta.url).href,
  },
  {
    id: 'forgotten-crossroads',
    name: '遗忘十字路',
    description: '地图的早期核心枢纽区域，连接多条主线路与隐藏场所。',
    image: new URL('@/assets/map_image/forgotten-crossroads.png', import.meta.url).href,
  },
  {
    id: 'resting-grounds',
    name: '安息之地',
    description: '肃穆而神圣的墓园区域，与梦想钉、剧情记忆密切相关。',
    image: new URL('@/assets/map_image/resting-grounds.png', import.meta.url).href,
  },
  {
    id: 'fog-canyon',
    name: '雾之峡谷',
    description: '被有毒雾气与水母敌人占据的复杂迷宫，是通往多处后期区域的关键通道。',
    image: new URL('@/assets/map_image/fog-canyon.png', import.meta.url).href,
  },
  {
    id: 'queens-gardens',
    name: '王后花园',
    description: '华丽而繁茂的植物区域，聚集了高难度敌人与精巧地形。',
    image: new URL('@/assets/map_image/queens-gardens.png', import.meta.url).href,
  },
  {
    id: 'fungal-wastes',
    name: '真菌荒地',
    description: '充满孢子与真菌生物的中期区域，拥有独特的视觉与音效风格。',
    image: new URL('@/assets/map_image/fungal-wastes.png', import.meta.url).href,
  },
  {
    id: 'city-of-tears',
    name: '泪水之城',
    description: '终日下雨的王城核心区域，以高耸建筑与纵向关卡设计著称。',
    image: new URL('@/assets/map_image/city-of-tears.png', import.meta.url).href,
  },
  {
    id: 'kingdoms-edge',
    name: '王国边缘',
    description: '位于地图最东侧的偏远区域，充满白色灰雪与高难敌人。',
    image: new URL('@/assets/map_image/kingdoms-edge.png', import.meta.url).href,
  },
  {
    id: 'hive',
    name: '蜂巢',
    description: '封闭的蜂巢结构区域，充斥着成群的蜂型敌人与蜂巢主题机关。',
    image: new URL('@/assets/map_image/hive.png', import.meta.url).href,
  },
  {
    id: 'deepnest',
    name: '深邃巢穴',
    description: '极其阴暗、充满恐惧氛围的地下隧道迷宫，是不少玩家的噩梦。',
    image: new URL('@/assets/map_image/deepnest.png', import.meta.url).href,
  },
  {
    id: 'royal-waterways',
    name: '皇家水道',
    description: '位于王城之下的污水与暗渠区域，连接着多处隐藏地点与 BOSS。',
    image: new URL('@/assets/map_image/royal-waterways.png', import.meta.url).href,
  },
  {
    id: 'ancient-basin',
    name: '古老盆地',
    description: '地图深处的核心剧情区域，与白色宫殿和终局内容紧密相关。',
    image: new URL('@/assets/map_image/ancient-basin.png', import.meta.url).href,
  },
])


const mapImageUrl = new URL('@/assets/map_image/hollow-knight-full-map.png', import.meta.url).href
</script>

<template>
  <div class="map-view-root">
    <PageTitle msg="地图" />
    <div class="map-main-wrapper">
      <InteractiveMap :regions="mapRegions" :image-url="mapImageUrl" />
    </div>
  </div>
</template>

<style scoped>
.map-view-root {
  width: 100%;
  min-height: 100vh;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-main-wrapper {
  margin-top: 19px;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
