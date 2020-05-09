<template>
  <div id="svg">
    <svg viewBox="0 0 500 500">
      <BasePocketSvg :stitch="false" :sp="false" />
      <BasePath
        v-for="layer in pockets[0].layers"
        :key="layer.id"
        :id="layer.id"
        :fill="layer.color"
        :path="layer.pattern"
        :icsp="layer.icsp"
      />
    </svg>
    <svg viewBox="0 0 500 500">
      <BasePocketSvg :stitch="true" :sp="true" />
      <BasePath
        v-for="layer in pockets[1].layers"
        :key="layer.id"
        :id="layer.id"
        :fill="layer.color"
        :path="layer.pattern"
        :icsp="layer.icsp"
      />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      pockets: state => state.active.pockets
    }),
    icLayers() {
      let x = []
      for (let i = 0; i < this.pockets.length; i++) {
        const p = this.pockets[i]
        for (let j = 0; j < p.layers.length; j++) {
          const l = p.layers[j]
          if (l.id === 'ic') {
            x.push(l)
          }
        }
      }
      return x
    }
  }
}
</script>

<style lang="sass" scoped>
#svg
  width: 100%
  flex: 1
  overflow: auto
  display: flex
  flex-flow: row nowrap

  svg
    padding: 2rem
    flex: 0 1 content
</style>
