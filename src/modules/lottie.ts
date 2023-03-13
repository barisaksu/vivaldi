import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(Vue3Lottie, { name: 'Vue3Lottie' })
}

