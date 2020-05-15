<template>
  <div class="fill-height">
    <v-app-bar app color="white" max-width="100vw" flat>
      <v-btn depressed large color="primary" :to="{ name: 'Home' }">
        <v-icon>$logo</v-icon>
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-content class="fill-height">
      <div class="d-flex flex-column justify-start align-center fill-height">
        <v-snackbar v-model="error.call" color="red" multi-line>
          <v-icon dark class="mr-4">mdi-alert</v-icon>
          メールまたは、パスワードが違います。 もう一度入力ください。
          <v-icon @click="error.call = false" dark>
            mdi-close
          </v-icon>
        </v-snackbar>

        <v-card width="300px" class="mt-12" outlined>
          <v-card-title>ログイン</v-card-title>
          <v-form class="pa-4">
            <v-text-field
              v-model="form.email"
              :rules="rules"
              label="メール"
              type="email"
              required
            />
            <v-text-field
              v-model="form.password"
              :rules="rules"
              label="パスワード"
              type="password"
              required
              @keyup.enter="submit()"
            />
            <v-btn @click="submit()" color="primary" block depressed>
              <span v-if="load === false">ログイン</span>
              <v-progress-circular
                size="24"
                :width="3"
                color="white"
                indeterminate
                v-if="load === true"
              />
            </v-btn>
          </v-form>
        </v-card>
      </div>
    </v-content>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { auth, signInWithEmailAndPassword } from 'firebase/auth'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: [v => !!v || '必要']
    }
  },
  computed: mapState({
    load: state => state.auth.load,
    error: state => state.auth.error
  }),
  methods: {
    submit() {
      this.$store.dispatch('fetchUser', {
        email: this.form.email,
        password: this.form.password
      })
    }
  }
}
</script>
