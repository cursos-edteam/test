<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="description">
      <section class="title">Sign in to EDgram</section>
      <section class="subtitle">
        Please confirm your country and <br/>enter your phone number.
      </section>
    </div>
    <div class="container__select">
      <select v-model="country" @change="handleSelect">
        <option value="AR">Argentina</option>
        <option value="BO">Bolivia</option>
        <option value="BR">Brazil</option>
        <option value="CL">Chile</option>
        <option value="CO">Colombia</option>
        <option value="EC">Ecuador</option>
        <option value="PY">Paraguay</option>
        <option value="UY">Uruguay</option>
      </select>
    </div>
    <div class="container__phone">
      <input type="text" class="phoneCode" v-model="phoneCode">
      <input type="text" autofocus class="phone" v-model="phone" @keyup.enter="signWithFirebase">
    </div>
    <div class="container__button">
      <div id="sign-container"></div>
      <button
        id="sign"
        class="next"
        @click="signWithFirebase"
        :class="{
          disabled: !phone || loading,
          enabled: phone
        }"
        :disabled="!phone"
      >INGRESAR</button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted, inject,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { firebase, db } from '../firebase';
import IStorage from '@/interfaces/Storage';

export default defineComponent({
  setup() {
    const country = ref<string>('BO');
    const phoneCode = ref<string>('+ 591');
    const phone = ref<number | string >();
    const loading = ref<boolean>(false);
    const Storage = inject<IStorage>('Storage');
    const router = useRouter();
    const store = useStore();

    const handleSelect = async (): Promise<void> => {
      try {
        const countries = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${country.value}`);
        const [response] = await countries.json();
        phoneCode.value = `+ ${response.callingCodes[0]}`;
        phone.value = '';
      } catch (error) {
        console.error(error.message);
      }
    };

    onMounted(() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-container', {
        size: 'invisible',
        callback: (response): void => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          // console.log('-----MOUNTED---');
          // console.log(response);
          // console.log('--------');
          // onSignSubmit()
        },
      });
    });
    const signWithFirebase = async (): Promise<void> => {
      try {
        loading.value = true;
        const phoneNumber = '+59178802950';
        store.commit('setLoggedPhone', '59178802950');
        Storage.set('loggedPhone', '59178802950');
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        if (confirmationResult) {
          window.confirmationResult = confirmationResult;
          const { verificationId } = confirmationResult;
          Storage.set('verificationId', verificationId);
          const result = await confirmationResult.confirm('852211');
          if (result) {
            loading.value = false;
            const { user: { refreshToken } } = result;
            Storage.set('refreshToken', refreshToken);
            router.push('/');
          } else {
            throw new Error('Ocurrio un error');
          }
        } else {
          throw new Error('Ocurrio un error');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    return {
      country,
      phoneCode,
      loading,
      phone,
      signWithFirebase,
      handleSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
  .login {
    background: #212121;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .container__image {
      padding-bottom: 10px;
      .image {
        background: url('https://cursos-edteam.github.io/test/logoTelegram.png') no-repeat;
        background-position: center;
        background-size: contain;
        height: 150px;
        width: 150px;
      }
    }
    .description {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #FFF;
      .title {
        margin-top: 15px;
        font-size: 1.8rem;
        font-weight: bold;
      }
      .subtitle {
        text-align: center;
        margin-top: 7px;
        font-size: 1.1rem;
        margin-bottom: 10px;
        font-weight: bold;
        color: #666666;
      }
    }
    .container__select {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      select {
        width: 250px;
        padding: 10px;
        outline: none;
        border: none;
        height: 40px;
        border-radius: 7px;
      }
    }
    .container__phone {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      .phoneCode {
        width: 50px;
        padding: 10px;
        padding-right: 0px;
        outline: none;
        border: none;
        height: 20px;
        text-align: right;
        border-radius: 7px 0px 0px 7px;
      }
      .phone {
        width: 175px;
        padding: 10px;
        padding-left: 5px;
        outline: none;
        border: none;
        height: 20px;
        border-radius: 0px 7px 7px 0px;
      }
    }
    .container__button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      .next {
        text-align: center;
        width: 250px;
        padding: 10px;
        border: none;
        background: #2EA6DA;
        color: #FFF;
        outline: none;
        border-radius: 7px;
        cursor: pointer;
      }
      .disabled {
        background: #CDCDCD;
        cursor: auto
      }
    }
  }
</style>
