import Api from '../api'

const RANDOM_ENTITY = 'RANDOM_ENTITY'

const state = {
    entries: [{}]
}

const actions = {
    async randomEntity({commit}) {
        const response = await Api.randomEntity();
        console.log(response)
        commit(RANDOM_ENTITY, response.data)
    },
}

const mutations = {
    [RANDOM_ENTITY] (state, payload) {
        state.entries = payload.entries
    }
}

export default {
    state,
    actions,
    mutations
}
