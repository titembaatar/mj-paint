<template>
  <v-btn-toggle v-model="objectActive" :color="aShops.color">
    <v-btn
      v-for="(object, index) in objects"
      :key="object.id"
      v-text="object.display"
      :value="value === true ? object.id : ''"
      @click="$emit('click', [index, object.id])"
    />
  </v-btn-toggle>
</template>

<script>
import { ResetActive } from '../buses/reset-active'
import { mapState } from 'vuex'

export default {
  props: {
    objects: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      objectActive: null
    }
  },
  computed: {
    ...mapState({
      aShops: state => state.active.shop
    }),
    length() {
      return this.objects.length
    }
  },
  watch: {
    length: function() {
      if (this.$store.getters.loaded === true) {
        this.objectActive = this.objects[0].id
        this.$emit('click', [0, this.objects[0].id])
      }
    }
  },
  created() {
    ResetActive.$on('resetClicked', reset => {
      this.objectActive = null
    })
  }
}
</script>
