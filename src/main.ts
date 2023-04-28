import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {
    DxColumn,
    DxDataGrid,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel
} from 'devextreme-vue/data-grid';
import {DxChart} from "devextreme-vue";
import {DxSeries} from "devextreme-vue/chart";

createApp(App)
    .component('DxChart', DxChart)
    .component('DxSeries', DxSeries)
    .component('DxDataGrid', DxDataGrid)
    .component('DxColumn', DxColumn)
    .component('DxGrouping', DxGrouping)
    .component('DxGroupPanel', DxGroupPanel)
    .component('DxPager', DxPager)
    .component('DxPaging', DxPaging)
    .component('DxSearchPanel', DxSearchPanel)
    .mount('#app')