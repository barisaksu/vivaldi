<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()
const { play } = useTone()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]

  console.log('Language', locale.value)
}
</script>

<template>
  <div class="flex flex-col space-y-4 justify-center items-center h-screen">
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="play('A4', '2n')"
      >
        {{ t('button.hellovivaldi') }}
      </button>
    </div>
    <div>
      <button
        type="button"
        class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="toggleDark()"
      >
        {{ t('button.toggle_dark') }}
      </button>

      <button
        type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
        @click="toggleLocales()"
      >
        {{ t('button.toggle_langs') }}
      </button>
    </div>
  </div>
</template>
