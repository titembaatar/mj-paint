<template>
  <v-form v-model="valid">
    <v-text-field v-model="newJeans.id" :rules="rules" label="ID" required />
    <v-text-field
      v-model="newJeans.display"
      :rules="rules"
      label="漢字"
      required
    />
    <v-select
      v-model="newJeans.pocketColor"
      :rules="rules"
      :items="pocketsColor"
      label="生地"
      required
    />
    <v-switch v-model="newJeans.stripes" :label="'出陣ライン'" />
    <v-select
      v-if="newJeans.stripes"
      v-model="newJeans.stripeUpFill"
      :rules="rules"
      :items="COLORSPICKER"
      label="上出陣ライン色"
    />
    <v-select
      v-if="newJeans.stripes"
      v-model="newJeans.stripeDwnFill"
      :rules="rules"
      :items="COLORSPICKER"
      label="下出陣ライン色"
    />
    <v-switch v-model="newJeans.stitch" :label="'道丹ステッチ'" />
    <v-switch v-model="newJeans.kids" :label="'キッズ'" />
    <v-select
      v-model="newJeans.exclusive"
      :items="SHOPSPICKER"
      label="限定"
      chips
      multiple
      :menu-props="{ top: true, offsetY: true }"
    />
    <v-btn
      :disabled="!valid"
      :dark="valid"
      block
      color="indigo"
      class="mb-4"
      @click="
        $emit('submit', {
          ref: 'jeans',
          child: jeansLength,
          data: newJeans
        })
      "
    >
      追加
    </v-btn>
  </v-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      rules: [v => !!v || '必要'],
      valid: false,
      pocketsColor: [
        { text: '特濃ブルー', value: '#01060C' },
        { text: 'オールドブルー', value: '#14203b' },
        { text: 'デッドストックブルー', value: '#19312d' }
      ],
      newJeans: {
        id: '',
        display: '',
        pocketColor: '',
        stripes: false,
        stripeUpFill: 'transparent',
        stripeDwnFill: 'transparent',
        stitch: false,
        kids: false,
        exclusive: []
      }
    }
  },
  computed: {
    ...mapState({
      shops: state => state.bind.shops,
      colors: state => state.bind.colors
    }),
    ...mapGetters(['jeansLength']),
    COLORSPICKER() {
      let cp = []
      for (let i = 0; i < this.shops.length; i++) {
        const shop = this.shops[i]
        cp.push({ text: shop.colorDisplay, value: shop.color })
      }
      for (let i = 0; i < this.colors.length; i++) {
        const color = this.colors[i]
        cp.push({ text: color.display, value: color.color })
      }
      return cp
    },
    SHOPSPICKER() {
      let sp = []
      for (let i = 0; i < this.shops.length; i++) {
        const shop = this.shops[i]
        sp.push({ text: shop.display, value: shop.id })
      }
      return sp
    }
  }
}
</script>
