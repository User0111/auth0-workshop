<template>
    <div class="container">
        <span>{{user.name}}</span>
        <span>{{user.email}}</span>
    </div>
</template>

<script>
    export default {
        name: 'UserCard',
        props: {user: Object}
    }
</script>


<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: start;
        padding: 0.25rem 0;

        span {
            font-size: 1rem;
            margin-right: 1rem;
        }
    }
</style>
