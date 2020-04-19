<template>
    <div class="container">
        <div class="header">
            <router-link class="login-btn" tag="button" to="/login"><< Login</router-link>
            <app-profile-card/>
        </div>
        <app-users-list-card/>
        <div class="funny-image" v-if="true">
            <img src="../assets/fun.jpg" alt="funny">
        </div>
        <img class="i-workshop" src="../assets/workshop-logo.png" alt="Interlink workshop">
    </div>
</template>

<script>
    import AppUsersListCard from '../components/UsersListCard.vue';
    import AppProfileCard from "../components/ProfileCard";

    export default {
        name: 'Dashboard',
        components: {AppUsersListCard, AppProfileCard},
    }
</script>

<style scoped lang="scss">
    .container {
        .header {
            display: flex;
            flex: 10;
            justify-content: space-between;
            align-items: center;


            .login-btn {
                width: 7rem;
            }
        }

        .funny-image {
            align-self: flex-end !important;

            img {
                height: 16rem;
                width: 27rem;
            }
        }

        .i-workshop {
            height: 25rem;
        }
    }
</style>
