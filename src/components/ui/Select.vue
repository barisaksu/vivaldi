<script setup lang="ts">
interface Props {
  id: string
  label?: string
  selected?: (string | boolean)
}

const props = defineProps<Props>()

defineEmits<{
  (event: 'update:selected', value: string): void
}>()
</script>

<template>
  <div>
    <label v-if="props.label" :for="props.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{{ props.label }}</label>
    <select :id="props.id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="(event) => $emit('update:selected', (event.target as HTMLInputElement).value)">
      <slot />
    </select>
  </div>
</template>

<style scoped>

</style>
