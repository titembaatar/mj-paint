<template>
  <v-content>
    <div id="printContainer" class="d-none d-print-flex flex-column">
      <v-card outlined tile dark color="grey">
        <v-row no-gutters>
          <v-spacer />
          <h1>バックポケットペイント注文用紙</h1>
          <v-spacer />
        </v-row>
      </v-card>
      <v-row no-gutters>
        <v-col class="d-flex flex-column" style="max-width:35mm">
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              注文日
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              顧客番号
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              お名前
            </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex flex-column">
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              {{ date }}
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              <v-spacer /><v-spacer />－<v-spacer />
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end"> <v-spacer />様 </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex flex-column" style="max-width:35mm">
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              仕上がり予定日
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              品番・サイズ
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              受注店・担当
            </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex flex-column">
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              <v-spacer /><v-spacer />年<v-spacer />月<v-spacer />日
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="end">
              <v-spacer /><v-spacer />／<v-spacer /> Ｗ
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="begin"> {{ aShops.display }}・ </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex flex-column" style="max-width:45mm">
          <v-card outlined tile class="pa-2 flex-grow-0">
            <v-row no-gutters justify="end">
              ペイント数
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="center">
              <p>★お客様最終確認★</p>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="d-flex flex-column">
          <v-card outlined tile class="pa-2 flex-grow-0">
            <v-row no-gutters justify="center">
              {{ paintNumber }}
            </v-row>
          </v-card>

          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters justify="begin"> </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-for="(pocket, i) in pockets" :key="i">
        <v-col cols="auto" class="d-flex flex-column ">
          <v-card
            outlined
            tile
            class="pa-2 flex-grow-1 d-flex"
            min-width="15mm"
          >
            <p style="writing-mode: vertical-rl" class="ma-auto">
              {{ leftOrRight(i) }}
            </p>
          </v-card>
        </v-col>

        <v-col
          v-for="(layer, j) in pocket.layers"
          :key="j"
          :style="layer.pattern === '' ? 'opacity: 0' : ''"
          class="d-flex flex-column"
        >
          <v-card outlined tile class="pa-2 flex-grow-1">
            <v-row no-gutters>
              <v-icon size="1rem" color="black">
                mdi-checkbox-marked-outline
              </v-icon>
              <span class="text-uppercase">
                D/#{{ pockets[i].layers[j].patternID }}
              </span>
              <v-spacer />
              <span>{{ pockets[i].layers[j].patternDisplay }}</span>
              <v-spacer />
              <v-spacer />
              <v-spacer />
              <span>{{ j + 1 }}番目</span>
            </v-row>
            <v-row no-gutters>
              <span>カラー：{{ pockets[i].layers[j].colorID }}</span>
            </v-row>
            <v-row no-gutters justify="center">
              <svg viewBox="0 0 500 500">
                <BasePocketSvg :stitch="false" :sp="false" />
                <BasePath
                  :id="pockets[i].layers[j].id"
                  :fill="pockets[i].layers[j].color"
                  :path="pockets[i].layers[j].pattern"
                  :icsp="pockets[i].layers[j].icsp"
                />
              </svg>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="d-flex flex-column" style="max-width:10mm">
          <v-card outlined tile class="flex-grow-0">
            <v-row no-gutters justify="center">
              工場
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-1 flex-grow-1">
            <v-row no-gutters justify="end"> </v-row>
          </v-card>
        </v-col>

        <v-col class="d-flex flex-column" style="max-width:10mm">
          <v-card outlined tile class="flex-grow-0">
            <v-row no-gutters justify="center">
              本社
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-1 flex-grow-1">
            <v-row no-gutters justify="end"> </v-row>
          </v-card>
        </v-col>

        <v-col class="d-flex flex-column" style="max-width:10mm">
          <v-card outlined tile class="flex-grow-0">
            <v-row no-gutters justify="center">
              営業
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-1 flex-grow-1">
            <v-row no-gutters justify="end"> </v-row>
          </v-card>
        </v-col>

        <v-col cols="3" class="d-flex flex-column">
          <v-card outlined tile class="flex-grow-0">
            <v-row no-gutters justify="center">
              1番目
              <v-icon size="1rem" color="black">mdi-chevron-left</v-icon>
              <v-icon size="1rem" color="black">mdi-minus</v-icon>
              <v-icon size="1rem" color="black">mdi-chevron-right</v-icon>
              3番目
            </v-row>
          </v-card>
          <v-card outlined tile class="pa-1 flex-grow-1">
            <v-row no-gutters justify="center">
              下
              <v-icon size="1rem" color="black">mdi-chevron-left</v-icon>
              <v-icon size="1rem" color="black">mdi-minus</v-icon>
              <v-icon size="1rem" color="black">mdi-chevron-right</v-icon>
              上
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-content>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: 'Print'
    }
  },
  computed: {
    date() {
      let dateObj = new Date()
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()

      return year + '年　' + month + '月　' + day + '日'
    },
    ...mapState({
      pockets: state => state.active.pockets,
      aShops: state => state.active.shop
    }),
    ...mapGetters(['paintNumber'])
  },
  methods: {
    leftOrRight(i) {
      return i === 0 ? '左ポケット' : '右ポケット'
    }
  }
}
</script>

<style lang="sass" scoped>
#printContainer
  width: 267mm
  max-width: 267mm
  height: 200mm
  max-height: 200mm
  position: absolute
  top: calc(67mm/2)
  left: calc(-67mm/2)
  transform: rotate(90deg)


svg
  max-height: 50mm
</style>
