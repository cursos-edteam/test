import { App } from 'vue';

export default {
  install(app: App): void {
    const Storage = {
      set(key: string, value: any): void {
        if (window.localStorage) {
          window.localStorage.setItem(`${process.env.VUE_APP_SITENAME}_${key}`, JSON.stringify(value));
        } else {
          console.error('No soporta tu navegador');
        }
      },
      get(key: string): any {
        if (!window.localStorage) return null;
        return JSON.parse(window.localStorage.getItem(`${process.env.VUE_APP_SITENAME}_${key}`));
      },
      delete(key: string): void {
        if (!window.localStorage) console.warn('No se puede eliminar');
        window.localStorage.removeItem(`${process.env.VUE_APP_SITENAME}_${key}`);
      },
    };
    const { config: { globalProperties } } = app;
    globalProperties.$Storage = Storage;
    app.provide('Storage', Storage);
  },
};
