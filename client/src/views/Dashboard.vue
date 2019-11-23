<template>
    <div class="container">
        <div class="header">
            <router-link class="login-btn" tag="button" to="/login"><< Login</router-link>
            <app-profile-card/>
        </div>
        <app-users-list-card/>
        <div class="funny-image" v-if="false">
            <img src="../assets/fun.jpg" alt="funny">
        </div>
        <img v-if="!error" class="i-workshop" src="../assets/workshop.png" alt="Interlink workshop">
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
            height: 20rem;
        }
    }
</style>
