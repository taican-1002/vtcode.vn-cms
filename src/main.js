import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//pagination
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

//datetime pickers

import VueFlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

//dayjs
import dayjs from "dayjs";
// import baseUrl from "./api/baseUrl";
import CKEditor from "@ckeditor/ckeditor5-vue";

const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(Toast);
appInstance.use(CKEditor);
appInstance.use(VueFlatPickr);
appInstance.config.globalProperties.$dayjs = dayjs;
appInstance.provide("dayJS", dayjs); // provide dayJS
appInstance.component(VPagination);
appInstance.use(SoftUIDashboard);
appInstance.component("font-awesome-icon", FontAwesomeIcon);
appInstance.mount("#app");
