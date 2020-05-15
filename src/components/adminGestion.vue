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
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="sendRefAndID(reference, object.id), (deleteConfirm = true)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteConfirm" max-width="350px">
      <v-card class="pt-8">
        <v-card-text>
          本当にこのアイテムを解消しますか。
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            depressed
            color="red"
            dark
            @click="remove(ref, id), (deleteConfirm = false)"
          >
            解消
          </v-btn>
          <v-btn color="red" text @click="deleteConfirm = false">
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      deleteConfirm: false,
      ref: null,
      id: null
    }
  },
  computed: {
    reverse() {
      return [...this.objects].reverse()
    }
  },
  methods: {
    remove(r, id) {
      this.$store.dispatch('remove', { ref: r, child: id })
    },
    sendRefAndID(r, id) {
      this.ref = r
      this.id = id
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
