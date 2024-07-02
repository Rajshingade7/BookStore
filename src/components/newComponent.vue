<template>
    <div>
        <h1>New Component</h1>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="age" label="Age"></v-text-field>
        <div>{{this.name}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
type first={
    name:string,
    age:number
}
export default defineComponent({
    name: 'NewComponent',
    data() {
        return {
            name: '',
            age: 0
        }
    },
    methods: {
        handleSubmit() {
            console.log(this.name);
        }
    }
})
console.log(name);
</script>