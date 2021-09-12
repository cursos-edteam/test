import { createStore } from 'vuex';
import { db } from '@/firebase';

export default createStore({
  state: {
    loggedPhone: false as boolean,
    userUid: null as string,
    messages: [] as any[],
  },
  mutations: {
    setLoggedPhone(state, payload): void {
      state.loggedPhone = payload;
    },
    setUserUid(state, payload): void {
      state.userUid = payload;
    },
    setMessage(state, payload): void {
      state.messages = payload;
    },
  },
  actions: {
    // Obteniendo mensajes por el userUid
    async getMessages({ commit, state }) {
      try {
        const allMessages: any[] = [];
        const querySnapshot = await db.collection('messages').where('userUid', 'in', [state.userUid, state.loggedPhone]).orderBy('date').get();
        querySnapshot.forEach((snapShot) => {
          allMessages.push(snapShot.data());
        });
        commit('setMessage', allMessages);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  },
});
