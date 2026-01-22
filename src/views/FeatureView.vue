<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { ref, computed, nextTick } from 'vue'

const activeSection = ref<'art' | 'music'>('art');
const selectedArtCategory = ref<string | null>(null);
const currentImageIndex = ref(0);

const artData = [
    { 
        id: 'concept',
        title: "概念草图", 
        url: "https://di.gameres.com/attachment/forum/201807/09/114211os4vlsx174z7331j.jpg", 
        desc: "早期的地图设计，奠定了圣巢的基调。" 
    },
    { 
        id: 'scene',
        title: "地图设计", 
        url: "https://huiji-public.huijistatic.com/hkss/uploads/d/d8/Map_Prompt.png", 
        desc: "错综复杂的地下世界，每一个区域都有其独特的生态系统与美术风格。" 
    },
    { 
        id: 'char',
        title: "角色设定", 
        url: "https://static.wikia.nocookie.net/hollowknight/images/2/29/Hornet_Icon.png", 
        desc: "简洁而富有表现力的昆虫拟人化设计，赋予了每一个角色鲜活的生命力。" 
    },
    { 
        id: 'boss',
        title: "BOSS设计", 
        url: "https://huiji-public.huijistatic.com/hkss/uploads/1/17/B_Grey_Prince_Zote.png", 
        desc: "极具压迫感的视觉设计，将昆虫特征与超现实的体型夸张完美融合。" 
    }
];

const artDetails: Record<string, { title: string, desc: string, images: {url: string, caption: string, intro?: string}[] }> = {
    concept: {
        title: "概念草图",
        desc: "在《空洞骑士》的早期开发阶段，Ari Gibson 绘制了大量的概念草图来探索圣巢的视觉风格。这些草图展示了从最初的线条到最终阴郁而精美的环境风格的演变过程。",
        images: [
            { url: "https://di.gameres.com/attachment/forum/201807/09/114211sgm3ff39fusftzz9.jpg", caption: "《空洞骑士》的早期概念图，当时的想法是利用随机生成的方式来将各个房间连接起来。这个设计思路最后没有采用。" },
            // Placeholder URLs - ideally these would be more unique concept arts
            { url: "https://di.gameres.com/attachment/forum/201807/09/114213jfgflfju1hshfh6h.jpg", caption: "这张图上的数字反映，如何通过线性进展的方式，解锁各个区域。樱桃小组最终弱化了这些非常严格的路线。" },
            { url: "https://di.gameres.com/attachment/forum/201807/09/114215rgizjjfhciquf74h.jpg", caption: "空巢全地图，又进展了相当一大步。巨大的骸骨森林被移到了地图的底部，最后则完全砍掉了。" },
            { url: "https://di.gameres.com/attachment/forum/201807/09/114217wwm593wzbuz3wo9x.jpg", caption: "最终呈现在完成版游戏中的《空洞骑士》的完整世界。" }
        ]
    },
    scene: {
        title: "场景设计",
        desc: "圣巢的每一个区域都有其独特的生态系统和色调。从苍绿之径的生机勃勃到深邃巢穴的压抑黑暗，场景设计不仅仅是背景，更是叙事的一部分。",
        images: [
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/e/e4/Screenshot_HK_Ancient_Basin_07.png/640px-Screenshot_HK_Ancient_Basin_07.png", caption: "古老盆地" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/b5/Screenshot_HK_City_of_Tears_03.png/640px-Screenshot_HK_City_of_Tears_03.png", caption: "泪水之城" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/6/60/Screenshot_HK_Crystal_Peak_01.png/640px-Screenshot_HK_Crystal_Peak_01.png", caption: "水晶山峰" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/3/3b/Screenshot_HK_Deepnest_07.png/640px-Screenshot_HK_Deepnest_07.png", caption: "深邃巢穴" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/b/b3/Screenshot_HK_Fog_Canyon_01.png/640px-Screenshot_HK_Fog_Canyon_01.png", caption: "雾之峡谷" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/8d/Screenshot_HK_Forgotten_Crossroads_12.png/640px-Screenshot_HK_Forgotten_Crossroads_12.png", caption: "遗忘十字路" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/1/1f/Screenshot_HK_Fungal_Wastes_01.png/640px-Screenshot_HK_Fungal_Wastes_01.png", caption: "真菌荒地" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/81/Screenshot_HK_Greenpath_07.png/640px-Screenshot_HK_Greenpath_07.png", caption: "苍绿之径" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/8/80/Screenshot_HK_Howling_Cliffs_01.png/640px-Screenshot_HK_Howling_Cliffs_01.png", caption: "呼啸悬崖" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/2/25/Screenshot_HK_Kingdoms_Edge_01.png/640px-Screenshot_HK_Kingdoms_Edge_01.png", caption: "王国边缘" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/c/c2/Screenshot_HK_Dreamers_03.png/640px-Screenshot_HK_Dreamers_03.png", caption: "安息之地" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/9/90/Screenshot_HK_Royal_Waterways_01.png/640px-Screenshot_HK_Royal_Waterways_01.png", caption: "皇家水道" },
            { url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/5/57/Screenshot_HK_Queens_Gardens_03.png/640px-Screenshot_HK_Queens_Gardens_03.png", caption: "王后花园" }
        ]
    },
    char: {
        title: "角色设定",
        desc: "简单而富有表现力的角色设计是游戏的标志。每一个角色，无论大小，都拥有独特的轮廓和个性。",
        images: [
            { 
                url: "https://static.wikia.nocookie.net/hollowknight/images/2/29/Hornet_Icon.png", 
                caption: "大黄蜂",
                intro: "大黄蜂（Hornet）是《空洞骑士》中的一个主线 NPC，同时也是《空洞骑士：丝之歌》的主角。她是圣巢遗迹神秘的守护公主，用致命的技巧挥舞着针与丝线来战斗。"
            },
            { 
                url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/1/16/Knight_Action.png/348px-Knight_Action.png", 
                caption: "小骑士",
                intro: "小骑士是《空洞骑士》的主角，出生于深渊，是苍白之王与白色夫人结合的产物之一。他的外壳内部盛有虚空，象征着他与其他容器的联系。小骑士在游戏开始时只有一根旧骨钉，随着冒险的进行，他逐渐获得更多技能和物品，帮助他在圣巢中探索和战斗。"
            }
        ]
    },
    boss: {
        title: "BOSS设计",
        desc: "BOSS的视觉设计极具张力，将昆虫的生物特征与超现实的体型夸张相结合。每一个BOSS的轮廓剪影都经过精心打磨，仅凭身形便能传达出其力量感与压迫力。",
        images: [
            { 
                url: "https://huiji-public.huijistatic.com/hkss/uploads/1/17/B_Grey_Prince_Zote.png", 
                caption: "灰色王子左特",
                intro: "设计上夸大了左特的体型，赋予了他幻想中的健硕肌肉与英勇站姿。手中原本粗糙的木剑被美化为神兵利器，整体形象充满了一种滑稽的英雄主义色彩，与现实中瘦小的他形成鲜明对比。"
            },
            { 
                url: "https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/1/13/The_Hollow_Knight_Idle.png/584px-The_Hollow_Knight_Idle.png", 
                caption: "空洞骑士",
                intro: "作为成长后的容器，他拥有高大而修长的身躯，披风破败却仍显威严。面具上巨大的裂痕与断裂的手臂导致的不对称美感，配合不断渗出的橙色瘟疫光芒，在视觉上营造出一种悲剧性的崇高。" 
            },
            { 
                url: "https://huiji-public.huijistatic.com/hkss/uploads/5/52/B_Radiance.png", 
                caption: "辐光", 
                intro: "基于飞蛾的形态设计，拥有巨大的发光羽翼与复眼。全身散发着神圣而刺眼的金色光芒，数根如王冠般的长角直指天际，这种空灵而压迫感十足的造型完美诠释了“古老光芒”的概念。"
            }
        ]
    }
};

const getMusicUrl = (name: string) => new URL(`../assets/music/${name}`, import.meta.url).href;

const musicData = [
    { id: 1, title: "Enter Hallownest", duration: "1:29", desc: "主菜单界面，带着一丝苍凉与神秘，旅程的开始。", file: "01 - Enter Hallownest.mp3" },
    { id: 2, title: "Dirtmouth", duration: "1:55", desc: "德特茅斯，褪色的城镇。孤独的旋律在空旷的风中回荡。", file: "02 - Dirtmouth.mp3" },
    { id: 3, title: "Crossroads", duration: "2:27", desc: "遗忘十字路，曾经的繁华大道，如今只剩下感染的躯壳。", file: "03 - Crossroads.mp3" },
    { id: 4, title: "False Knight", duration: "3:04", desc: "伪骑士的主题曲，充满力量与威严。", file: "04 - False Knight.mp3" },
    { id: 5, title: "Greenpath", duration: "3:37", desc: "苍绿之径，生机勃勃却又暗藏杀机的绿色迷宫。", file: "05 - Greenpath.mp3" },
    { id: 6, title: "Hornet", duration: "2:46", desc: "激昂的战斗曲，由针与线的交织演奏出的致命舞曲。", file: "06 - Hornet.mp3" },
    { id: 7, title: "Reflection", duration: "1:39", desc: "温泉与长椅，在冒险的间隙中获得片刻的宁静。", file: "07 - Reflection.mp3" },
    { id: 8, title: "Mantis Lords", duration: "1:45", desc: "快节奏的拨弦，展现了螳螂领主的高傲与尊严。", file: "08 - Mantis Lords.mp3" },
    { id: 9, title: "City of Tears", duration: "2:58", desc: "美丽而忧伤的华尔兹，献给这座永雨之城。", file: "09 - City of Tears.mp3" },
    { id: 10, title: "Dung Defender", duration: "2:07", desc: "下水道的守护者，豪迈而忠诚的骑士。", file: "10 - Dung Defender.mp3" },
    { id: 11, title: "Crystal Peak", duration: "4:08", desc: "水晶山峰，矿洞中回响着采矿机器的轰鸣与水晶的歌唱。", file: "11 - Crystal Peak.mp3" },
    { id: 12, title: "Fungal Wastes", duration: "3:04", desc: "真菌荒地，孢子飞舞，奇异的生态系统。", file: "12 - Fungal Wastes.mp3" },
    { id: 13, title: "Decisive Battle", duration: "2:05", desc: "决战，与强敌交锋时的紧张旋律。", file: "13 - Decisive Battle.mp3" },
    { id: 14, title: "Soul Sanctum", duration: "4:30", desc: "灵魂圣所，学者们为了追求不朽而陷入疯狂。", file: "14 - Soul Sanctum.mp3" },
    { id: 15, title: "Resting Grounds", duration: "2:12", desc: "安息之地，静谧、神圣，逝者安眠之所。", file: "15 - Resting Grounds.mp3" },
    { id: 16, title: "Queen's Gardens", duration: "1:46", desc: "王后花园，曾经的避难所，即使荆棘丛生依然优雅。", file: "16 - Queen's Gardens.mp3" },
    { id: 17, title: "The White Lady", duration: "1:19", desc: "白色夫人，束缚于根系之中的女王，温柔而哀伤。", file: "17 - The White Lady.mp3" },
    { id: 18, title: "Broken Vessel", duration: "1:59", desc: "残破容器，同类的尸骸被感染操纵，悲壮的战斗。", file: "18 - Broken Vessel.mp3" },
    { id: 19, title: "Kingdom's Edge", duration: "2:22", desc: "王国边缘，灰烬如雪飘落，世界的尽头。", file: "19 - Kingdom's Edge.mp3" },
    { id: 20, title: "Nosk", duration: "1:50", desc: "诺斯克，拟态成熟悉面孔的猎手，在黑暗中潜伏。", file: "20 - Nosk.mp3" },
    { id: 21, title: "Dream", duration: "2:01", desc: "梦境，虚幻而迷离的另一个世界。", file: "21 - Dream.mp3" },
    { id: 22, title: "Dream Battle", duration: "2:25", desc: "梦境之战，在记忆与幻梦中挑战逝去的英雄。", file: "22 - Dream Battle.mp3" },
    { id: 23, title: "White Palace", duration: "4:19", desc: "白色宫殿，苍白之王的居所，机关重重，纯白中隐藏着痛苦。", file: "23 - White Palace.mp3" },
    { id: 24, title: "Sealed Vessel", duration: "5:45", desc: "最终的悲剧，为了封印光芒而做出的牺牲。", file: "24 - Sealed Vessel.mp3" },
    { id: 25, title: "Radiance", duration: "2:17", desc: "辐光，光芒万丈的女神，梦境的主宰。", file: "25 - Radiance.mp3" },
    { id: 26, title: "Hollow Knight", duration: "1:36", desc: "空洞骑士，承载着圣巢命运的容器，也是一切悲剧的核心。", file: "26 - Hollow Knight.mp3" }
].map(track => ({
    ...track,
    src: getMusicUrl(track.file)
}));

const setActive = (section: 'art' | 'music') => {
    activeSection.value = section;
    selectedArtCategory.value = null; // Reset selection when switching tabs
}

const showDetail = (id: string) => {
    selectedArtCategory.value = id;
    currentImageIndex.value = 0;
}

const backToList = () => {
    selectedArtCategory.value = null;
}

const nextImage = () => {
    if (!currentDetail.value) return;
    if (currentImageIndex.value < currentDetail.value.images.length - 1) {
        currentImageIndex.value++;
    } else {
        currentImageIndex.value = 0;
    }
}

const prevImage = () => {
    if (!currentDetail.value) return;
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
    } else {
        currentImageIndex.value = currentDetail.value.images.length - 1;
    }
}

const currentDetail = computed(() => {
    return selectedArtCategory.value ? artDetails[selectedArtCategory.value] : null;
});

// Music Player Logic
const currentTrack = ref(musicData[0]);
const isPlaying = ref(false);
const audioPlayer = ref<HTMLAudioElement | null>(null);

const playTrack = async (track: typeof musicData[0]) => {
    if (currentTrack.value.id === track.id) {
        togglePlay();
    } else {
        currentTrack.value = track;
        isPlaying.value = true;
        await nextTick();
        audioPlayer.value?.play();
    }
};

const togglePlay = () => {
    if (isPlaying.value) {
        audioPlayer.value?.pause();
        isPlaying.value = false;
    } else {
        audioPlayer.value?.play();
        isPlaying.value = true;
    }
};

const onTrackEnded = () => {
    isPlaying.value = false;
};
</script>

<template>
  <div class="feature-page">
    <PageTitle msg="美术与音乐" />
    
    <div class="content-container">
        <div class="nav-tabs">
            <button :class="{ active: activeSection === 'art' }" @click="setActive('art')">精选美术</button>
            <button :class="{ active: activeSection === 'music' }" @click="setActive('music')">原声音乐</button>
        </div>

        <transition name="fade" mode="out-in">
            <div v-if="activeSection === 'art'" class="section art-section" key="art">
                
                <!-- Main Art Grid (When no category selected) -->
                <div v-if="!selectedArtCategory" class="art-grid">
                    <div v-for="(item, index) in artData" :key="index" class="art-card" @click="showDetail(item.id)">
                        <div class="img-wrapper">
                            <img :src="item.url" :alt="item.title" loading="lazy" />
                        </div>
                        <div class="info">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                        </div>
                    </div>
                </div>

                <!-- Detail View (When category selected) -->
                <div v-else class="detail-view">
                    <button class="back-btn" @click="backToList">← 返回列表</button>
                    <div class="detail-content" v-if="currentDetail">
                        <h2>{{ currentDetail.title }}</h2>
                        <p class="detail-desc">{{ currentDetail.desc }}</p>
                        
                        <!-- Scene Design: Horizontal Parallax Scroll -->
                        <div v-if="selectedArtCategory === 'scene'" class="scene-gallery-wrapper">
                            <div class="scene-scroll-container">
                                <div v-for="(img, idx) in currentDetail.images" :key="idx" class="scene-card">
                                    <div class="scene-img-box">
                                        <img :src="img.url" :alt="img.caption" />
                                        <div class="scene-overlay">
                                            <h3>{{ img.caption }}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="scene-hint">
                                <span>Shift + 滚轮横向查看更多</span>
                            </div>
                        </div>

                        <!-- Boss Design: Accordion Gallery -->
                        <div v-else-if="selectedArtCategory === 'boss'" class="boss-accordion-wrapper">
                           <div class="boss-accordion">
                                <div 
                                    v-for="(img, idx) in currentDetail.images" 
                                    :key="idx" 
                                    class="boss-card"
                                    :class="{ active: currentImageIndex === idx }"
                                    @click="currentImageIndex = idx"
                                >
                                    <img :src="img.url" :alt="img.caption" class="boss-bg" />
                                    <div class="boss-overlay"></div>
                                    <div class="boss-content">
                                        <h3>{{ img.caption }}</h3>
                                        <div class="boss-intro-container">
                                            <p class="boss-intro">{{ img.intro }}</p>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        
                        <!-- Character Design: Profile Card -->
                        <div v-else-if="selectedArtCategory === 'char'" class="char-profile-wrapper">
                            <div class="char-content-box">
                                <transition name="fade-slide" mode="out-in">
                                    <div :key="currentImageIndex" class="char-profile-inner">
                                        <div class="char-image-side">
                                            <div class="char-bg-glow"></div>
                                            <img :src="currentDetail.images[currentImageIndex].url" :alt="currentDetail.images[currentImageIndex].caption" class="char-img" />
                                        </div>
                                        <div class="char-text-side">
                                            <h3 class="char-name">{{ currentDetail.images[currentImageIndex].caption }}</h3>
                                            <div class="char-divider"></div>
                                            <p class="char-intro">{{ currentDetail.images[currentImageIndex].intro }}</p>
                                        </div>
                                    </div>
                                </transition>
                            </div>

                            <div class="char-nav-controls">
                                <button class="nav-btn prev" @click="prevImage" v-if="currentDetail.images.length > 1">❮</button>
                                <div class="char-dots">
                                    <span 
                                        v-for="(img, idx) in currentDetail.images" 
                                        :key="idx"
                                        class="dot"
                                        :class="{ active: idx === currentImageIndex }"
                                        @click="currentImageIndex = idx"
                                    ></span>
                                </div>
                                <button class="nav-btn next" @click="nextImage" v-if="currentDetail.images.length > 1">❯</button>
                            </div>
                        </div>

                        <!-- Other Categories: Carousel -->
                        <div v-else class="carousel-container">
                            <div class="carousel-main">
                                <button class="nav-btn prev" @click="prevImage" v-if="currentDetail.images.length > 1">❮</button>
                                
                                <transition name="fade-slide" mode="out-in">
                                    <div class="carousel-slide" :key="currentImageIndex" v-if="currentDetail.images.length > 0">
                                            <div class="carousel-img-wrapper">
                                                <img :src="currentDetail.images[currentImageIndex].url" :alt="currentDetail.images[currentImageIndex].caption" class="carousel-img" />
                                            </div>
                                            <div class="carousel-caption">
                                                <span class="step-indicator">Step {{ currentImageIndex + 1 }} / {{ currentDetail.images.length }}</span>
                                                <p>{{ currentDetail.images[currentImageIndex].caption }}</p>
                                            </div>
                                    </div>
                                </transition>

                                <button class="nav-btn next" @click="nextImage" v-if="currentDetail.images.length > 1">❯</button>
                            </div>
                            
                            <div class="carousel-thumbnails" v-if="currentDetail.images.length > 1">
                                <div 
                                    v-for="(img, idx) in currentDetail.images" 
                                    :key="idx" 
                                    class="thumb-item" 
                                    :class="{ active: idx === currentImageIndex }"
                                    @click="currentImageIndex = idx"
                                >
                                    <img :src="img.url" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-else class="section music-section" key="music">
                <div class="music-player-container">
                    <audio ref="audioPlayer" :src="currentTrack.src" @ended="onTrackEnded"></audio>
                    <!-- Left Side: Vinyl Player -->
                    <div class="player-left">
                        <div class="vinyl-wrapper" :class="{ 'spinning': isPlaying }">
                            <div class="vinyl-record">
                                <div class="vinyl-label">
                                    <img src="https://huiji-thumb.huijistatic.com/hkss/uploads/thumb/4/49/Mainpromo9.png/600px-Mainpromo9.png" alt="Album Cover" />
                                </div>
                            </div>
                        </div>
                        <div class="now-playing-info">
                            <h3>{{ currentTrack.title }}</h3>
                            <p class="now-playing-desc">{{ currentTrack.desc }}</p>
                            <div class="player-controls">
                                <button class="play-btn" @click="togglePlay">
                                    <span v-if="isPlaying">❚❚</span>
                                    <span v-else>▶</span>
                                </button>
                                <div class="visualizer-bars" v-if="isPlaying">
                                    <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side: Playlist -->
                    <div class="player-right-playlist">
                        <div 
                            v-for="track in musicData" 
                            :key="track.id" 
                            class="track-row" 
                            :class="{ 'active': currentTrack.id === track.id }"
                            @click="playTrack(track)"
                        >
                            <div class="track-status">
                                <span v-if="currentTrack.id === track.id && isPlaying" class="playing-icon">♫</span>
                                <span v-else class="track-id">{{ track.id.toString().padStart(2, '0') }}</span>
                            </div>
                            <div class="track-info">
                                <span class="track-title">{{ track.title }}</span>
                            </div>
                            <span class="track-time">{{ track.duration }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<style scoped>
.feature-page {
    /* min-height: 100vh; */
    /* padding-top: 100px; Space for PageTitle - PageTitle is absolute so we need space */
    /* PageTitle in this project uses absolute positioning 2rem from top. 
       Usually views need padding to push content down. */
    /* padding-top: 15rem;  */
    color: #e0e0e0;
    /* font-family: 'Times New Roman', serif; */
}

/* Assuming PageTitle styling from context: 
   .title-group { position: absolute; top: 2rem; ... }
   We need to make sure our content doesn't overlap. 
*/

.content-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.nav-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    gap: 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 1rem;
}

.nav-tabs button {
    background: transparent;
    border: none;
    color: #888;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-family: inherit;
}

.nav-tabs button.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.nav-tabs button:hover {
    color: #ddd;
}

/* Art Grid */
.art-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.art-card {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

/* Detail View Styles */
.detail-view {
    animation: fadeIn 0.5s ease;
}

.back-btn {
    background: transparent;
    border: 1px solid #666;
    color: #aaa;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: all 0.3s;
}

.back-btn:hover {
    border-color: #fff;
    color: #fff;
    background: rgba(255,255,255,0.1);
}

.detail-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
}

.detail-desc {
    font-size: 1.1rem;
    color: #ccc;
    margin-bottom: 2rem;
    max-width: 800px;
    line-height: 1.6;
}

/* Carousel Styles */
.carousel-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
}

.carousel-main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);
    border-radius: 8px;
    padding: 1rem;
    min-height: 400px; /* Prevent layout jump */
}

.carousel-slide {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carousel-img-wrapper {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
    background: rgba(0,0,0,0.2);
    margin-bottom: 1rem;
}

.carousel-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}

.carousel-caption {
    text-align: center;
    background: rgba(25, 25, 25, 0.8);
    padding: 1rem 2rem;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.1);
}

.step-indicator {
    display: block;
    font-size: 0.85rem;
    color: var(--accent-gold, #c6b595);
    margin-bottom: 0.5rem;
    font-family: monospace;
    text-transform: uppercase;
}

.carousel-caption p {
    margin: 0;
    color: #eee;
    font-size: 1.1rem;
    font-family: serif;
    line-height: 1.4;
}

.nav-btn {
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    position: absolute;
    z-index: 10;
}

.nav-btn:hover {
    background: var(--accent-blue, #a3d9e3);
    color: #000;
    transform: scale(1.1);
}

.nav-btn.prev { left: 1rem; }
.nav-btn.next { right: 1rem; }

/* Thumbnails */
.carousel-thumbnails {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0.5rem;
}

.thumb-item {
    width: 60px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.thumb-item.active, .thumb-item:hover {
    opacity: 1;
    transform: scale(1.1);
    border-color: var(--accent-gold, #c6b595);
}

.thumb-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}


.art-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.3);
}

.img-wrapper {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: #000;
}

.img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.art-card:hover .img-wrapper img {
    transform: scale(1.1);
}

.info {
    padding: 1.5rem;
}

.info h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #fff;
}

.info p {
    margin: 0;
    font-size: 0.9rem;
    color: #aaa;
}

/* Music List */
.music-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.track-row {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(30, 30, 30, 0.6);
    border-radius: 4px;
    transition: background 0.2s;
    border: 1px solid transparent;
}

.track-row:hover {
    background: rgba(50, 50, 50, 0.8);
    border-color: rgba(255,255,255,0.1);
}

.track-id {
    font-family: monospace;
    font-size: 1.2rem;
    color: #555;
    margin-right: 1.5rem;
    width: 30px;
    text-align: right;
}

.track-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.track-title {
    font-size: 1.1rem;
    color: #eee;
    font-weight: bold;
}

.track-desc {
    font-size: 0.85rem;
    color: #888;
    margin-top: 4px;
}

.track-time {
    font-family: monospace;
    color: #aaa;
    margin-left: 1rem;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Scene Design - Horizontal Scroll */
.scene-gallery-wrapper {
    position: relative;
    width: 100%;
    margin-top: 2rem;
    overflow: hidden; /* Hide scrollbar hints if any */
}

.scene-scroll-container {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px 0;
    scroll-behavior: smooth;
    /* Custom Scrollbar for Chrome/Safari/Edge */
    scrollbar-width: thin;
    scrollbar-color: #555 transparent;
    scroll-snap-type: x mandatory;
}

.scene-scroll-container::-webkit-scrollbar {
    height: 8px;
}

.scene-scroll-container::-webkit-scrollbar-track {
    background: transparent;
}

.scene-scroll-container::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
}

.scene-card {
    flex: 0 0 400px; /* Fixed width for cards */
    height: 250px;
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    scroll-snap-align: start;
}

.scene-card:hover {
    transform: scale(1.05); /* Slight zoom on hover */
    z-index: 10;
    border-color: rgba(255,255,255,0.3);
}

.scene-img-box {
    width: 100%;
    height: 100%;
    position: relative;
}

.scene-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.scene-card:hover .scene-img-box img {
    transform: scale(1.1); /* Inner image pan effect */
}

.scene-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.scene-card:hover .scene-overlay {
    transform: translateY(0);
}

.scene-overlay h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Cinzel', serif;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.scene-hint {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    opacity: 0.7;
}

/* Boss Design - Accordion Gallery */
.boss-accordion-wrapper {
    width: 100%;
    height: 500px;
    margin-top: 2rem;
}

.boss-accordion {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
}

.boss-card {
    position: relative;
    flex: 1;
    overflow: hidden;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    background: #111;
    border: 1px solid rgba(255,255,255,0.1);
}

.boss-card.active {
    flex: 4;
    border-color: rgba(255, 215, 0, 0.3); /* Gold tint */
    box-shadow: 0 0 30px rgba(0,0,0,0.8);
}

.boss-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    transition: all 0.6s ease;
    filter: grayscale(80%) contrast(1.2);
}

.boss-card.active .boss-bg {
    opacity: 1;
    filter: grayscale(0%) contrast(1.1);
    transform: scale(1.05); /* Slow zoom active */
}

.boss-card:hover:not(.active) .boss-bg {
    opacity: 0.7;
    filter: grayscale(50%);
}

.boss-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%);
    pointer-events: none;
    transition: opacity 0.3s;
}

.boss-card:not(.active) .boss-overlay {
    background: rgba(0,0,0,0.6); /* Darker overlay for inactive */
}

.boss-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    z-index: 2;
    transition: all 0.5s ease;
}

.boss-content h3 {
    margin: 0;
    color: #e0e0e0;
    font-family: 'Cinzel', serif;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
    transition: all 0.5s;
}

/* Active State Text */
.boss-card.active .boss-content {
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.boss-card.active .boss-content h3 {
    font-size: 2.2rem;
    color: #fff;
    text-shadow: 0 0 10px rgba(255,100,0,0.6); /* Threatening glow */
    transform: translateY(0);
}

.boss-intro-container {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    /* When becoming inactive: Immediate disappearance */
    transition: none; 
}

.boss-card.active .boss-intro-container {
    max-height: 200px;
    opacity: 1;
    /* When becoming active: Slow fade in with delay */
    transition: all 0.8s ease 0.2s; 
}

.boss-intro {
    color: #ddd;
    font-size: 1.1rem;
    max-width: 600px;
    margin-top: 1rem;
    line-height: 1.6;
    font-family: serif;
    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

/* Inactive State Text */
.boss-card:not(.active) .boss-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0;
}

.boss-card:not(.active) .boss-content h3 {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 1.5rem;
    letter-spacing: 0.5rem;
    color: #888;
}

/* Character Profile Styles */
.char-profile-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    padding: 2rem 0;
}

.char-content-box {
    background: rgba(20, 20, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    min-height: 400px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
}

.char-profile-inner {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 3rem;
}

/* Left Side: Image */
.char-image-side {
    flex: 0 0 40%;
    display: flex;
    justify-content: center;
    position: relative;
    height: 350px;
}

.char-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    z-index: 2;
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
}

.char-bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 1;
}

/* Right Side: Text */
.char-text-side {
    flex: 1;
    text-align: left;
}

.char-name {
    font-family: 'Cinzel', serif;
    font-size: 2.5rem;
    color: #e0e0e0;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.char-divider {
    width: 60px;
    height: 3px;
    background: #c6b595;
    margin-bottom: 2rem;
}

.char-intro {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #bbb;
    font-style: italic;
    font-family: serif;
}

/* Controls */
.char-nav-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    position: relative;
    height: 50px;
}

/* Reuse existing .nav-btn but position relatively in this container */
.char-nav-controls .nav-btn {
    position: static;
    margin: 0 20px;
}

.char-dots {
    display: flex;
    gap: 10px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #444;
    cursor: pointer;
    transition: all 0.3s;
}

.dot.active {
    background: #c6b595;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(198, 181, 149, 0.5);
}

@media (max-width: 768px) {
    .char-profile-inner {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
    }
    .char-image-side {
        height: 250px;
    }
    .char-divider {
        margin: 1rem auto;
    }
    .char-text-side {
        text-align: center;
    }
}

/* Music Player Styles */
.music-player-container {
    display: flex;
    gap: 2rem;
    height: 500px; /* Fixed height container */
    margin-top: 1rem;
}

/* Left Side: Vinyl */
.player-left {
    flex: 0 0 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,0.3);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid rgba(255,255,255,0.05);
}

.vinyl-wrapper {
    width: 250px;
    height: 250px;
    margin-bottom: 2rem;
    transition: transform 1s linear;
    flex-shrink: 0; /* Prevent squashing in flex container */
}

.vinyl-record {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, #111 10%, #333 30%, #111 31%, #111 32%, #333 33%, #111 40%, #000 100%);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.vinyl-record::after {
    /* Shine effect */
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%);
    pointer-events: none;
}

.vinyl-label {
    width: 35%;
    height: 35%;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #555;
    position: relative;
}

.vinyl-label img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Spin Animation */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.vinyl-wrapper.spinning {
    animation: spin 8s linear infinite;
}

/* Left Info */
.now-playing-info {
    text-align: center;
    width: 100%;
}

.now-playing-info h3 {
    margin: 0;
    color: #c6b595;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
}

.now-playing-desc {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.5rem;
    min-height: 2.7em; /* space for 2 lines */
}

.player-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.play-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #c6b595;
    border: none;
    color: #222;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.play-btn:hover {
    transform: scale(1.1);
    background: #fff;
}

/* Visualizer */
.visualizer-bars {
    display: flex;
    gap: 4px;
    height: 30px;
    align-items: flex-end;
}

.bar {
    width: 4px;
    background: #c6b595;
    animation: bounce 1s ease-in-out infinite;
    height: 10%;
}

.bar:nth-child(1) { animation-duration: 0.8s; }
.bar:nth-child(2) { animation-duration: 1.2s; }
.bar:nth-child(3) { animation-duration: 0.6s; }
.bar:nth-child(4) { animation-duration: 1.0s; }

@keyframes bounce {
    0%, 100% { height: 10%; }
    50% { height: 80%; }
}

/* Right Side: Scrollable Playlist */
.player-right-playlist {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Custom scrollbar for playlist */
.player-right-playlist::-webkit-scrollbar {
    width: 6px;
}
.player-right-playlist::-webkit-scrollbar-thumb {
    background: #444; 
    border-radius: 3px;
}

/* Track Row Override/Refinement */
.track-row {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(30, 30, 30, 0.4);
    border-radius: 4px;
    transition: all 0.2s;
    border: 1px solid transparent;
    cursor: pointer;
}

.track-row:hover {
    background: rgba(60, 60, 60, 0.6);
}

.track-row.active {
    background: rgba(198, 181, 149, 0.1);
    border-color: rgba(198, 181, 149, 0.3);
}

.track-status {
    width: 40px;
    text-align: center;
    margin-right: 1rem;
}

.track-id {
    font-family: monospace;
    color: #666;
    font-size: 1.1rem;
}

.playing-icon {
    font-size: 1.2rem;
    color: #c6b595;
    animation: pulse 1s infinite alternate;
}

@keyframes pulse {
    from { opacity: 0.5; }
    to { opacity: 1; }
}

.track-info {
    flex: 1;
}

.track-title {
    color: #ccc;
    font-weight: normal;
    transition: color 0.2s;
}

.track-row.active .track-title {
    color: #c6b595;
    font-weight: bold;
}

.track-time {
    font-family: monospace;
    color: #666;
}

@media (max-width: 768px) {
    .music-player-container {
        flex-direction: column;
        height: auto;
    }
    .player-left {
        flex: none;
        width: 100%;
        padding: 1.5rem;
    }
    .player-right-playlist {
        max-height: 400px;
    }
}
</style>