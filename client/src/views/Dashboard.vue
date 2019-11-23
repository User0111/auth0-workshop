<template>
    <div class="container">
        <div class="header">
            <router-link class="login-btn" tag="button" to="/login"><< Login</router-link>
            <button class="logout">LOGOUT</button>
        </div>
        <div class="users">
            <p class="title">Users</p>
            <span v-if="error" class="error">{{error}}</span>
            <app-user-card v-if="!error" v-for="user in users" :user="user"/>
        </div>
        <div class="funny-image" v-if="false">
            <img src="../assets/fun.jpg" alt="funny">
        </div>
        <img v-if="!error" class="i-workshop" src="../assets/workshop.png" alt="Interlink workshop">
    </div>
</template>

<script>
    import axios from 'axios';
    import AppUserCard from '../components/UserCard.vue';

    export default {
        name: 'Dashboard',
        components: {AppUserCard},
        data() {
            return {
                users: [],
                error: '',
            }
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                const usersUrl = 'http://localhost:3000/users';
                axios.get(usersUrl)
                    .then(res => {
                        this.users = res.data;
                        this.setError();
                    }).catch((error) => {
                    this.setError('Request failed: ' + JSON.stringify(error));
                });
            },
            setError(error = '') {
                this.error = error;
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        .header {
            display: flex;
            flex: 10;
            justify-content: space-between;
            align-items: center;


            .login-btn, .logout {
                width: 7rem;
            }
        }

        .users {
            padding: 0.5rem;
            font-weight: 600;
            font-size: 1.25rem;
            text-align: left;
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
