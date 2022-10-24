<script setup lang="ts">
const { t, locale } = useI18n()

const mode = reactive(isDark)

const globalSettings = useStorage('globalSettings', {
  lang: 'en',
})

const availableLangs = ref([
  { label: 'English', value: 'en' },
  { label: 'Türkçe', value: 'tr' },
])

watch(locale, (value) => {
  globalSettings.value.lang = value
})
</script>

<template>
  <div class="grid grid-cols-1 p-4">
    <Select id="locales" v-model:selected="locale" :label="t('button.toggle_langs')">
      <option v-for="lang in availableLangs" :key="lang.value" :value="lang.value" :selected="lang.value === locale">
        {{ lang.label }}
      </option>
    </Select>
    <hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">

    <Checkbox v-model:checked="mode" :label="t('button.toggle_dark')" />
  </div>
</template>

<style scoped>

</style>
