<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {onMounted, ref} from "vue";
import BaseCheckBox from "../components/BaseCheckBox.vue";
import BarChartComponent from "../components/data-visualization/BarChartComponent.vue";
import {dataChartSource} from "../sources/data.js";
interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

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
</script>

<template>
  <div class="container mx-auto py-9 px-2 rounded-lg">
    <div class="grid grid-cols-6 gap-16">
      <div class="col-span-2">
        <h1 class="text-xl text-blue-700 font-bold text-center">Data Grid</h1>
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
        <h1 class="text-xl text-blue-700 font-bold text-center">Chart</h1>
        <BarChartComponent :data-source="dataChartSource"></BarChartComponent>
      </div>
    </div>
  </div>
</template>