import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
}

const rollbar = new Rollbar(rollbarConfig)

export default rollbar
