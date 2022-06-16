<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h1 class="font-weight-bolder text-success text-gradient">
                    Login
                  </h1>
                  <!-- <p class="mb-0">Enter your username and password to sign in</p> -->
                </div>
                <div class="card-body">
                  <div class="text-start">
                    <label>Username</label>
                    <vsud-input
                      id="username"
                      type="text"
                      placeholder="Username"
                      name="username"
                    />
                    <label>Password</label>
                    <vsud-input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        @click="handleLogin"
                        >Sign in
                      </vsud-button>
                    </div>
                  </div>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Change password ?
                    <router-link
                      :to="{ name: 'Change PassWord' }"
                      class="text-success text-gradient font-weight-bold"
                      >Change password</router-link
                    >
                  </p>
                </div> -->
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import baseReq from "../../../api/baseReq";

export default {
  name: "SignIn",
  computed: mapGetters(["users"]),
  components: {
    // Navbar,
    VsudInput,
    VsudButton,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    console.log(process.env.VUE_APP_API_URL);
    body.classList.remove("bg-gray-100");
    // localStorage.setItem("user", JSON.stringify(this.users));
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    handleLogin() {
      const userName = document.querySelector("#username");
      const passWord = document.querySelector("#password");
      var data = {
        username: userName.value,
        password: passWord.value,
      };
      baseReq
        .post("auth", data)
        .then((response) => {
          this.$router.push({ name: "Dashboard" });
          localStorage.setItem("token", response.data.data.access_token);
          this.toast.success("Login success!");
        })
        .catch((error) => {
          console.log(error);
          this.toast.error("Login fail");
        });
    },
  },
};
</script>
