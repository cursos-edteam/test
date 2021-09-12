<template>
  <div class="home">
    <section class="ListUser">
      <Search/>
      <ListUser/>
    </section>
    <section class="Messages">
      <Messages/>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListUser from './main/ListUsers.vue';
import Search from './main/Search.vue';
import Messages from './main/Messages.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ListUser,
    Messages,
    Search,
  },
});
</script>
<style lang="scss" scoped>
.home {
  background: #212121;
  height: 100vh;
  width: 100%;
  color: #FFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  .ListUser {
    width: 30%;
  }
  .Messages {
    width: 70%;
  }
}
</style>
