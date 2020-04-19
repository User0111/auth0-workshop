<template>
    <div class="container">
        <div v-if="true" class="profile">
            <div class="avatar">
                <img :src="$auth.user.picture" alt="avatar">
            </div>
            <span class="name">
                {{$auth.user.name}}
            </span>
        </div>
        <button class="logout" @click="logout" v-if="$auth.isAuthenticated">
            LOGOUT
        </button>
    </div>
</template>;
<script>
    export default {
        name: "ProfileCard",
        data() {
            return {
                user: {
                    picture: 'https://lh3.googleusercontent.com/a-/AAuE7mAHesKgzKeH5q8lW9LcP5hy-jXMN_HAWaPGGlah',
                    name: 'Vladislav',
                }
            }
        },
        methods: {
            logout() {
                this.$auth.logout();
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;

        .profile {
            display: flex;
            align-items: center;
            margin-right: 0.75rem;

            img {
                width: 3.75rem;
                height: 3.75rem;
                border-radius: 50%;
                margin-right: 0.75rem;
            }

            .name {
                font-weight: 600;
            }
        }

        .logout {
            width: 7rem;
        }
    }
</style>
