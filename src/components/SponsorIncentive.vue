<script setup lang="ts">
interface Props {
  patreon?: string
  email?: string
}

const props = withDefaults(defineProps<Props>(), {
  patreon: 'https://www.patreon.com/barisaksu',
  email: 'mailto:baris@barisaksu.com',
})

const { t } = useI18n()
</script>

<template>
  <div
    class="rounded-lg bg-purple-700 px-6 py-6 shadow-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-start"
  >
    <div class="xl:w-0 xl:flex-1">
      <h2
        class="text-2xl font-extrabold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9"
      >
        {{ t('support.sponsor_incentive_title') }}
      </h2>
      <p class="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
        {{ t('support.sponsor_incentive_description') }}
      </p>
    </div>
    <div class="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
      <div class="space-y-2 sm:flex-shrink-0">
        <a
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-500 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-purple-400 focus:bg-purple-400 focus:outline-none"
          :href="props.patreon"
          target="_blank"
        >
          {{ t('support.patreon') }}
        </a>
        <a
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-500 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-purple-400 focus:bg-purple-400 focus:outline-none"
          :href="props.email"
          target="_blank"
        >
          {{ t('support.feedback') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
