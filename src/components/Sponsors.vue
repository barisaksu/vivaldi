<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="px-2 pt-24 mx-auto max-w-7xl">
    <h1 class="mb-3 text-3xl font-bold leading-tight text-white-900 md:text-4xl">
      {{ t('support.sponsors_title_before') }}
      <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-700 relative inline-block">
        <span class="relative text-white">{{ t('support.sponsors_title_highlight') }}</span>
      </span> {{ t('support.sponsors_title_after') }}
    </h1>
    <p class="mb-12 text-lg text-gray-400">
      {{ t('support.sponsors_description') }}
    </p>

    <div>
      <div class="flex gap-2">
        <div class="col-span-1">
          <a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-bg.svg" class="logoHeight" alt="Deploys by Netlify"> </a>
        </div>
        <div class="col-span-1">
          <a href="https://sentry.io">
            <img src="/sponsors/sentryio.svg" class="logoHeight" alt="Sentry">
          </a>
        </div>
      </div>
    </div>

    <!-- <div class="grid grid-cols-2 lg:grid-cols-8">
      <a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-bg.svg" alt="Deploys by Netlify"> </a>
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
.logoHeight {
  @apply hover:scale-105 transition-all duration-300 rounded-lg;
  width: 114px;
  height: 50px;
}
</style>
