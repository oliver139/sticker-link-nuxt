<template>
  <NuxtPage />

  <aside />

  <Transition
    name="cover"
    :duration="totalDuration"
    @before-enter="numberOfRectLock = true"
    @after-enter="numberOfRectLock = false"
    @before-leave="numberOfRectLock = true"
    @after-leave="numberOfRectLock = false"
    @enter-cancelled="numberOfRectLock = false"
    @leave-cancelled="numberOfRectLock = false"
  >
    <div
      v-show="coverContent"
      class="content-cover"
      :style="{
        '--strip-color-1': stripColors[0],
        '--strip-color-2': stripColors[1],
        '--strip-color-3': stripColors[2],
        '--strip-count': numberOfRect,
      }"
    >
      <div
        v-for="n in numberOfRect"
        :key="n"
        class="strip"
        :style="{
          '--transition-duration': `${eachDuration}ms`,
          '--delay-time': `${delayTime * (n-1)}ms`,
        }"
      />
    </div>
  </Transition>
  <button type="button" class="btn coverBtn" @click="coverContent = !coverContent">Change</button>
</template>

<script setup lang="ts">
// #region : Cover content transition
// State
// const coverContent = useState<boolean>("coverContent", () => false);
const coverContent = ref<boolean>(false);

// Size
const { width: screenWidth } = useWindowSize();
const numberOfRect = useState(() => updateRectNum(screenWidth.value));
const numberOfRectLock = ref(false);
function updateRectNum(newWidth: number) {
  return isFinite(newWidth) ? Math.ceil(newWidth / 200) : 0;
}
watchDebounced(screenWidth, async (newVal) => {
  await until(numberOfRectLock).toBe(false);
  numberOfRect.value = updateRectNum(newVal);
}, { debounce: 300, immediate: true });

// Colors
const themeColor = ref<string>("rgb(155 196 233)");
const stripColors = computed((): FixedLengthArray<[string, string, string]> => {
  const color = getColorObj(themeColor.value);
  if (color) {
    return [
      color.hex(),
      colorWhiteBlackAdjust(color).hex(),
      colorWhiteBlackAdjust(color, 0.2).hex(),
    ];
  } else {
    return ["#acafb5", "#d2d2d2", "#dfdfdf"];
  }
});

// Transition parameters
const minDuration = 1500;
const eachDuration = computed(() => Math.max(Math.floor(minDuration / numberOfRect.value), 750));
const totalDuration = computed(() => eachDuration.value * numberOfRect.value);
const delayTime = computed(() => Math.floor((eachDuration.value * 0.5) / numberOfRect.value));

// #endregion
</script>

<style>
#__nuxt {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.coverBtn {
  position: fixed;
  top: 0;
  left: 0;
}
.content-cover {
  display: grid;
  grid-template-columns: repeat(var(--strip-count), 1fr);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .strip {
    position: relative;
    top: 0;
    background: var(--strip-color-1);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      aspect-ratio: 1;
      background: var(--strip-color-1);
      border-radius: 100%;
      transform: translateY(50%);
    }
  }
  &.cover {
    &-enter-from, &-leave-to {
      .strip {
        top: -200%;
      }
    }
    &-move, &-enter-active, &-leave-active {
      .strip {
        transition: top var(--transition-duration) linear var(--delay-time);
      }
    }
    &-leave-active {
      $shadow-dist: 10dvh;
      .strip {
        box-shadow:
          0 max(4rem, calc($shadow-dist)) 0 0 var(--strip-color-2),
          0 max(8rem, calc($shadow-dist * 2)) 0 0 var(--strip-color-3);
          &::before {
            box-shadow:
              0 max(4rem, calc($shadow-dist)) 0 0 var(--strip-color-2),
              0 max(8rem, calc($shadow-dist * 2)) 0 0 var(--strip-color-3);
          }
      }
    }
  }
}
</style>
