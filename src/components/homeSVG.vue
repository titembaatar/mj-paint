<template>
  <div id="svg">
    <homeLeft />
    <homeRight />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import homeLeft from '@/components/homeLeft.vue'
import homeRight from '@/components/homeRight.vue'

export default {
  components: {
    homeLeft,
    homeRight
  },
  computed: {
    ...mapState({
      pockets: state => state.active.pockets
    })
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
