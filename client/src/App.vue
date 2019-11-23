<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    button {
        margin: 0.25rem;
        color: #fff !important;
        text-transform: uppercase;
        text-decoration: none;
        background: red;
        padding: 20px;
        border-radius: 5px;
        display: inline-block;
        border: none;
        transition: all 0.4s ease 0s;
        font-weight: 600;

        &:hover {
            background: #434343;
            letter-spacing: 1px;
            -webkit-box-shadow: 0 5px 40px -10px rgba(0, 0, 0, 0.57);
            -moz-box-shadow: 0 5px 40px -10px rgba(0, 0, 0, 0.57);
            box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
            transition: all 0.4s ease 0s;
        }

        &:focus {
            outline: unset;
        }
    }

    .error {
        color: red;
    }
</style>
