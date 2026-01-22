
<template>
  <div class="music-player" :class="{ 'collapsed': isCollapsed }">
    <button class="toggle-btn" @click="toggleCollapse">
      {{ isCollapsed ? '🎵' : '×' }}
    </button>
    
    <div v-if="!isCollapsed" class="player-panel">
      <h3>空洞骑士音乐</h3>
      <button class="control-btn" @click="togglePlay">
        {{ status.isPlaying ? '⏸️ 暂停' : '▶️ 播放' }}
      </button>
      
      <div class="volume-control">
        <span>音量:</span>
        <input type="range" min="0" max="100" :value="status.volume * 100" @input="changeVolume" class="volume-slider" />
        <span>{{ Math.round(status.volume * 100) }}%</span>
      </div>
      
      <div class="track-list">
        <div v-for="track in tracks" :key="track.id" class="track-item" :class="{ 'active': currentTrack === track.id }" @click="selectTrack(track)">
          {{ track.name }}
        </div>
      </div>
      <div class="track-info" v-if="currentTrack">
        当前: {{ currentTrackName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import audioManager from './src/utils/audioManager';

const tracks = ref([
  { id: 'track1', name: '主旋律', src: '/music/track1.mp3' },
  { id: 'track2', name: '苍绿之径', src: '/music/track2.mp3' },
  { id: 'track3', name: '泪城之雨', src: '/music/track3.mp3' },
]);
const isCollapsed = ref(true);
const currentTrack = ref('track1');
const status = reactive(audioManager.getStatus());

const currentTrackName = computed(() => {
  const track = tracks.value.find(t => t.id === currentTrack.value);
  return track ? track.name : '';
});

const togglePlay = () => {
  audioManager.togglePlay();
  Object.assign(status, audioManager.getStatus());
};
const selectTrack = (track: any) => {
  currentTrack.value = track.id;
  audioManager.play(track.src);
  Object.assign(status, audioManager.getStatus());
};
const changeVolume = (event: Event) => {
  const value = (event.target as HTMLInputElement).valueAsNumber / 100;
  audioManager.setVolume(value);
  Object.assign(status, audioManager.getStatus());
};
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
  const defaultTrack = tracks.value[0];
  audioManager.play(defaultTrack.src);
});
</script>

<style scoped>
.music-player {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid #5d4d3a;
  border-radius: 8px;
  color: #e8d8b8;
  font-family: sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
.player-panel {
  padding: 15px;
  width: 220px;
}
h3 {
  margin: 0 0 12px 0;
  color: #f0e6d2;
  font-size: 1.1rem;
  text-align: center;
}
.toggle-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #5d4d3a;
  color: #e8d8b8;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
.control-btn {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  background: linear-gradient(to bottom, #6b5a45, #4a3c2c);
  color: #f0e6d2;
  border: 1px solid #8a7a65;
  border-radius: 4px;
  cursor: pointer;
}
.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 0.9rem;
}
.volume-slider {
  flex: 1;
  height: 6px;
  background: #4a3c2c;
  border-radius: 3px;
  outline: none;
}
.track-list {
  max-height: 180px;
  overflow-y: auto;
  margin-bottom: 10px;
  border-top: 1px solid #5d4d3a;
  padding-top: 10px;
}
.track-item {
  padding: 6px 10px;
  margin-bottom: 4px;
  background: #3a2e20;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.track-item.active {
  background: #5d4d3a;
  border-left: 3px solid #e8d8b8;
}
.track-info {
  font-size: 0.8rem;
  color: #b8a488;
  text-align: center;
  padding-top: 8px;
  border-top: 1px solid #5d4d3a;
}
</style>
