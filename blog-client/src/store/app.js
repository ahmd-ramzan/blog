import {defineStore} from "pinia"
import axios from "axios"

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            authenticated: false,
            user: null,
            loginErrors : {},
            invalidCredentialsError: ''
        }
    },
    actions: {
        async authenticate(token) {
          let {data} = await axios.get('/api/user', {headers: {'Authorization': `Bearer ${token}`}})
            if (data) {
                this.authenticated = true
                this.setUser(data)
            }  else {
                this.authenticated = false
                this.setUser(null)
            }
        },
        setUser(user) {
            this.user = user
        },
        async login (credentials) {
            let {data} = await axios.post('/api/login', credentials)
            if (data.status === 1) {
                await this.authenticate(data.token.split('|')[1])
                return 1
            }
            if (data.status === 0) {
                this.loginErrors = data.errors
            }
            if (data.status === 2) {
                this.loginErrors = {}
                this.invalidCredentialsError = data.message
            }
        }
    }
})