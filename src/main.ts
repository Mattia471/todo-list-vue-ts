import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {DxChart} from "devextreme-vue";
import {DxSeries} from "devextreme-vue/chart";
createApp(App)
    .component('DxChart', DxChart)
    .component('DxSeries', DxSeries)
    .mount('#app')