import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {DxDataGrid} from 'devextreme-vue/data-grid';
import {DxChart} from "devextreme-vue";
import {DxSeries} from "devextreme-vue/chart";
import {DxScrolling} from "devextreme-vue/data-grid";
import {DxPaging} from "devextreme-vue/data-grid";
import {DxPager} from "devextreme-vue/data-grid";
import {DxColumn} from "devextreme-vue/gantt";

createApp(App)
    .component('DxChart', DxChart)
    .component('DxSeries', DxSeries)
    .component('DxDataGrid', DxDataGrid)
    .component('DxScrolling', DxScrolling)
    .component('DxPaging', DxPaging)
    .component('DxPager', DxPager)
    .component('DxColumn', DxColumn)
    .mount('#app')