<template>
    <div class="about">
        <h1>This is an about page</h1>
        <h1>Your random api is {{result}}</h1>
        <button v-on:click="go">Go</button>
    </div>
</template>

<script>
import {randomEntity} from "../api";

export default {
    data: () => ({
        result: ''
    }),
    methods: {
        go: async function () {
            const response = await randomEntity();
            this.result = response.data.entries[0].API;
        }
    }
}
</script>
