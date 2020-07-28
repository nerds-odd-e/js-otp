<template>
    <div class="about">
        <h1>This is an about page</h1>
        <h1>Your random api is {{result}}</h1>
        <button class="go" v-on:click="go">Go</button>
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
    async mounted() {
      const { data } = await Api.randomEntity()
      this.result = data.entries[0].API
    },
    methods: {
        go: async function () {
            Api.randomEntity()
                .then(response => {
                    console.log(response)
                    this.result = response.data.entries[0].API;
                    this.$toasted.show(response.data.entries[0].Link, {
                        type: 'info',
                        position: 'bottom-center',
                        duration: 2000
                    })
                });
        },
        ...mapActions([
            'randomEntity'
        ])
    }
}
</script>
