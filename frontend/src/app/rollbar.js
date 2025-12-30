import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: '503620b150e94bf1b62378e8dd2a4b14',
  environment: 'testenv',
}

const rollbar = new Rollbar(rollbarConfig)

export default rollbar
