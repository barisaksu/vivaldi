import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, router }) => {
  Sentry.init({
    app,
    dsn: 'https://c0a276cc91904822aff4856cedac3a97@o4504848494559232.ingest.sentry.io/4504848498819072',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ['localhost', 'vivaldi.netlify.app', /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })
}
