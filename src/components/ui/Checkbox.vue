<script setup lang="ts">
interface Props {
  label: string
  description?: string
  checked: boolean
}

const props = defineProps<Props>()
defineEmits<{
  (event: 'update:checked', value: boolean): void
}>()
</script>

<template>
  <div class="flex">
    <div class="flex h-5 items-center">
      <input
        :id="props.label"
        :aria-describedby="`${props.label}-text`"
        :checked="checked"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        @input="(event) => $emit('update:checked', (event.target as HTMLInputElement).checked)"
      >
    </div>
    <div class="ml-2 text-sm">
      <label
        :for="props.label"
        class="font-medium text-gray-900 dark:text-gray-300"
      >{{ props.label }}</label>
      <p
        v-if="props.description"
        :id="`${props.label}-text`"
        class="text-xs font-normal text-gray-500 dark:text-gray-300"
      >
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
