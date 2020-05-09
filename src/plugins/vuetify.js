import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

import iconJeansFold from '@/components/iconJeansFold.vue'
import iconLogo from '@/components/iconLogo.vue'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo.base,
        secondary: colors.indigo.lighten3,
        accent: colors.indigo.accent1,
        error: colors.red.base,
        warning: colors.red.darken4,
        info: colors.teal.base,
        success: colors.green.base
      }
    }
  },
  icons: {
    values: {
      jeansfold: {
        component: iconJeansFold
      },
      logo: {
        component: iconLogo
      }
    }
  }
})
