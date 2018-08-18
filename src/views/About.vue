<template>
    <div class="about">
        <h1>This is an about page</h1>
        <h1>Your random api is {{result}}</h1>
        <button v-on:click="go">Go</button>
        <h1>Your random api from store is {{storeResult}}</h1>
        <button v-on:click="randomEntity">GoStore</button>
    </div>
</template>

<script>
import Api from '@/api'
import {mapState, mapActions} from 'vuex'

export default {
    data: () => ({
        result: ''
    }),
    computed: mapState({
        storeResult: state => state.entity.entries[0].API
    }),
    methods: {
        go: async function () {
            const response = await Api.randomEntity();
            console.log(response)
            this.result = response.data.entries[0].API;
        },
        ...mapActions([
            'randomEntity'
        ])
    }
}
</script>
