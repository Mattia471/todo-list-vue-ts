import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {DxDataGrid} from 'devextreme-vue/data-grid';
import {DxChart} from "devextreme-vue";
import {DxSeries} from "devextreme-vue/chart";

createApp(App)
    .component('DxChart', DxChart)
    .component('DxSeries', DxSeries)
    .component('DxDataGrid', DxDataGrid)
    .mount('#app')