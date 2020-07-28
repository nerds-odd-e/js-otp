import Vue from 'vue'
import Vuex from 'vuex'
import entity from './entity'

Vue.use(Vuex)

export const createStore = () => new Vuex.Store({
    // strict: true,
    modules: {
        entity
    }
})

const store = createStore()

export default store
