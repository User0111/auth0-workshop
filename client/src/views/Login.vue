<template>
    <div class="container">
        <div class="header">
            <router-link
                    class="dashboard-btn"
                    to="/dashboard"
                    tag="button"
            >
                Dashboard >>
            </router-link>
        </div>
        <div class="auth-wrapper">
            <button v-if="!$auth.loading" @click="login" class="login-btn">
                <img src="../assets/auth0-black.png" alt="auth0">
                LOGIN WITH GOOGLE
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            login() {
                this.$auth.loginWithRedirect();
            },
        },
    }
</script>


<style scoped lang="scss">
    .container {
        .header {
            display: flex;
            justify-content: flex-end;

            .dashboard-btn {
                align-items: flex-end;

                a {
                    color: white;
                    text-decoration: none;
                }
            }
        }

        .auth-wrapper {
            height: 70vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.25rem;

            .login-btn {
                width: 16rem;
                font-size: 1rem;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                img {
                    height: 25px;
                    width: 25px;
                }
            }
        }
    }

    .container::after {
        content: "";
        background: url("../assets/i-small-logo.png");
        opacity: 0.3;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }
</style>
