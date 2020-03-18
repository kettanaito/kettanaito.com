import { config } from 'dotenv'
import { GatsbyNode } from 'gatsby'

const getEnvVariables = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    }
  }

  return config().parsed
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  plugins,
  actions,
  getConfig,
}) => {
  const envVariables = getEnvVariables()

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env': Object.entries(envVariables).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: JSON.stringify(value),
          }),
          {}
        ),
      }),
    ],
  })

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(
        context,
        request,
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, 'umd ' + request)
        }
        callback()
      }),
    })
  }
}
