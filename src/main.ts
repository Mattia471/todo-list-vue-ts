import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {DxDataGrid, DxPager, DxPaging, DxScrolling} from 'devextreme-vue/data-grid';
import {DxChart, DxPieChart} from "devextreme-vue";
import {DxConnector, DxFormat, DxLabel, DxLegend, DxSeries} from "devextreme-vue/chart";
import {DxColumn} from "devextreme-vue/gantt";
import {DxCommonSeriesSettings} from "devextreme-vue/chart";
import {DxMargin} from "devextreme-vue/chart";
import {DxArgumentAxis} from "devextreme-vue/chart";
import {DxGrid} from "devextreme-vue/chart";
import {DxTitle} from "devextreme-vue/chart";

createApp(App)
    .component('DxChart', DxChart)
    .component('DxSeries', DxSeries)
    .component('DxDataGrid', DxDataGrid)
    .component('DxScrolling', DxScrolling)
    .component('DxPaging', DxPaging)
    .component('DxPager', DxPager)
    .component('DxColumn', DxColumn)
    .component('DxPieChart', DxPieChart)
    .component('DxLegend', DxLegend)
    .component('DxFormat', DxFormat)
    .component('DxLabel', DxLabel)
    .component('DxConnector', DxConnector)
    .component('DxCommonSeriesSettings', DxCommonSeriesSettings)
    .component('DxMargin', DxMargin)
    .component('DxGrid', DxGrid)
    .component('DxTitle', DxTitle)
    .mount('#app')