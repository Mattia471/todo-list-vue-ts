<script setup lang="ts">
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {onMounted, reactive} from "vue";
import BaseCheckBox from "../components/BaseCheckBox.vue";

const reactiveData = reactive({
  allTodos: [],
  newTodo: {id: 0, description: "", completed: false},
  checkFilter: [],
  checkStatus: false
})


const TODOS_KEY = 'todosList';
const getTodos = () => JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
const saveTodo = () => {
  const allTodos = getTodos();
  if (reactiveData.newTodo["description"]) {
    allTodos.push(reactiveData.newTodo);
    localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
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
  reactiveData.allTodos = getTodos();
}
onMounted(() => {
  loadTodos();
})
const onChangeText = (value: string) => {
  reactiveData.newTodo = {
    id: getTodos().reduce((max: any, todo: any) => Math.max(todo.id, max), getTodos()[0].id) + 1,
    description: value,
    completed: false
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
  console.log(value)
  if (value.checked === true) {
    if (value.value === "completed") {
      return reactiveData.allTodos = reactiveData.allTodos.filter((todo: any) => todo.completed);
    } else if (value.value === "notCompleted") {
      return reactiveData.allTodos = reactiveData.allTodos.filter((todo: any) => !todo.completed);
    }
  }else{
    loadTodos();
  }
}
</script>

<template>
  <div class="container mx-auto py-9 px-2 w-96 bg-white rounded-lg">
    <div class="overflow-hidden shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 bg-white bg-blue-600">
        <div class="text-left">
          <b class="font-semi-bold text-white">ToDo List -
            {{ getTodos().filter((todo) => !todo.completed).length }} da completare</b>
        </div>
      </div>
      <div class="border-t border-4 border-indigo-600">
        <div class="py-5 sm:grid sm:gap-4 sm:px-6">
          <base-input placeholder="Inserisci testo.." @get:content="onChangeText"></base-input>
        </div>
        <div class="text-center">
          <div class="py-2 p-8">
            <b class="text-blue-600">Filtra per stato</b>
          </div>
          <div class="py-1">
            <b class="p-3">Completate</b>
            <base-check-box v-model="reactiveData.checkFilter" value="completed"
                            @get:content="filterTodos"></base-check-box>
            <b class="p-3">Non completate</b>
            <base-check-box v-model="reactiveData.checkFilter" value="notCompleted"
                            @get:content="filterTodos"></base-check-box>
          </div>
        </div>
        <div class="px-4 py-5 sm:grid sm:gap-4 sm:px-6">
          <base-button :type="'solid'" @send:action="saveTodo()">
            <template #label>
              Inserisci ToDo
            </template>
          </base-button>
        </div>
        <div class="text-center" v-if="reactiveData.allTodos.length>0">
          <p>Clicca sulla task per eliminarla</p>
        </div>
        <div class="py-2 p-8" v-for="todo in reactiveData.allTodos" :key="todo.id">
          <div
              class="cursor-pointer p-4 mx-auto rounded-xl shadow-lg flex items-center space-x-7 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-pink-500 hover:to-yellow-500">
            <div class="grid">
              <base-check-box @get:content="onChangeCompleted(todo.id,todo.completed)"
                              v-model="reactiveData.checkStatus" :value="todo.completed"></base-check-box>
            </div>
            <b @click="deleteTodo(todo.id)" class="text-white"
               :class="todo['completed'] ? 'line-through text-white/50' : ''">
              {{ todo.id + '. ' + todo.description }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>