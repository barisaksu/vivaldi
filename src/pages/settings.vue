<script setup lang="ts">
const { t, locale } = useI18n()

const mode = reactive(isDark)
onMounted(() => {
  console.log(locale)
})
</script>

<template>
  <div class="grid grid-cols-1">
    <Select id="locales" v-model:selected="locale" :label="t('button.toggle_langs')">
      <option value="en">
        English
      </option>
      <option value="tr">
        Türkçe
      </option>
    </Select>
    <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">

    <Checkbox v-model:checked="mode" :label="t('button.toggle_dark')" />
  </div>
</template>

<style scoped>

</style>
