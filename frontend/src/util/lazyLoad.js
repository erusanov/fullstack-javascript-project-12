import { lazy } from 'react'

const lazyLoad = path => lazy(
  () => import(path),
)

export {
  lazyLoad,
}
