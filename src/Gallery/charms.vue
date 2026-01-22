<template>
  <!-- 使用容器包装内容 -->
  <div class="gallery-wrapper">
    <PageTitle msg="图鉴" />
    
    <!-- 图鉴内容区域 -->
    <div class="gallery-content">
      <div class="search-section">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="搜索护符..." 
          class="search-input"
        />
        <div class="total-count">共 {{ filteredCharms.length }} / 45 个护符</div>
      </div>
      
      <!-- 护符网格 -->
      <div class="charms-grid">
        <!-- 使用 v-for 渲染所有护符 -->
        <div 
          v-for="charm in filteredCharms" 
          :key="charm.id"
          class="charm-item"
          :class="{ 'charm-owned': charm.owned }"
        >
          <div class="charm-icon">
            <div class="sprite" :style="getSpriteStyle(charm.spriteX, charm.spriteY)"></div>
            <div class="charm-notch-cost" v-if="charm.notchCost > 0">
              {{ charm.notchCost }}
            </div>
          </div>
          <div class="charm-text">
            <h3>{{ charm.name }}</h3>
            <p>{{ charm.description }}</p>
            <div class="charm-meta">
              <span class="charm-type">{{ charm.type }}</span>
              <span class="charm-location">{{ charm.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 护符数据数组 - 45个空洞骑士护符
const charmsData = ref([
  { id: 1, name: '任性的指南针', description: '当地图打开时，将其位置告诉佩戴者，允许漫游者进行精确定位。', spriteX: 0, spriteY: 0, notchCost: 1, type: '实用', location: '遗忘十字路', owned: true },
  { id: 2, name: '采集虫群', description: '虫群将跟随持有者并收集任何散落的吉欧。适合那些无论多细小的东西都不愿意丢下的人。', spriteX: -100, spriteY: 0, notchCost: 1, type: '收集', location: '真菌荒地', owned: true },
  { id: 3, name: '坚硬外壳', description: '加强韧性。当从伤害中恢复时，延长持有者保持不受伤害的时间。使其更容易在危险情形下逃脱。', spriteX: -200, spriteY: 0, notchCost: 2, type: '防御', location: '遗忘十字路', owned: true },
  { id: 4, name: '灵魂捕手', description: '萨满曾用它来从周围的世界中吸取更多灵魂。增加用骨钉攻击敌人时获得的灵魂数量。', spriteX: -300, spriteY: 0, notchCost: 1, type: '灵魂', location: '遗忘十字路', owned: true },
  { id: 5, name: '萨满之石', description: '据说包含前代萨满的学识。提高法术的威力，对敌人造成更多伤害。', spriteX: -400, spriteY: 0, notchCost: 3, type: '灵魂', location: '灵魂圣所', owned: false },
  { id: 6, name: '噬魂者', description: '被遗忘的萨满神器，用来从活着的生物身上吸取灵魂。大大增加用骨钉攻击敌人时获得的灵魂数量。', spriteX: -500, spriteY: 0, notchCost: 4, type: '灵魂', location: '古老盆地', owned: false },
  { id: 7, name: '冲刺大师', description: '有着被称为“冲刺大师”的古怪虫子形象。持有者将能够更频繁地冲刺，也能向下冲刺。非常适合那些想要快速移动的虫子。', spriteX: -600, spriteY: 0, notchCost: 2, type: '移动', location: '真菌荒地', owned: false },
  { id: 8, name: '飞毛腿', description: '有着被称为“飞毛腿”的古怪虫子形象。增加持有者的奔跑速度，使其能避开危险或追上敌人。', spriteX: -700, spriteY: 0, notchCost: 1, type: '移动', location: '真菌荒地', owned: false },
  { id: 9, name: '幼虫之歌', description: '包含被解救的幼虫的感激。受到伤害时获得灵魂。', spriteX: -800, spriteY: 0, notchCost: 1, type: '灵魂', location: '遗忘十字路', owned: true },
  { id: 10, name: '蜕变挽歌', description: '包含将要步入生命的下一个阶段的幼虫的感激。为武器灌输神圣的力量。当持有者处于满血状态时，能从骨钉中射出白热能量束。', spriteX: 0, spriteY: -100, notchCost: 3, type: '攻击', location: '遗忘十字路', owned: false },
  { id: 11, name: '易碎心脏', description: '增加持有者的生命值，承受更多伤害。这个护符十分脆弱，如果它的持有者被杀死就会损坏。', spriteX: -100, spriteY: -100, notchCost: 2, type: '生命', location: '德特茅斯', owned: false },
  { id: 12, name: '坚固心脏', description: '增加持有者的生命值，承受更多伤害。这个护符很坚固，不会破碎。', spriteX: -300, spriteY: -100, notchCost: 2, type: '生命', location: '德特茅斯', owned: false },
  { id: 13, name: '易碎贪婪', description: '使得持有者在击败敌人时能找到更多的吉欧。这个护符十分脆弱，如果它的持有者被杀死就会损坏。', spriteX: -400, spriteY: -100, notchCost: 2, type: '收集', location: '德特茅斯', owned: false },
  { id: 14, name: '坚固贪婪', description: '使得持有者在击败敌人时能找到更多的吉欧。这个护符很坚固，不会破碎。', spriteX: -600, spriteY: -100, notchCost: 2, type: '收集', location: '德特茅斯', owned: false },
  { id: 15, name: '易碎力量', description: '增强持有者的攻击力，使其骨钉能够对敌人造成更多伤害。这个护符十分脆弱，如果它的持有者被杀死就会损坏。', spriteX: -700, spriteY: -100, notchCost: 3, type: '攻击', location: '德特茅斯', owned: false },
  { id: 16, name: '坚固力量', description: '增强持有者的攻击力，使其骨钉能够对敌人造成更多伤害。这个护符很坚固，不会破碎。', spriteX: 0, spriteY: -200, notchCost: 3, type: '攻击', location: '德特茅斯', owned: false },
  { id: 17, name: '法术扭曲者', description: '反映了灵魂圣所掌握灵魂力量的欲望，可以提高持有者的施法能力。减少法术的灵魂消耗。', spriteX: -100, spriteY: -200, notchCost: 2, type: '灵魂', location: '灵魂圣所', owned: false },
  { id: 18, name: '稳定之体', description: '防止持有者用骨钉劈砍敌人时产生后坐力。让人保持稳定，持续攻击。', spriteX: -200, spriteY: -200, notchCost: 1, type: '攻击', location: '水晶山峰', owned: false },
  { id: 19, name: '沉重之击', description: '阵亡战士的骨钉形成。增加持有者骨钉的力量，使敌人在被击中时后退的距离更远。', spriteX: -300, spriteY: -200, notchCost: 2, type: '攻击', location: '泪水之城', owned: true },
  { id: 20, name: '快速劈砍', description: '诞生于那些被融合的不完美的废弃骨钉。允许持有者更快地挥砍骨钉。', spriteX: -400, spriteY: -200, notchCost: 3, type: '攻击', location: '王国边缘', owned: false },
  { id: 21, name: '修长之钉', description: '增加持有者骨钉的攻击范围，允许打击更远处的敌人。', spriteX: -500, spriteY: -200, notchCost: 2, type: '攻击', location: '城市仓库', owned: true },
  { id: 22, name: '骄傲印记', description: '由螳螂部落慷慨赠予他们尊敬的人。大大增加持有者骨钉的攻击范围，使其能够从更远处劈砍敌人。', spriteX: -600, spriteY: -200, notchCost: 3, type: '攻击', location: '螳螂村', owned: false },
  { id: 23, name: '亡者之怒', description: '体现了那些将死之人的愤怒和英勇。当接近死亡时，持有者的力量会增加。', spriteX: -700, spriteY: -200, notchCost: 2, type: '攻击', location: '王国边缘', owned: false },
  { id: 24, name: '苦痛荆棘', description: '感受持有者的痛苦并鞭打周围的世界。当受到伤害时，产生荆棘藤蔓伤害附近的敌人。', spriteX: -800, spriteY: -200, notchCost: 1, type: '反击', location: '绿色小径', owned: true },
  { id: 25, name: '巴德尔之壳', description: '在凝聚灵魂时，产生硬壳保护它的持有者。外壳不是无法破坏的，吸收太多的伤害后将会破碎。', spriteX: 0, spriteY: -300, notchCost: 2, type: '防御', location: '德特茅斯', owned: true },
  { id: 26, name: '吸虫之巢', description: '吸虫之母肠道诞生的活的护符。将复仇之魂法术变成一群不稳定的幼小吸虫。', spriteX: -100, spriteY: -300, notchCost: 3, type: '灵魂', location: '真菌荒地', owned: false },
  { id: 27, name: '防御者纹章', description: '圣巢国王赋予最忠诚的骑士的独特护符。虽然有些刮痕和污渍，但依旧保存得很好。让持有者散发出英勇的气息。', spriteX: -200, spriteY: -300, notchCost: 1, type: '防御', location: '雾之峡谷', owned: false },
  { id: 28, name: '发光子宫', description: '从持有者的身上汲取灵魂，用来产生幼崽。幼崽没有进食或成长的意愿，并会牺牲自己来保护它们的父母。', spriteX: -300, spriteY: -300, notchCost: 2, type: '召唤', location: '皇家水道', owned: false },
  { id: 29, name: '快速凝聚', description: '包含水晶镜片的护符。提升灵魂的凝聚速度，让持有者更快地治愈伤口。', spriteX: -400, spriteY: -300, notchCost: 3, type: '灵魂', location: '水晶山峰', owned: false },
  { id: 30, name: '深度凝聚', description: '在水晶内长时间自然形成。从周围的空气中吸取灵魂。持有者会以更慢的速度凝聚灵魂，但治疗效果会加倍。', spriteX: -500, spriteY: -300, notchCost: 4, type: '灵魂', location: '水晶山峰', owned: false },
  { id: 31, name: '生命血之心', description: '包含一个活着的核心，浸出宝贵的生命血。休息时，持有者被生命血包裹，可以防止少量伤害。', spriteX: -600, spriteY: -300, notchCost: 2, type: '生命', location: '古老盆地', owned: false },
  { id: 32, name: '生命血核心', description: '包含一个活着的核心，流出宝贵的生命血。休息时，持有者被生命血包裹，可以防止大量伤害。', spriteX: -700, spriteY: -300, notchCost: 3, type: '生命', location: '古老盆地', owned: false },
  { id: 33, name: '乔尼的祝福', description: '由仁慈的异教徒乔尼给予的祝福，将生命流体变成蓝色的生命血。持有者将拥有一个更健康的外壳，可以承受更多的伤害，但不能够通过凝聚灵魂自愈。', spriteX: -800, spriteY: -300, notchCost: 4, type: '生命', location: '王后花园', owned: false },
  { id: 34, name: '蜂巢之血', description: '蜂巢中珍贵的金色硬化花蜜块。随时间修复持有者的伤口，使其回复生命值而不需凝聚灵魂。', spriteX: 0, spriteY: -400, notchCost: 4, type: '生命', location: '蜂巢', owned: false },
  { id: 35, name: '蘑菇孢子', description: '由活的真菌物质组成。当暴露于灵魂之下时，能散发出孢子。当凝聚灵魂时，发射孢子云，缓慢伤害敌人。', spriteX: -100, spriteY: -400, notchCost: 1, type: '毒系', location: '真菌荒地', owned: false },
  { id: 36, name: '锋利之影', description: '含有被禁用的法术，能将影子转换为致命的武器。当使用暗影冲刺时，持有者的身体会变得锋利，并伤害敌人。', spriteX: -200, spriteY: -400, notchCost: 2, type: '移动', location: '深渊', owned: false },
  { id: 37, name: '乌恩之形', description: '让持有者展现出内在的乌恩形态。当凝聚灵魂时，持有者将展现出新的外形，并可以自由移动以避开敌人。', spriteX: -300, spriteY: -400, notchCost: 2, type: '灵魂', location: '雾之峡谷', owned: false },
  { id: 38, name: '骨钉大师的荣耀', description: '包含一个骨钉大师的激情、技能和遗憾。提高持有者对骨钉技艺的掌握，使其更快地集中力量并释放技艺。', spriteX: -400, spriteY: -400, notchCost: 1, type: '攻击', location: '德特茅斯', owned: true },
  { id: 39, name: '编织者之歌', description: '一个缠丝的护符，蕴含着那些离开圣巢返回家乡的编织者所留下的离别之歌。生成编织者幼体，陪伴并保护孤独寂寞的持有者。', spriteX: -500, spriteY: -400, notchCost: 2, type: '召唤', location: '深邃巢穴', owned: false },
  { id: 40, name: '舞梦者', description: '专门给挥动梦之钉和收集精华的人准备的临时护符。允许持有者更快地对梦之钉充能，并在击中敌人时收集更多灵魂。', spriteX: -600, spriteY: -400, notchCost: 1, type: '工具', location: '安息之地', owned: false },
  { id: 41, name: '梦之盾', description: '曾经被一个能塑造梦境的部落所使用的防御性护符。召唤出一面跟随持有者的盾牌，试图使其受到保护。', spriteX: -700, spriteY: -400, notchCost: 3, type: '防御', location: '安息之地', owned: true },
  { id: 42, name: '格林之子', description: '参与格林剧团的仪式需要佩戴的护符。持有者需要寻找格林亲族并收集它们的火焰。尚未收集的火焰将会标记在持有者的地图上。', spriteX: -200, spriteY: -500, notchCost: 2, type: '召唤', location: '德特茅斯', owned: true },
  { id: 43, name: '无忧旋律', description: '纪念一份友谊建立的信物。包含一首可能使持有者免受伤害的守护之歌。', spriteX: -300, spriteY: -500, notchCost: 3, type: '防御', location: '德特茅斯', owned: false },
  { id: 44, name: '国王之魂', description: '象征着高等生灵相互结合的圣洁护符。持有者能慢慢吸收其中无限的灵魂。能打开通往出生地的道路。', spriteX: -600, spriteY: -500, notchCost: 5, type: '特殊', location: '古老盆地', owned: false },
  { id: 45, name: '虚空之心', description: '隐藏在内部的空虚，现在不再受到约束。使虚空在持有者的意志下联合起来。这个护符是持有者的一部分，不能卸下。', spriteX: -700, spriteY: -500, notchCost: 0, type: '特殊', location: '深渊', owned: false }
])
// 搜索查询
const searchQuery = ref('')

// 过滤后的护符
const filteredCharms = computed(() => {
  if (!searchQuery.value) {
    return charmsData.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return charmsData.value.filter(charm => 
    charm.name.toLowerCase().includes(query) ||
    charm.description.toLowerCase().includes(query) ||
    charm.type.toLowerCase().includes(query) ||
    charm.location.toLowerCase().includes(query)
  )
})

// 定义精灵图URL和方法
const getSpriteStyle = (x: number, y: number) => {
  const spriteSheetUrl = 'https://huiji-public.huijistatic.com/hkss/uploads/1/13/HK_Charms_Sprite.png'
  return {
    backgroundImage: `url(${spriteSheetUrl})`,
    backgroundPosition: `${x}px ${y}px`,
  }
}
</script>

<style scoped>
.gallery-wrapper {
  min-height: 100vh;
  box-sizing: border-box;
}

/* 图鉴内容区域 */
.gallery-content {
  text-align: center;
  padding: 0 20px 40px;
  max-width: none;
  margin: 0 auto;
  box-sizing: border-box;
  width:100%;
}

/* 搜索区域 */
.search-section {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  outline: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.total-count {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
}

/* 护符网格布局 */
.charms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 20px;
  width: 100%; 
  max-width: 1600px; 
  margin-left: auto; 
  margin-right: auto;
  box-sizing: border-box;
  padding: 0 20px; 
}

/* 护符项目样式 */
.charm-item {
  background: black;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.charm-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.charm-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.charm-item:hover::before {
  height: 5px;
  opacity: 1;
}

/* 护符图标样式 */
.charm-icon {
  flex-shrink: 0;
  margin-right: 20px;
  position: relative;
}

.sprite {
  width: 100px;
  height: 100px;
  background-size: 900px 600px;
  image-rendering: pixelated;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.charm-notch-cost {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #FF416C, #FF4B2B);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* 护符文字区域 */
.charm-text {
  text-align: left;
  flex-grow: 1;
}

.charm-text h3 {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.charm-text p {
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 护符元信息 */
.charm-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.charm-type, .charm-location {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.charm-type {
  background: rgba(76, 175, 80, 0.2);
  color: #8BC34A;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.charm-location {
  background: rgba(33, 150, 243, 0.2);
  color: #64B5F6;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

/* 大屏幕响应式 */
@media (max-width: 1400px) {
  .gallery-content {
    max-width: 1200px;
  }
  
  .charms-grid {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
}

/* 中屏幕响应式 */
@media (max-width: 1200px) {
  .gallery-content {
    max-width: 1000px;
  }
  
  .charms-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

/* 平板响应式 */
@media (max-width: 900px) {
  .gallery-wrapper {
    padding-top: 240px;
  }
  
  .charms-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }
  
  .charm-item {
    padding: 18px;
  }

  
  .charm-icon {
    margin-right: 18px;
  }
}

/* 小屏平板响应式 */
@media (max-width: 700px) {
  .gallery-wrapper {
    padding-top: 220px;
  }
  
  .charms-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .search-input {
    max-width: 400px;
  }
}

/* 手机响应式 */
@media (max-width: 480px) {
  .gallery-wrapper {
    padding-top: 200px;
  }
  
  .gallery-content {
    padding: 0 15px 30px;
  }
  
  .charms-grid {
    gap: 15px;
  }
  
  .charm-item {
    padding: 15px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .charm-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .charm-text {
    text-align: center;
  }
  
  .charm-text h3 {
    font-size: 1.3rem;
  }
  
  .charm-text p {
    font-size: 0.95rem;
  }
  

  .charm-meta {
    justify-content: center;
  }
  
  .search-input {
    max-width: 100%;
    font-size: 0.95rem;
  }
}

/* 超小屏幕响应式 */
@media (max-width: 375px) {
  .gallery-wrapper {
    padding-top: 180px;
  }
  
  .charm-item {
    padding: 12px;
  }
  

  .charm-text h3 {
    font-size: 1.2rem;
  }
  
  .total-count {
    font-size: 1rem;
  }
}
</style>