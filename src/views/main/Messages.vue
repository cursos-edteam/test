<template>
  <div class="messages">
    <div class="allMessages">
      <Message v-for="(message, idx) in aMessages" :objMessage="message" :key="idx"/>
    </div>
    <SendMessage/>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Message from '@/views/main/Message.vue';
import SendMessage from '@/views/main/SendMessage.vue';
import IMessage from '@/interfaces/Message';

export default defineComponent({
  setup() {
    const store = useStore();
    const aMessages = computed<IMessage[]>(() => store.state.messages);
    return {
      aMessages,
    };
  },
  components: {
    Message,
    SendMessage,
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.messages {
  background: #181818;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  .allMessages {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    overflow-y: auto;
    flex-grow: 1;
  }
}
</style>
