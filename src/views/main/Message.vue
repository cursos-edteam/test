<template>
  <div class="message" v-if="objMessage.userUid === loggedPhone">
    {{ objMessage.text }}
  </div>
  <div class="e-message" v-else>
    {{ objMessage.text }}
  </div>
</template>
<script lang="ts">
import {
  defineComponent, PropType, toRefs, inject,
} from 'vue';
import IMessage from '@/interfaces/Message';
import IStorage from '@/interfaces/Storage';

export default defineComponent({
  props: {
    objMessage: {
      type: Object as PropType<IMessage>,
      required: true,
    },
  },
  setup(props) {
    const Storage = inject<IStorage>('Storage');
    const loggedPhone = Storage.get('loggedPhone');
    return {
      ...toRefs(props),
      loggedPhone,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.message {
  margin: 5px 7px;
  padding: 7px 10px;
  background: $primary;
  border-radius: 7px;
}
</style>
