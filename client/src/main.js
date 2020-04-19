import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import VuexAxios from 'vue-axios';
import {domain, clientId, audience} from "../auth_config.json";
import {Auth0Plugin} from "./auth";

import axios from 'axios';
import {setAuthInterceptor} from "./auth/authInterceptor";

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

setAuthInterceptor();

Vue.use(VuexAxios, axios);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
