import { createStore } from 'vuex'

import settings from './modules/settings'
import uInfo from './modules/userinfo'

export default createStore({
  modules: {
    settings,
    uInfo
  }
})
