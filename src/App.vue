<template>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isWhite,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <br />
    <!-- <app-footer v-show="this.$store.state.showFooter" /> -->
    <!-- <configurator
      class="configurator"
      :toggle="toggleConfigurator"
      :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : '',
      ]"
    /> -->
  </main>
</template>
<script>
import Sidenav from "./views/layout/main/Sidenav";
// import Configurator from "./views/components/pages/Configurator.vue";
import Navbar from "./views/layout/main/Navbars/Navbar.vue";
// import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
    // Configurator,
    Navbar,
    // AppFooter,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-2": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isWhite = "bg-white";
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
}
.flex {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.white-space {
  white-space: break-spaces !important;
  max-width: 20rem;
}
td,
th {
  padding: 5px;
}

th {
  cursor: pointer;
}
/* .g-sidenav-show:not(.rtl) .sidenav {
  transform: translateX(-15rem);
}
.g-sidenav-show.g-sidenav-pinned .sidenav {
  transform: translateX(0);
} */
/* .sidenav.fixed-start ~ .main-content {
  margin-left: 0 !important;
} */
button {
  border: none;
}
.btn:hover {
  color: #fffa00 !important;
}
.btn-add {
  background-image: linear-gradient(
    310deg,
    #112385 0%,
    #000000 100%
  ) !important;
  color: #fff !important;
}
.btn-close {
  background-image: linear-gradient(
    310deg,
    #112385 0%,
    #729eca 100%
  ) !important;
  color: #fff !important;
  width: unset !important;
  height: unset !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 0.5rem !important;
  opacity: 1 !important;
}
.navbar-vertical .navbar-nav > .nav-item .nav-link.active .icon {
  background-image: linear-gradient(
    310deg,
    #112385 0%,
    #729eca 100%
  ) !important;
}

.dropdown .dropdown-menu.dropdown-menu-end:before {
  right: 40px !important;
}
/* @media only screen and (max-width: 1199.98px) {
  .g-sidenav-show:not(.rtl) .sidenav {
    transform: translateX(-15rem) !important;
  }
  .g-sidenav-show.g-sidenav-pinned .sidenav {
    transform: translateX(0) !important;
  }
} */
.form-control[readonly] {
  background-color: unset !important;
  opacity: 1;
  cursor: pointer;
}
/**Pagination */
.Pagination .Control,
.Pagination .Page {
  width: 30px;
  height: 30px;
}
/**tab */
.nav.nav-pills {
  background: unset !important;
}
.nav.nav-pills .nav-link.active {
  background: #0d6efd;
  color: #fff;
}
/**Tinymce */
.modal-content .mce-preview-object,
span.mce-preview-object .mce-object-iframe {
  position: relative !important;
  height: 300px !important;
}
</style>
