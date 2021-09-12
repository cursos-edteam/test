<template>
  <div>Practicando con {{ nombre }}</div>
  <div>Practicando con {{ usuario }}</div>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, inject,
} from 'vue';
import { Persona } from '../interfaces/Persona';
import IStorage from '../interfaces/Storage';

export default defineComponent({
  name: 'Practicando',
  setup() {
    const Storage = inject<IStorage>('Storage');
    console.log(Storage);
    const usuario = reactive<Persona>({
      idUser: '',
      nombre: '',
      apellido: '',
      genero: '',
    });
    // console.log(usuario);
    setTimeout(() => {
      usuario.nombre = 'asdasd';
    }, 5000);

    const nombre = ref<string>('');
    // console.log(nombre);

    nombre.value = 'Adry';

    return {
      nombre,
      usuario,
    };
  },
});
</script>
