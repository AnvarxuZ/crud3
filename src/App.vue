<template>
  <div class="card flex gap-4">
    <!-- Inputlar bo'limi -->
    <div class="flex flex-col gap-4">
      <InputText type="text" v-model="name" placeholder="Ismingizni kiriting" />
      <InputText type="email" v-model="email" placeholder="Emailingizni kiriting" />
      <InputText type="number" v-model="age" placeholder="Yoshingizni kiriting" />
      <Button label="Jo'natish" @click="clickSubmit" />
    </div>

    <!-- Jadval bo'limi -->
    <div class="flex-1">
      <DataTable :value="users" class="w-full">
        <template #header>
          <div class="table-tilte">
            <p>users</p>
            <Button icon="pi pi-plus" label="qo'shish" @click="dialog_create_user = true"></Button>
          </div>
        </template>
        <Column field="id" header="ID" />
        <Column field="name" header="Ism" />
        <Column field="email" header="Email" />
        <Column field="age" header="Yosh" />
        <Column header="Amallar">
          <template #body="{ data, index }">
            <Button label="Yangilash" class="p-button-warning" />
            <Button label="O'chirish" class="p-button-danger" @click="users.splice(index, 1)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="dialog_create_user" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Ismingiz</label>
        <InputText v-model="form.name" placeholder="Ismingizni kiriting" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText type="email" v-model="form.email" placeholder="Emailingizni kiriting" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Yoshingizni</label>
        <InputNumber v-model="form.age" :min="1" :max="100" placeholder="Yoshingizni kiriting" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="dialog_create_user = false"></Button>
        <Button type="button" label="Save" @click="addUser()"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
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
const form = ref({});
const editingUser = ref(null); // Hozirgi tahrirlanayotgan foydalanuvchi
const dialog_create_user = ref(false);

// Vuex do'konidan foydalanuvchilarni olish
const users = computed(() => store.state.users);

// Formani yuborish funksiyasi
function clickSubmit() {
  if (name.value === "" || email.value === "" || age.value === null) {
    alert("Barcha inputlarni to'ldiring");
  } else {
    const newUser = {
      id: editingUser.value ? editingUser.value.id : users.value.length + 1,
      name: name.value,
      email: email.value,
      age: age.value,
    };

    if (editingUser.value) {
      store.dispatch("updateUser", newUser);
      editingUser.value = null;
    } else {
      store.dispatch("addUser", newUser);
    }

    name.value = "";
    email.value = "";
    age.value = null;
  }
}

// Foydalanuvchini tahrirlash funksiyasi
function editUser(user) {
  name.value = user.name;
  email.value = user.email;
  age.value = user.age;
  editingUser.value = user;
}

// function removeUser(userId) {
//   store.dispatch("deleteUser", userId);
// }
const removeUser = (userId) => store.dispatch("deleteUser", userId);
const addUser = () => {
  console.log(form.value);
  store.dispatch("addUser", form.value);
  // o'zingiz oxiriga yetib qo'ying

};
</script>

<style scoped>
.card {
  padding: 16px;
  background-color: #dbe2e2;
  border-radius: 8px;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.gap-4 {
  gap: 16px;
}
.flex-1 {
  flex: 1;
}
.w-full {
  width: 100%;
}
.table-tilte {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
