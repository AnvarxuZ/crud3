<template>
  <div class="card flex gap-4">
    <div class="flex-1">
      <DataTable :value="users" class="w-full">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <p>Foydalanuvchilar</p>
            <Button icon="pi pi-plus" label="Qo'shish" @click="dialog_create_user = true" />
          </div>
        </template>
        <Column field="id" header="ID" />
        <Column field="name" header="Ism" />
        <Column field="email" header="Email" />
        <Column field="age" header="Yosh" />
        <Column header="Amallar">
          <template #body="{ data, index }">
            <Button label="Yangilash" @click="editUser(data)" />
            <Button label="O'chirish" severity="warn" @click="users.splice(index, 1)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="dialog_create_user" modal header="Ma'lumotlarni kiritish" :style="{ width: '25rem' }">
      <p class="p-text-secondary block mb-5">Ma'lumotlaringizni yangilang.</p>
      <div class="mb-3">
        <label for="username" class="font-semibold">Ismingiz</label>
        <InputText v-model="form.name" class="w-full mt-1" placeholder="Ismingizni kiriting" />
      </div>
      <div class="mb-3">
        <label for="email" class="font-semibold">Email</label>
        <InputText type="email" v-model="form.email" class="w-full mt-1" placeholder="Emailingizni kiriting" />
      </div>
      <div class="mb-3">
        <label for="age" class="font-semibold">Yoshingiz</label>
        <InputNumber v-model="form.age" :min="1" :max="100" class="w-full mt-1" placeholder="Yoshingizni kiriting" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Bekor qilish" severity="secondary" @click="dialog_create_user = false" />
        <Button type="button" label="Saqlash" @click="save()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
// import LoginVue from './components/Login.vue';
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useStore } from "vuex";
import { Dialog, InputNumber } from "primevue";

// Vuex do'konidan foydalanish
const store = useStore();

// Reactive inputlar
const name = ref("");
const email = ref("");
const age = ref(null);
const form = ref({ name: "", email: "", age: null });
const editingUser = ref(null);
const dialog_create_user = ref(false);

// Vuex do'konidan foydalanuvchilarni olish
const users = computed(() => store.state.users);

// Foydalanuvchini tahrirlash funksiyasi
function editUser(user) {
  form.value = { ...user };
  dialog_create_user.value = true;
}

const save = () => {
  if (!form.value.name || !form.value.email || form.value.age === null) {
    alert("Barcha maydonlarni to'ldiring");
    return;
  } else if (form.value.id) {
    store.dispatch("updateUser", form.value);
  } else store.dispatch("addUser", form.value);
  dialog_create_user.value = false;
  form.value = { name: "", email: "", age: null };
};
</script>
