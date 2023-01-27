<script setup lang="ts">
import { Cog6ToothIcon, SparklesIcon } from '@heroicons/vue/24/outline/index.js'
import { CriticalListeningIcon, VivaldiForSEIcon } from './icons/vivaldiforse/index'
import { GuitarTunerIcon, MetronomeIcon, ReverbDelayCalculatorIcon, ToolsIcon } from './icons/musiciantools/index'
import { IntervalTrainingIcon, PitchTrainingIcon } from './icons/exercises/index'
import GlobalSettings from '~/pages/settings.vue'

const { t } = useI18n()

const showSettings = ref(false)

const menus = ref([
  {
    name: 'sidebar.exercises',
    color: 'blue',
    isExpanded: true,
    items: [
      {
        name: 'exercises.pitch_training.title',
        icon: PitchTrainingIcon,
        href: '/exercises/pitch-training',
        color: 'blue',
      },
      {
        name: 'exercises.interval_training.title',
        icon: IntervalTrainingIcon,
        href: '/exercises/interval-training',
        color: 'blue',
      },
    ],
  },
  {
    name: 'sidebar.vivaldi_for_se',
    icon: VivaldiForSEIcon,
    color: 'red',
    isExpanded: false,
    items: [
      {
        name: 'vivaldiforse.critical_listening.title',
        icon: CriticalListeningIcon,
        href: '/settings',
        color: 'red',
      },
    ],
  },
  {
    name: 'sidebar.musician_tools',
    icon: ToolsIcon,
    color: 'yellow',
    isExpanded: false,
    items: [
      /* {
        name: 'musician_tools.guitar_tuner.title',
        icon: GuitarTunerIcon,
        href: '/tools/guitar-tuner',
        color: 'yellow',
      },
      {
        name: 'musician_tools.metronome.title',
        icon: MetronomeIcon,
        href: '/settings',
        color: 'yellow',
      },
      {
        name: 'musician_tools.streaming_royalty_calculator.title',
        icon: ReverbDelayCalculatorIcon,
        href: '/settings',
        color: 'yellow',
      }, */
      {
        name: 'musician_tools.reverb_delay_time_calculator.title',
        icon: ReverbDelayCalculatorIcon,
        href: '/tools/rdt-calculator',
        color: 'yellow',
      },
    ],
  },
])

function handleAccordion(selectedMenu: number) {
  menus.value.forEach((_, index) => {
    menus.value[index].isExpanded = index === selectedMenu ? !menus.value[index].isExpanded : false
    console.log('menu index ->', index)
  })
}

onMounted(() => {
  console.log(menus.value[0])
})
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
      <router-link to="/" class="pb-2 md:pb-4">
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
    <div class="flex-1 w-full h-2/3 text-center">
      <ul class="flex h-full flex-col space-y-2 overflow-x-hidden dene">
        <li v-for="(menu, index) in menus" :key="index">
          <XMenu :tooltip="menu.name" :color="menu.color" :show-sub-menux="menu.isExpanded" :sub-menus="menu.items" :icon="menu.icon" :index="index" @is-expanded="(n: any) => handleAccordion(n)" />
        </li>
      </ul>
    </div>
    <!-- General  -->
    <ul class="flex flex-shrink-0 flex-col space-y md:space-y-2 overflow-hidden">
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
          color="slate"
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

<style lang="scss" scoped>
.dene {
  overflow: overlay;
}
*::-webkit-scrollbar {
  display: block;
  width: 1px;
  padding-left: 10px;
  opacity: 10;
}

*::-webkit-scrollbar-button {
  display: none;
}

*::-webkit-scrollbar-track {
  background-color: #00000000;
}

*::-webkit-scrollbar-track-piece {
  background-color: #00000000;
}

*::-webkit-scrollbar-thumb {
  background-color: #256af371;
  // background-color: #256af396;
}
</style>
