<template>
<section>
    <the-header></the-header>
    <router-view></router-view>
</section>
</template>

<script>
import TheHeader from './components/layout/TheHeader'
export default {
    components: {
        TheHeader
    },

    computed: {
        dudAutoLogout() {
            return this.$store.getters.didAutoLogout;
        }
    },

    created() {
        this.$store.dispatch('tryLogin');
    },

    watch: {
        didAutoLogout(curlValue, oldValue) {
            if (curlValue && curlValue !== oldValue) {
                this.$router.replace('/coaches');
            }
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
    box-sizing: border-box;
}

html {
    font-family: "Roboto", sans-serif;
}

body {
    margin: 0;
}
</style>
