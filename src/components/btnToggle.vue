<template>
  <v-col class="pa-1">
    <v-row justify="center">
      <v-btn-toggle
        v-model="objectActive"
        :color="aShops.color"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        <v-btn
          v-for="(object, index) in objects"
          :key="object.id"
          v-text="object.display"
          :value="value === true ? object.id : ''"
          @click="$emit('click', [index, object.id])"
        />
      </v-btn-toggle>
      <v-slide-group
        v-model="objectActive"
        cclass="ma-1"
        show-arrows
        v-if="$vuetify.breakpoint.xsOnly"
      >
        <v-slide-item
          v-for="(object, index) in objects"
          :key="object.id"
          v-slot:default="{ active, toggle }"
          :value="value === true ? object.id : ''"
        >
          <v-card
            :color="active ? 'aShops.color' : ''"
            class="pa-2 ma-2"
            @click="toggle, $emit('click', [index, object.id])"
            outlined
          >
            {{ object.display }}
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>
  </v-col>
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
