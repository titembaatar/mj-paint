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
        <v-snackbar v-model="error" color="warning" top>
          問題がありました。もう一回情報を入力してください。
          <v-icon @click="error = null" dark>
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
              ログイン
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

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      rules: [v => !!v || '必要']
    }
  },
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
