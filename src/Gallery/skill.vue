<template>
  <div class="skills-page">

    <!-- 快速导航 -->
    <div class="nav-links">
      <a href="#spells" class="nav-link">法术</a>
      <a href="#abilities" class="nav-link">能力</a>
      <a href="#nail-arts" class="nav-link">骨钉技艺</a>
    </div>

    <!-- 法术模块 -->
    <section id="spells" class="section">
      <h2 class="section-title">法术</h2>
      <div class="section-subtitle">消耗灵魂释放的强大攻击</div>
      
      <div class="skills-list">
        <div 
          v-for="skill in filteredSkills('spell')" 
          :key="skill.id" 
          class="skill-item"
        >
          <div class="skill-content">
            <div class="skill-text">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <div class="skill-meta">
                <span class="skill-type">{{ skill.category }}</span>
              </div>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-details">
                <span class="skill-unlock">解锁地点: {{ skill.unlock }}</span>
                <span class="skill-effect">效果: {{ skill.effect }}</span>
              </div>
            </div>
            <div class="skill-image">
              <img 
                v-if="skill.imageUrl" 
                :src="skill.imageUrl" 
                :alt="skill.name"
                class="skill-img"
                @error="handleImageError"
                loading="lazy"
              />
              <div v-else class="image-placeholder">
                <span class="placeholder-text">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 能力模块 -->
    <section id="abilities" class="section">
      <h2 class="section-title">能力</h2>
      <div class="section-subtitle">增强移动和探索的被动技能</div>
      
      <div class="skills-list">
        <div 
          v-for="skill in filteredSkills('ability')" 
          :key="skill.id" 
          class="skill-item"
        >
          <div class="skill-content">
            <div class="skill-text">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <div class="skill-meta">
                <span class="skill-type">{{ skill.category }}</span>
              </div>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-details">
                <span class="skill-unlock">解锁地点: {{ skill.unlock }}</span>
                <span class="skill-effect">效果: {{ skill.effect }}</span>
              </div>
            </div>
            <div class="skill-image">
              <img 
                v-if="skill.imageUrl" 
                :src="skill.imageUrl" 
                :alt="skill.name"
                class="skill-img"
                @error="handleImageError"
                loading="lazy"
              />
              <div v-else class="image-placeholder">
                <span class="placeholder-text">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 骨钉技艺模块 -->
    <section id="nail-arts" class="section">
      <h2 class="section-title">骨钉技艺</h2>
      <div class="section-subtitle">需要蓄力释放的强大剑技</div>
      
      <div class="skills-list">
        <div 
          v-for="skill in filteredSkills('nail-art')" 
          :key="skill.id" 
          class="skill-item"
        >
          <div class="skill-content">
            <div class="skill-text">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <div class="skill-meta">
                <span class="skill-type">{{ skill.category }}传授</span>
              </div>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-details">
                <span class="skill-unlock">解锁地点: {{ skill.unlock }}</span>
                <span class="skill-effect">效果: {{ skill.effect }}</span>
              </div>
            </div>
            <div class="skill-image">
              <img 
                v-if="skill.imageUrl" 
                :src="skill.imageUrl" 
                :alt="skill.name"
                class="skill-img"
                @error="handleImageError"
                loading="lazy"
              />
              <div v-else class="image-placeholder">
                <span class="placeholder-text">{{ skill.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 技能数据 - 更新所有图片URL
const skillsData = ref([
  // 法术
  { 
    id: 1, 
    name: '复仇之魂', 
    type: 'spell', 
    description: '召唤一个向前飞行的魂灵，燃烧路径上的敌人。魂灵需要灵魂来施放。劈砍敌人收集灵魂。', 
    unlock: '遗忘十字路', 
    effect: '远程攻击', 
    category: '基础',
    imageUrl: 'https://huiji-public.huijistatic.com/hkss/uploads/6/66/Icon_HK_Vengeful_Spirit_Art.png'
  },
  { 
    id: 2, 
    name: '荒芜俯冲', 
    type: 'spell', 
    description: '集中灵魂力量打击地面。这种力量可以摧毁敌人或破坏脆弱的结构。力量需要灵魂才能施放。', 
    unlock: '水晶山峰', 
    effect: '地面冲击', 
    category: '冲击',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c3/Desolate_Dive.png/292px-Desolate_Dive.png'
  },
  { 
    id: 3, 
    name: '嚎叫幽灵', 
    type: 'spell', 
    description: '用嚎叫的灵魂轰击敌人。幽灵需要灵魂来召唤。劈砍敌人收集灵魂。', 
    unlock: '雾之峡谷', 
    effect: '上方攻击', 
    category: '范围',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/ba/Howling_Wraiths.png/292px-Howling_Wraiths.png'
  },
  { 
    id: 4, 
    name: '暗影之魂', 
    type: 'spell', 
    description: '召唤一个向前飞行的阴影，燃烧路径上的敌人。阴影需要灵魂来施放。劈砍敌人收集灵魂。', 
    unlock: '古老盆地', 
    effect: '穿透攻击', 
    category: '进阶',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/89/Shade_Soul.png/292px-Shade_Soul.png'
  },
  { 
    id: 5, 
    name: '黑暗降临', 
    type: 'spell', 
    description: '集中灵魂和暗影的力量打击地面。这种力量可以摧毁敌人或破坏脆弱的结构。力量需要灵魂才能施放。', 
    unlock: '深渊', 
    effect: '无敌冲击', 
    category: '进阶',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/8e/Descending_Dark.png/292px-Descending_Dark.png'
  },
  { 
    id: 6, 
    name: '深渊尖啸', 
    type: 'spell', 
    description: '用嚎叫的灵魂和暗影轰击敌人。幽灵需要灵魂来召唤。劈砍敌人收集灵魂。', 
    unlock: '深渊', 
    effect: '全屏攻击', 
    category: '进阶',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/2/27/Abyss_Shriek.png/292px-Abyss_Shriek.png'
  },
  
  // 能力
  { 
    id: 7, 
    name: '蛾翼披风', 
    type: 'ability', 
    description: '蛾翅线编制的披风。让穿着者可在地面或空中向前冲刺。', 
    unlock: '真菌荒地', 
    effect: '冲刺移动', 
    category: '移动',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/87/Icon_HK_Mothwing_Cloak_Art.png/292px-Icon_HK_Mothwing_Cloak_Art.png'
  },
  { 
    id: 8, 
    name: '螳螂爪', 
    type: 'ability', 
    description: '用骨头雕刻的爪子。允许使用者紧贴墙壁并在墙上跳跃。', 
    unlock: '螳螂村', 
    effect: '爬墙能力', 
    category: '探索',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/be/Icon_HK_Mantis_Claw_Art.png/292px-Icon_HK_Mantis_Claw_Art.png'
  },
  { 
    id: 9, 
    name: '水晶之心', 
    type: 'ability', 
    description: '一个古老挖矿魔像的能量核心，以一块强力的水晶塑成。水晶的能量可以被引导，能将持有者以危险的速度向前发射出去。', 
    unlock: '水晶山峰', 
    effect: '超级冲刺', 
    category: '移动',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/7/7c/Icon_HK_Crystal_Heart_Art.png/292px-Icon_HK_Crystal_Heart_Art.png'
  },
  { 
    id: 10, 
    name: '帝王之翼', 
    type: 'ability', 
    description: '在黑暗中闪烁的虚无翅膀。允许持有者在空中再次跳跃。', 
    unlock: '古老盆地', 
    effect: '二段跳', 
    category: '移动',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/ea/Icon_HK_Monarch_Wings_Art.png/292px-Icon_HK_Monarch_Wings_Art.png'
  },
  { 
    id: 11, 
    name: '伊思玛的眼泪', 
    type: 'ability', 
    description: '由一滴硬化的眼泪形成的果实。摄入后，它能够保护持有者免受圣巢某些地方的酸性水池灼伤。', 
    unlock: '皇家水道', 
    effect: '酸水免疫', 
    category: '防御',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/5/57/Icon_HK_Ismas_Tear_Art.png/292px-Icon_HK_Ismas_Tear_Art.png'
  },
  { 
    id: 12, 
    name: '暗影披风', 
    type: 'ability', 
    description: '由深渊的物质形成的披风。允许穿戴者冲刺时穿过敌人和他们的攻击而不受到伤害。', 
    unlock: '深渊', 
    effect: '冲刺无敌', 
    category: '战斗',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/0/0f/Icon_HK_Shade_Cloak_Art.png/292px-Icon_HK_Shade_Cloak_Art.png'
  },
  { 
    id: 13, 
    name: '梦之钉', 
    type: 'ability', 
    description: '允许挥动者割开梦境和现实的面纱。可以用来揭开隐藏的梦境或打开通路。梦之钉可以收集残存愿望和梦想的精华。', 
    unlock: '安息之地', 
    effect: '读取梦境', 
    category: '特殊',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/b9/Icon_HK_Dream_Nail_Art.png/292px-Icon_HK_Dream_Nail_Art.png'
  },
  { 
    id: 14, 
    name: '梦之门', 
    type: 'ability', 
    description: '允许梦之钉的挥动者通过梦境进行瞬间传送。', 
    unlock: '收集900精华', 
    effect: '快速传送', 
    category: '探索',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/d/d3/Icon_HK_Dreamgate_Art.png/292px-Icon_HK_Dreamgate_Art.png'
  },
  
  // 骨钉技艺
  { 
    id: 15, 
    name: '强力劈砍', 
    type: 'nail-art', 
    description: '骨钉大师席奥的标志动作。劈砍产生巨大的弧线，对面前敌人造成额外的伤害。', 
    unlock: '席奥的洞穴', 
    effect: '前方大范围高伤害', 
    category: '席奥',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/a/a7/Icon_HK_Great_Slash_Art.png/292px-Icon_HK_Great_Slash_Art.png'
  },
  { 
    id: 16, 
    name: '冲刺劈砍', 
    type: 'nail-art', 
    description: '骨钉大师奥罗的标志动作。向前冲刺后快速攻击。', 
    unlock: '奥罗的洞穴', 
    effect: '冲刺中攻击', 
    category: '奥罗',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/3/3a/Icon_HK_Dash_Slash_Art.png/292px-Icon_HK_Dash_Slash_Art.png'
  },
  { 
    id: 17, 
    name: '旋风劈砍', 
    type: 'nail-art', 
    description: '骨钉大师马托的标志动作。快速打击各方位敌人的旋转攻击。', 
    unlock: '马托的洞穴', 
    effect: '360度旋转攻击', 
    category: '马托',
    imageUrl: 'https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/f/f3/Icon_HK_Cyclone_Slash_Art.png/292px-Icon_HK_Cyclone_Slash_Art.png'
  }
])

// 计算属性
const filteredSkills = (type) => {
  return skillsData.value.filter(skill => skill.type === type)
}

</script>

<style scoped>
/* 基础样式 - 所有背景都改为纯黑色 */
.skills-page {
  min-height: 100vh;
  background: #000000;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  margin: 0 auto; /* 保留居中，若后续局部内容需要约束，不影响整体 */
  width: 100%; /* 保留：铺满父容器宽度 */
  box-sizing: border-box; /* 保留：防止 padding 撑开宽度 */
}

/* 页面标题 */
.page-header {
  text-align: center;
  padding: 40px 20px 30px;
  border-bottom: 1px solid #333;
  margin-bottom: 30px;
  background: #000000;
}

.page-header h1 {
  font-size: 2.2rem;
  margin: 0;
  color: #fff;
  font-weight: 600;
}

/* 导航链接 */
.nav-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
  background: #000000;
}

.nav-link {
  color: #aaa;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 8px 16px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #fff;
}

/* 技能模块 */
.section {
  margin-bottom: 60px;
  background: #000000;
}

.section-title {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  color: #fff;
  font-weight: 600;
}

.section-subtitle {
  color: #888;
  margin-bottom: 30px;
  font-size: 1rem;
}

/* 技能列表 */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 技能项目 - 改为黑色背景，保留边框 */
.skill-item {
  background: #000000;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 20px;
}

.skill-content {
  display: flex;
  gap: 30px;
}

.skill-text {
  flex: 1;
}

/* 技能名称 */
.skill-name {
  font-size: 1.4rem;
  margin: 0 0 10px 0;
  color: #fff;
  font-weight: 600;
}

/* 技能元信息 */
.skill-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.skill-cost {
  color: #4dabf7;
  background: rgba(77, 171, 247, 0.1);
  padding: 4px 10px;
  border-radius: 3px;
}

.skill-type {
  color: #aaa;
  background: rgba(170, 170, 170, 0.1);
  padding: 4px 10px;
  border-radius: 3px;
}

/* 技能描述 */
.skill-description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

/* 技能详情 */
.skill-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: #999;
}

.skill-unlock, .skill-effect {
  display: block;
}

/* 技能图片区域 */
.skill-image {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 技能图片样式 */
.skill-img {
  max-width: 120%;
  max-height: 190px;
  object-fit: contain;
  background: #000000;
}

/* 图片占位符 - 改为黑色背景 */
.image-placeholder {
  width: 100%;
  height: 140px;
  background: #000000;
  border: 1px solid #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  padding: 10px;
}

.placeholder-text {
  color: #777;
}



/* 响应式设计 */
@media (max-width: 900px) {
  .skill-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .skill-image {
    width: 100%;
    height: auto;
  }
  
  .skill-img {
    max-height: 200px;
    width: 100%;
    height: auto;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .skills-page {
    padding: 15px;
  }
  
  .page-header {
    padding: 30px 15px 20px;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .skill-item {
    padding: 15px;
  }
  
  .skill-meta {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .skill-details {
    font-size: 0.85rem;
  }
}
</style>