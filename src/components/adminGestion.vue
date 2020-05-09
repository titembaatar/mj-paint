<template>
  <v-container id="gestion">
    <v-card
      v-for="(object, index) in objects"
      :key="index"
      width="250px"
      class="mb-4"
      :color="object.color ? object.color : object.pocketColor"
      :dark="object.color === '#ffffff' ? false : true"
    >
      <v-list
        two-line
        :dark="object.color === '#ffffff' ? false : true"
        :color="object.color ? object.color : object.pocketColor"
      >
        <v-list-item v-for="(value, name, i) in object" :key="i">
          <v-list-item-content>
            <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
            <v-list-item-title>{{ value }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer />
        <v-btn right icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn right icon @click="remove(reference, index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    objects: {
      type: Array,
      required: true
    },
    reference: {
      type: String,
      required: true
    }
  },
  computed: {
    reverse() {
      return [...this.objects].reverse()
    }
  },
  methods: {
    remove(r, i) {
      this.$store.dispatch('remove', { ref: r, child: i })
    }
  }
}
</script>

<style lang="sass">
#gestion
  display: flex
  flex-flow: row wrap
  justify-content: space-evenly
  align-items: center
</style>
