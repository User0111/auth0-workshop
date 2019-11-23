<template>
    <div class="users">
        <p class="title">Users</p>
        <span v-if="error" class="error">{{error}}</span>
        <app-user-card
                v-if="!error && users.length"
                v-for="user in users"
                :user="user"
        />
        <span class="no-data" v-if="!error && !users.length">No data</span>
    </div>
</template>

<script>
    import AppUserCard from './UserCard.vue';
    import axios from 'axios';

    export default {
        name: 'UsersLisrCard',
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
    .users {
        padding: 0.5rem;
        font-weight: 600;
        font-size: 1.25rem;
        text-align: left;

        .no-data {
            font-size: 0.9rem;
        }
    }
</style>
