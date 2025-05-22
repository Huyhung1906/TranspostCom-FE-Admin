import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ username: '', isLoggedIn: false }),
  actions: {
    login(name: string) {
      this.username = name
      this.isLoggedIn = true
    }
  }
})