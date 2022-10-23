<script setup lang="ts">
useHead({
  title: 'Vivaldi',
  meta: [
    { name: 'description', content: 'Completely free and open source musical ear training application.' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#111827' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
  script: [
    {
      // src: 'https://cdn.jsdelivr.net/npm/flowbite@1.5.3/dist/flowbite.min.js',
    },
  ],
})

onMounted(() => {
  console.log('%c Vivaldi Beta', 'background: crimson; color: #fff; padding: 2px;')
})
</script>

<template>
  <RouterView />
</template>
