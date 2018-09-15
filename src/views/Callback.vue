<template>
    <div class="about">
        <h1>Work with setTimeout</h1>
        <h2>Show something after 2 seconds</h2>
        <button class="go" v-on:click="go">Go</button>
        <h2>{{something}}</h2>
    </div>
</template>

<script>
export default {
    data: () => ({
       something: ''
    }),
    methods: {
        go: function () {
            setTimeout(() => {
                this.something = 'Hello World'
            }, 2000)
        }
    }
}
</script>
