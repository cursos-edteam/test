<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>
<script lang="ts">
import {
  defineComponent, watch, inject, onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IStorage from '@/interfaces/Storage';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const Storage = inject<IStorage>('Storage');

    // router.beforeEach((to, from, next) => {
    //   if (to.name !== 'Login' && !Storage.get('refreshToken')) next({ name: 'Login' });
    //   else next();
    // });
    onMounted(() => {
      // if (Storage.get('refreshToken')) {
      //   if (!['/login'].includes(route.path)) router.push(route.path);
      // } else {
      //   router.push('/login');
      // }
    });

    // watch(() => route.path, (path) => {
    //   if (Storage.get('refreshToken')) {
    //     if (!['/login'].includes(path)) router.push(path);
    //   } else {
    //     router.push('/login');
    //   }
    // });
  },
});
</script>
<style lang="scss">
</style>
