<script setup lang="ts">
interface Props {
  color?: string
  justHoverColor?: boolean
  tooltip: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  tooltipPosition: 'right',
})

const classObject = computed(() => ({
  [`bg-${props.color}-700`]: !props.justHoverColor,
}))
</script>

<template>
  <Popper
    :content="props.tooltip" placement="right" hover arrow :style="`--popper-theme-background-color: var(--color-${props.color}-800);
  --popper-theme-background-color-hover: var(--color-${props.color}-800)`"
  >
    <button
      type="button"
      class="hover:text-white dark:hover:text-white dark:focus:text-white font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center bg-opacity-20 hover:bg-opacity-100 focus:bg-opacity-100 focus:ring-2 focus:outline-none "
      :class="[classObject, `text-${props.color}-500 dark:text-${props.color}-500 hover:bg-${props.color}-400 dark:hover:bg-${props.color}-700 focus:ring-${props.color}-800 dark:focus:ring-${props.color}-800`]"
    >
      <slot name="icon">
        <!-- Default icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-6 h-6"
        >
          <path
            stroke-linecap="round" stroke-linejoin="round"
            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
          />
        </svg>
      </slot>
    </button>
  </Popper>
</template>

<style>
:root {
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 8px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
