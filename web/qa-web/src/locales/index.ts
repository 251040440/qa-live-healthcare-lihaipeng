import { createI18n } from 'vue-i18n';
import zhCN from './zh-cn.json';
import enUS from './en-us.json';

const messages = {
  'zh-cn': zhCN,
  'en-us': enUS
};

const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn', // 默认语言为中文
  fallbackLocale: 'zh-cn',
  messages
});

export default i18n;