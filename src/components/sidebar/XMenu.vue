<script setup lang="ts">
interface Props {
  index: number
  color?: string
  icon?: any
  justHoverColor?: boolean
  tooltip: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  href?: string
  showSubMenux?: boolean
  subMenus?: Array<any>
}

const props = withDefaults(defineProps<Props>(), {
  tooltipPosition: 'right',
  href: '',
  showSubMenux: false,
})

const emit = defineEmits(['isExpanded'])

const classObject = computed(() => ({
  [`bg-${props.color}-700`]: !props.justHoverColor,
  borusan: props.showSubMenux,
}))

const showSubMenu = ref(props.showSubMenux)

watch(
  () => props.showSubMenux,
  (val) => {
    showSubMenu.value = val
  },
)
</script>

<template>
  <div>
    <Popper
      class="group popper-custom-css" :content="props.tooltip" placement="right" hover arrow :style="`--popper-theme-background-color: var(--color-${props.color}-700);
    --popper-theme-background-color-hover: var(--color-${props.color}-700); margin: 0px; border: none;`"
    >
      <button
        class="hover:text-white dark:hover:text-white dark:focus:text-white font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center bg-opacity-20 hover:bg-opacity-100 focus:bg-opacity-100  focus:outline-none"
        :class="[classObject, `text-${props.color}-500 dark:text-${props.color}-500 hover:bg-${props.color}-400 dark:hover:bg-${props.color}-700 focus:ring-${props.color}-800 dark:focus:ring-${props.color}-800`, { 'bg-opacity-100 dark:text-white': showSubMenu }]" @click="emit('isExpanded', index)"
      >
        <component :is="props.icon" v-if="props.icon" class="h-6 w-6" />
        <!-- Default icon -->
        <svg
          v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
        >
          <path
            stroke-linecap="round" stroke-linejoin="round"
            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
          />
        </svg>
      </button>
    </Popper>
    <ul v-if="showSubMenu" class="space-y-2 mt-2">
      <li v-for="(submenu, index) in subMenus" :key="index">
        <Popper
          class="group" :content="submenu.name" placement="right" hover arrow :style="`--popper-theme-background-color: var(--color-${submenu.color}-700);
        --popper-theme-background-color-hover: var(--color-${submenu.color}-700); margin: 0; border: none;`"
        >
          <RouterLink
            :to="submenu.href"
            type="button"
            exact-active-class="text-white dark:text-white"
            aria-current-value="page"
            class="hover:text-white dark:hover:text-white dark:focus:text-white font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center bg-opacity-20 hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 focus:outline-none "
            :class="[`bg-${submenu.color}-700 text-${submenu.color}-500 dark:text-${submenu.color}-500 hover:bg-${submenu.color}-400 dark:hover:bg-${submenu.color}-700 focus:ring-${submenu.color}-800 dark:focus:ring-${submenu.color}-800`]"
          >
            <component :is="submenu.icon" v-if="submenu.icon" class="h-6 w-6" />
            <!-- Default icon -->
            <svg
              v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round"
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
              />
            </svg>
          </RouterLink>
        </Popper>
      </li>
      <hr class="my-4 mx-auto w-6 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700">
    </ul>
  </div>
</template>

<style lang="scss">
:root {
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 8px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.popper {
  text-align: left;
}

a.router-link-active {
  background: v-bind("props.justHoverColor ? `var(--color-${props.color}-700)` : `var(--color-${props.color}-700)`");
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 100%;
    top: 39%;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: v-bind("`5px solid var(--color-${props.color}-700)`");
    clear: both;
  }
}

.borusan {
  position: relative;
  &:after{
    content: "";
    position: absolute;
    bottom: -15px;
  left: calc(50% - 10px);
  border-top: v-bind("`5px solid var(--color-${props.color}-700)`");
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  }
}
</style>
