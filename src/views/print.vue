<template>
  <div>
    <v-app-bar
      app
      color="white"
      max-width="100vw"
      elevate-on-scroll
      class="d-none d-print-none"
    >
      <v-btn depressed large color="primary" :to="{ name: 'Home' }">
        <v-icon>$logo</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-row justify="center" align="center" class="d-print-none d-none">
        <v-card class="pa-4" max-width="300px" flat>
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="顧客番号"
                  v-model.number="form.customerID"
                />
              </v-col>
              <v-col cols="2" class="align-self-center text-align">ー</v-col>
              <v-col cols="4">
                <v-text-field label="店舗番号" v-model.number="form.shopID" />
              </v-col>
            </v-row>
            <v-text-field label="お名前" v-model="form.customerName" />

            <v-menu
              v-model="menu"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="仕上がり予定日"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu = false"
              ></v-date-picker>
            </v-menu>

            <v-text-field label="品番" v-model="form.jeansID" />
            <v-select
              label="サイズ"
              :items="sizes"
              v-model="form.size"
              :menu-props="{ top: true, offsetY: true }"
            />
            <v-text-field label="担当者" v-model="form.clerk" />
            <v-alert type="info" class="font-size">
              手書きしたい場合、フォームを入力せず印刷ボタンを押してください。
            </v-alert>
            <v-row>
              <v-spacer />
              <v-btn color="success" class="mr-4" depressed　@click="print()">
                印刷
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <div id="printContainer" class="d-flex d-print-flex flex-column">
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
                {{ today }}
              </v-row>
            </v-card>

            <v-card outlined tile class="pa-2 flex-grow-1">
              <v-row no-gutters justify="end">
                <v-spacer v-if="form.customerID === null" />
                <v-spacer v-if="form.customerID === null" />
                {{ form.customerID }} －
                <v-spacer v-if="form.shopID === null" />
                {{ form.shopID }}
              </v-row>
            </v-card>

            <v-card outlined tile class="pa-2 flex-grow-1">
              <v-row no-gutters justify="end">
                {{ form.customerName }} <v-spacer />様
              </v-row>
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
                {{ dateFormatted }}
              </v-row>
            </v-card>
            <v-card outlined tile class="pa-2 flex-grow-1">
              <v-row no-gutters justify="end">
                <v-spacer v-if="form.size === null" />
                <v-spacer v-if="form.size === null" />
                {{ form.jeansID }}／
                <v-spacer v-if="form.size === null" />
                {{ form.size }} Ｗ
              </v-row>
            </v-card>
            <v-card outlined tile class="pa-2 flex-grow-1">
              <v-row no-gutters> {{ aShops.display }}・{{ form.clerk }} </v-row>
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
              <v-row no-gutters> </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          v-for="(pocket, i) in printPockets"
          :key="i"
          class="egalHeight"
        >
          <v-col class="d-flex flex-column pa-0 fuck-col">
            <v-card
              outlined
              tile
              class="pa-2 flex-grow-1 d-flex"
              max-width="15mm"
            >
              <v-card-text class="leftRight ma-auto">
                {{ leftOrRight(i) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-row no-gutters class="fill-height">
              <v-col
                v-for="(layer, j) in pocket.layers"
                :key="j"
                :style="layer.pattern === '' ? 'opacity: 0' : ''"
                class="d-flex flex-column"
                cols="4"
              >
                <v-card
                  outlined
                  tile
                  class="pa-2 flex-grow-1"
                  v-if="layer.isPrint === true"
                >
                  <v-row no-gutters>
                    <v-icon size="1rem" color="black">
                      mdi-checkbox-marked-outline
                    </v-icon>
                    <span class="text-uppercase">
                      D/#{{ printPockets[i].layers[j].patternID }}
                    </span>
                    <v-spacer />
                    <span>{{ printPockets[i].layers[j].patternDisplay }}</span>
                    <v-spacer />
                    <v-spacer />
                    <v-spacer />
                    <span>{{ j + 1 }}番目</span>
                  </v-row>
                  <v-row no-gutters>
                    <span>カラー：{{ printPockets[i].layers[j].colorID }}</span>
                  </v-row>
                  <v-row no-gutters justify="center">
                    <svg viewBox="0 0 500 500" class="flex-grow-1">
                      <BasePocketSvg :stitch="false" :sp="false" />
                      <BasePath
                        :id="printPockets[i].layers[j].id"
                        :fill="printPockets[i].layers[j].color"
                        :path="printPockets[i].layers[j].pattern"
                        :icsp="printPockets[i].layers[j].icsp"
                      />
                    </svg>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
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
              <v-row no-gutters> </v-row>
            </v-card>
          </v-col>

          <v-col class="d-flex flex-column" style="max-width:10mm">
            <v-card outlined tile class="flex-grow-0">
              <v-row no-gutters justify="center">
                本社
              </v-row>
            </v-card>
            <v-card outlined tile class="pa-1 flex-grow-1">
              <v-row no-gutters> </v-row>
            </v-card>
          </v-col>

          <v-col class="d-flex flex-column" style="max-width:10mm">
            <v-card outlined tile class="flex-grow-0">
              <v-row no-gutters justify="center">
                営業
              </v-row>
            </v-card>
            <v-card outlined tile class="pa-1 flex-grow-1">
              <v-row no-gutters> </v-row>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: 'Print',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      sizes: [
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '36',
        '38',
        '40',
        '42',
        '44',
        '46'
      ],
      form: {
        customerID: null,
        customerName: null,
        shopID: null,
        jeansID: null,
        size: null,
        clerk: null
      }
    }
  },
  computed: {
    today() {
      let dateObj = new Date()
      let month = dateObj.getUTCMonth() + 1
      let day = dateObj.getUTCDate()
      let year = dateObj.getUTCFullYear()

      return year + '年　' + month + '月　' + day + '日'
    },
    dateFormatted() {
      return this.formatDate(this.date)
    },
    ...mapState({
      aShops: state => state.active.shop
    }),
    ...mapGetters(['paintNumber', 'printPockets'])
  },
  methods: {
    leftOrRight(i) {
      return i === 0 ? '左ポケット' : '右ポケット'
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}年　${month}月　${day}日`
    },
    print() {
      window.print()
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

.egalHeight
  height: 70mm

svg
  max-height: 50mm

.text-align
  text-align: center

.fuck-col
  max-width: 15mm

.font-size
  font-size: .7rem

.leftRight
  writing-mode: vertical-rl
  white-space: pre
  text-align: center
</style>
