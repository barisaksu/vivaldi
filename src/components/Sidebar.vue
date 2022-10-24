<script setup lang="ts">
import { Cog6ToothIcon, SparklesIcon } from '@heroicons/vue/24/outline/index.js'
import GlobalSettings from '../pages/settings.vue'

const { t } = useI18n()

const showSettings = ref(false)
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeInRight animate__faster"
    leave-active-class="animate__animated animate__fadeOutRight"
  >
    <Drawer v-if="showSettings" title="Settings" @close="showSettings = false">
      <GlobalSettings />
    </Drawer>
  </Transition>
  <div
    class="flex h-screen min-w-[3.5rem] flex-col items-center justify-start border-r bg-gray-100 border-gray-200 dark:border-gray-700 dark:bg-gray-800 py-2"
  >
    <Transition
      enter-active-class="animate-pulse"
      leave-active-class="animate-bounce"
      appear
    >
      <router-link to="/">
        <svg
          class="mt-2 h-6 w-auto hover:animate-spin"
          width="108"
          height="69"
          viewBox="0 0 108 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M106.058 27.7362L53.49 1.2156C51.2 0.0606046 48.41 0.984502 47.258 3.27916C46.975 3.84248 46.809 4.45757 46.771 5.08706L44.808 37.3238C44.674 39.5197 43.024 41.3214 40.852 41.6422L2.68302 47.2812C1.09802 47.5153 0.00300346 48.9928 0.237003 50.5812C0.407003 51.738 1.25199 52.6801 2.38199 52.9722L61.869 68.3551C64.35 68.9969 66.881 67.5006 67.522 65.0131C67.616 64.645 67.666 64.2666 67.669 63.8865L67.867 37.7742C67.886 35.2145 69.965 33.1516 72.519 33.1581L104.747 33.2402C106.349 33.2443 107.651 31.9459 107.655 30.3404C107.657 29.2393 107.039 28.2313 106.058 27.7362Z"
            fill="#3F83F8"
          />
        </svg>
      </router-link>
    </Transition>
    <!-- Exercises -->
    <div class="flex-1">
      <ul class="mt-4 flex h-full flex-col space-y-2">
        <li>
          <SidebarButton href="/exercises/pitch-training" :tooltip="t('sidebar.pitch_training')" color="blue" />
        </li>
        <li>
          <SidebarButton href="/exercises/interval-training" :tooltip="t('sidebar.interval_training')" color="yellow" />
        </li>
      </ul>
    </div>
    <!-- General  -->
    <ul class="mt-6 flex flex-shrink-0 flex-col space-y-2">
      <li>
        <SidebarButton href="/changelog" :tooltip="t('sidebar.whats_news')" color="blue" just-hover-color>
          <template #icon>
            <SparklesIcon class="h-6 w-6" />
          </template>
        </SidebarButton>
      </li>
      <li>
        <SidebarButton
          :tooltip="t('sidebar.global_settings')"
          color="gray"
          just-hover-color
          @click="showSettings = !showSettings"
        >
          <template #icon>
            <Cog6ToothIcon class="h-6 w-6" />
          </template>
        </SidebarButton>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
