<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {onMounted, ref} from "vue";
import BaseCheckBox from "../components/BaseCheckBox.vue";
import service, {dataGridColumns, dataGridSource, dataSourceDoughnut, usersSources} from "../sources/data.js";
import DataGridComponent from "../components/data-visualization/DataGridComponent.vue";
import DoughnutChartComponent from "../components/data-visualization/DoughnutChartComponent.vue";
import TrendLineComponent from "../components/data-visualization/TrendLineComponent.vue";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

let sourceTrend = ref()
const typeTrend = ['Hourly', 'Day', 'Weak', 'Month']
const typeTrendSelected = ref(typeTrend[1]);
const allTodos = ref([]);
const newTodo = ref({id: 0, description: "", completed: false});
const checkFilter = ref([]);
const checkStatus = ref(false);
const disabledButton = ref(false);
const taskDescription = ref("");

const TODOS_KEY = 'todosList';
const getTodos = () => JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
const saveTodo = () => {
  const allTodos = getTodos();
  if (newTodo.value["description"]) {
    allTodos.push(newTodo.value);
    localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
    disabledButton.value = true;
  }
  loadTodos();
}
const deleteTodo = (id: number) => {
  const allTodos = getTodos();
  const todo = allTodos.find((todo: any) => todo.id === id);
  allTodos.splice(allTodos.indexOf(todo), 1);
  localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
  loadTodos();
}
const loadTodos = () => {
  allTodos.value = getTodos();
}
onMounted(() => {
  loadTodos();
  sourceTrend = service.getUsersInfo(typeTrendSelected.value)
})
const checkTodoExist = (value: string) => {
  const todo = getTodos().find((todo: any) => todo.description === value);
  return !!todo;
}
const onChangeText = (value: string) => {
  if (!checkTodoExist(value)) {
    newTodo.value = {
      id: allTodos.value.length > 0 ? getTodos().reduce((max: any, todo: Todo) => Math.max(todo.id, max), getTodos()[0].id) + 1 : 1,
      description: taskDescription.value,
      completed: false
    }
    disabledButton.value = false;
  } else {
    disabledButton.value = true;
  }
}

const onChangeCompleted = (id: number, completed: boolean) => {
  const allTodos = getTodos();
  const todo = allTodos.find((todo: any) => todo.id === id);
  todo.completed = !completed;
  localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
  loadTodos();
}
const filterTodos = (value: any) => {
  if (value.checked === true) {
    if (value.value === "completed") {
      return allTodos.value = allTodos.value.filter((todo: Todo) => todo.completed);
    } else if (value.value === "notCompleted") {
      return allTodos.value = allTodos.value.filter((todo: Todo) => !todo.completed);
    }
  } else {
    loadTodos();
  }
}
const changeTrend = async (value: string) => {
  typeTrendSelected.value = value;
  sourceTrend = service.getUsersInfo(value)
}
</script>

<template>
  <div class="container mx-auto py-9 px-2 rounded-lg">
    <div class="grid grid-cols-6 gap-16 border-b-4 mb-2 p-4">
      <div class="col-span-2">
      </div>
      <div class="col-span-2">
        <div class="overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 bg-blue-700">
            <div class="text-left">
              <b class="text-white">ToDo List -
                {{ getTodos().filter((todo) => !todo.completed).length }} da completare</b>
            </div>
          </div>
          <div class=" border-4 border-blue-600">
            <div class="py-3 sm:grid sm:gap-4 sm:px-6">
              <b>Descrizione Task</b>
              <base-input placeholder="Inserisci testo.." v-model="taskDescription"
                          @get:content="onChangeText"></base-input>
            </div>
            <div class="px-4 py-3 sm:grid mx-auto">
              <base-button :type="'solid'" :disabled="disabledButton" @send:action="saveTodo()">
                <template #label>
                  <b>Inserisci ToDo</b>
                </template>
              </base-button>
            </div>
            <div class="text-center">
              <div class="py-1 p-8">
                <b class="text-blue-600">Filtra per stato</b>
              </div>
              <div class="py-1">
                <b class="p-3">Completate</b>
                <base-check-box v-model="checkFilter.value" value="completed"
                                @get:content="filterTodos"></base-check-box>
                <b class="p-3">Non completate</b>
                <base-check-box v-model="checkFilter.value" value="notCompleted"
                                @get:content="filterTodos"></base-check-box>
              </div>
            </div>
            <hr>
            <div class="text-center p-3" v-if="allTodos.length>0">
              <p class="underline">Clicca sulla task per eliminarla</p>
            </div>
            <div class="py-2 p-8" v-for="todo in allTodos" :key="todo.id">
              <div
                  class="cursor-pointer p-4 rounded-xl shadow-lg flex items-center space-x-7 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-pink-500 hover:to-yellow-500">
                <div class="grid">
                  <base-check-box @get:content="onChangeCompleted(todo.id,todo.completed)"
                                  v-model="checkStatus.value" :value="todo.completed"></base-check-box>
                </div>
                <b @click="deleteTodo(todo.id)" class="text-white"
                   :class="todo['completed'] ? 'line-through text-white/50' : ''">
                  {{ todo.id + '. ' + todo.description }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
      </div>
    </div>
    <div class="grid grid-cols-6 gap-16 p-4 border-b-4">
      <div class="col-span-3">
        <h1 class="text-xl text-blue-700 font-bold text-center mb-2">Language Table</h1>
        <DataGridComponent :data-source="dataGridSource" :columns="dataGridColumns"/>
      </div>
      <div class="col-span-3">
        <h1 class="text-xl text-blue-700 font-bold text-center mb-2">Doughnut Chart</h1>
        <DoughnutChartComponent :data-source="dataSourceDoughnut" title="New Visitor / Returning Visitor"/>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-16 p-4">
      <div class="col-span-3 text-right">
        <h1 class="text-xl text-blue-700 font-bold text-center mb-2">Users (Trend)</h1>
        <div
            class="inline-flex m-4 rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
          <div class="col-span-1" v-for="type in typeTrend" :key="type">
            <base-button :type="'solid'"
                         :parent-class="(type==typeTrendSelected ? 'bg-gray-500 shadow-gray-500 shadow-xl' : '')"
                         @click="changeTrend(type)">
              <template #label>
                <b>{{ type }}</b>
              </template>
            </base-button>
          </div>
        </div>
        <TrendLineComponent :data-source="sourceTrend" :series-value="usersSources"/>
      </div>
    </div>
  </div>
</template>