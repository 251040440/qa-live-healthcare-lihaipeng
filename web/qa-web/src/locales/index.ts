import { createI18n } from 'vue-i18n';
import zhCN from './zh-cn.json';
import enUS from './en-us.json';

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
};

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages
});

export default i18n;