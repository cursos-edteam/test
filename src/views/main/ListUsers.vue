<template>
  <div class="users">
    <ul>
      <li
        v-for="user in aUsers"
        :key="user.id"
        :class="{
          active: user.userUid === sUserUid
        }"
        @click="setUserUid(user)">
        <img loading="lazy" :src="user.photoURL" class="img"/>
        <section class="description">
          <span>{{ user.name }}</span>
          <span>Ultimo mensaje</span>
        </section>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, onMounted, ref, computed,
} from 'vue';
import { useStore } from 'vuex';
import { firebase, db } from '../../firebase';
import IUser from '../../interfaces/User';

export default defineComponent({
  setup() {
    const users = db.collection('users');
    const aUsers = ref<IUser[]>([]);
    const store = useStore();
    const setUserUid = (user: IUser): void => {
      store.commit('setUserUid', user.userUid);
      store.dispatch('getMessages');
    };
    const sUserUid = computed(() => store.state.userUid);
    onMounted(async () => {
      const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await users.get();
      querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
        const {
          photoURL, name, email, userUid,
        } = doc.data();
        aUsers.value.push({
          id: doc.id,
          photoURL,
          name,
          email,
          userUid,
        });
      });
    });
    return {
      aUsers,
      setUserUid,
      sUserUid,
    };
  },
});
</script>
<style lang="scss" scoped>
.users {
  width: 100%;
  ul {
    list-style: none;
    padding: 10px;
    margin: 0;
    width: calc(100% - 20px);
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      cursor: pointer;
      .img {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        margin-left: 10px;
      }
      .description {
        width: calc(100% - 60px - 30px);
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }
  }
  .active {
    background: #8774E1;
    border-radius: 8px;
  }
}
</style>
