<script setup lang="ts">
interface Props {
  title: string
  description: string
}

const { title, description } = defineProps<Props>()
const showSettings = inject('showSettings', false)
</script>

<template>
  <Drawer v-if="showSettings" title="Settings" @close="showSettings = false">
    <slot name="settings" />
  </Drawer>
  <div
    class="mb-4 flex h-16 w-full items-center justify-between border-b border-gray-700 bg-gray-800 px-2 pt-2"
  >
    <div class="align-center items-center justify-center font-normal leading-3">
      <h1 class="text-md font-normal">
        {{ title }}
      </h1>
      <span class="text-sm text-gray-300"> {{ description }}</span>
    </div>
    <div class="flex items-center justify-center space-x-2">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>

</style>
