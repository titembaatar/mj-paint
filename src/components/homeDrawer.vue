<template>
  <div>
    <v-list>
      <v-list-item color="transparent" :to="{ name: 'Home' }">
        <v-list-item-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="min-width:24px; max-width: 24px"
          >
            <path
              :fill="aShops.color"
              d="M 0.1484375 0 C 0.1484375 0 0.0020970144 2.1898384 0.0234375 5.3007812 L 23.976562 5.3007812 C 23.99597 2.1961242 23.851562 7.4783975e-16 23.851562 0 L 0.1484375 0 z M 0.13867188 9.3007812 C 0.17949327 9.9826167 0.23250704 10.6829 0.296875 11.400391 L 23.708984 11.400391 C 23.772626 10.683855 23.823092 9.9830157 23.863281 9.3007812 L 0.13867188 9.3007812 z M 0.54296875 13.699219 C 0.80569822 15.782329 1.184635 17.93148 1.7304688 20.015625 L 12 24 L 22.269531 20.015625 C 22.820568 17.944836 23.201967 15.792435 23.464844 13.699219 L 0.54296875 13.699219 z"
            />
          </svg>
        </v-list-item-icon>
        <v-list-item-title
          v-text="'桃太郎ジーンズ'"
          :style="{ color: aShops.color }"
        />
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-switch v-model="colorKeep" label="限定色変更" />

      <v-list-group prepend-icon="mdi-store" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title :style="{ color: aShops.color }">
              {{ aShops.display }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="shop in shops"
          :key="shop.id"
          @click="setShopActive(shop)"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="shop.display"
              :style="{ color: shop.color }"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="$jeansfold" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ aJeans.display }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="jean in displayJeans"
          :key="jean.id"
          @click="setJeanActive(jean)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="jean.display" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item link :to="{ name: 'Login' }">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          管理
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      shop: 1,
      jean: 1,
      colorKeep: true
    }
  },
  methods: {
    setShopActive(obj) {
      this.$store.commit('SET_SHOP_ACTIVE', obj)
      if (this.colorKeep) {
        for (let i = 0; i < this.aPockets.length; i++) {
          const p = this.aPockets[i]
          for (let j = 0; j < p.layers.length; j++) {
            const l = p.layers[j]
            if (l.limitedColor === true) {
              l.color = obj.color
            }
          }
        }
      }
    },
    setJeanActive(obj) {
      this.$store.commit('SET_JEAN_ACTIVE', obj)
    }
  },
  computed: {
    nonExclusiveJeans() {
      let nEJ = this.jeans.filter(object => !('exclusive' in object))
      return nEJ
    },
    exclusiveJeans() {
      let eJ = this.jeans.filter(object => 'exclusive' in object)
      let aEJ = eJ.filter(object => object.exclusive.includes(this.aShops.id))
      return aEJ
    },
    displayJeans() {
      return this.nonExclusiveJeans.concat(this.exclusiveJeans)
    },
    ...mapState({
      aShops: state => state.active.shop,
      aJeans: state => state.active.jean,
      aPockets: state => state.active.pockets,
      shops: state => state.bind.shops,
      jeans: state => state.bind.jeans
    })
  }
}
</script>
