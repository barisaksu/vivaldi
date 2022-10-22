<script setup lang="ts">
interface Props {
  name: string
  label?: string
  checked?: (string | boolean)
  value: string | any
}

const props = defineProps<Props>()

defineEmits<{
  (event: 'update:selected', value: string): void
}>()
</script>

<template>
  <!-- Radio Buttonda Kaldım
       radio componentini oluşturup melodic mi harmonic mi onu seçtireceğim.

       sonraki işler;
          vexflow ile notaları çizmek,

          hahaha bunları copilot yazdı ama mantıklı.

          ---
          notaları çizdikten sonra onları dinlemek,
          notaları dinledikten sonra doğru cevap verip vermediğini kontrol etmek,
          doğru cevap verdiğinde sonraki soruya geçmek,
          yanlış cevap verdiğinde tekrar soruyu dinletmek,
          yanlış cevap verdiğinde doğru cevabı göstermek,
          doğru cevabı gösterdikten sonra sonraki soruya geçmek,
          son soruya gelindiğinde sonuçları göstermek,
          sonuçları gösterdikten sonra tekrar oynamak isteyip istemediğini sorup oynamak istiyorsa tekrar başa dönmek,
          oynamak istemiyorsa başka bir sayfaya yönlendirmek.

  -->
  <div class="flex items-center mb-4">
    <input :id="props.value" :checked="checked" type="radio" :value="props.value" :name="props.name" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" @input="(event) => $emit('update:selected', (event.target as HTMLInputElement).value)">
    <label :for="props.value" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
  </div>
  <!-- <div>
    <label v-if="props.label" :for="props.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{{ props.label }}</label>
    <select :id="props.id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="(event) => $emit('update:selected', (event.target as HTMLInputElement).value)">
      <slot />
    </select>
  </div> -->
</template>

<style scoped>

</style>
