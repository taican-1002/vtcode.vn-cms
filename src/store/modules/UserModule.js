var idUser = 4;
const userModule = {
  state: {
    users: [
      {
        id: 1,
        username: "admin",
        password: "Admin@123",
      },
      {
        id: 2,
        username: "user1",
        password: "User1@123",
      },

      {
        id: 3,
        username: "user2",
        password: "User2@123",
      },
    ],
  },
  getters: {
    users: (state) => state.users,
  },
  mutations: {
    // USER
    ADD_USER(state, newUser) {
      newUser.id = idUser++;
      state.users.push(newUser);
    },
    EDIT_USER(state, newUser) {
      state.users.map((item) => {
        if (item.id === newUser.id) {
          Object.assign(item, newUser);
        }
        return item;
      });
    },
    DELETE_USER(state, newUser) {
      state.users = state.users.filter((user) => user.id !== newUser.id);
    },
  },
  actions: {
    // USER
    addUser({ commit }, newUser) {
      commit("ADD_USER", newUser);
    },
    editUserAction({ commit }, newUser) {
      commit("EDIT_USER", newUser);
    },
    deleteUserAction({ commit }, newUser) {
      commit("DELETE_USER", newUser);
    },
  },
};
export default userModule;
