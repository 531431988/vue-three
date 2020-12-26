import { Button, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)
app.config = {
  productionTip: false,
  globalProperties: {
    $message: message
  }
}
app.use(Button)
app.mount('#app')
