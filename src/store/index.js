import Vue from 'vue'
import Vuex from 'vuex'
import entity from './entity'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        entity
    }
})
