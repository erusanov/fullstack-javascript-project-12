import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN || 'dummy',
  environment: 'testenv',
  enabled: !!import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
}

const rollbar = new Rollbar(rollbarConfig)

export default rollbar
