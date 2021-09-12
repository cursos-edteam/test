<template>
  <div class="sendMessage">
    <!-- <input type="text" v-mo del="text" @keydown.enter="sendMessage"/> -->
    <discord-picker
      input
      :value="text"
      gif-format="md"
      @update:value="text = $event"
      @emoji="setEmoji"
      @gif="setGif"
      @keypress.enter="sendMessage"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import DiscordPicker from 'vue3-discordpicker';
import { firebase, db } from '@/firebase';

export default defineComponent({
  components: {
    DiscordPicker,
  },
  setup() {
    const cMessage = db.collection('messages');
    const text = ref<any>('');
    const store = useStore();
    const cMessages = db.collection('messages').orderBy('date');
    cMessages.onSnapshot((snapShot) => {
      snapShot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          store.dispatch('getMessages');
        }
      });
    });
    const setEmoji = (emoji) => {
      console.log(emoji);
    };
    const setGif = (gif) => {
      console.log(gif);
    };
    const sendMessage = async (): Promise<void> => {
      try {
        const sms = text.value;
        text.value = '';
        await cMessage.add({
          userUid: store.state.userUid,
          type: 'text',
          text: sms,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    return {
      sendMessage,
      text,
      setEmoji,
      setGif,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.sendMessage {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  input[type="text"] {
    background: $backgroundColor;
    margin-top: 15px;
    margin-bottom: 10px;
    border-radius: 7px;
    border: none;
    outline: none;
    padding: 20px;
    color: $fontColor;
    width: 94%;
  }
}
</style>
