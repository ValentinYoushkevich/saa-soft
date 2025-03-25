<template>
  <v-container class="pa-0 DINGO">
    <v-row class="font-weight-bold ma-0">
      <v-col cols="3" class="pl-0">Метки</v-col>
      <v-col cols="2" class="pl-0">Тип записи</v-col>
      <v-col cols="3" class="pl-0">Логин</v-col>
      <v-col cols="3" class="pl-0">Пароль</v-col>
    </v-row>

    <AccountItem v-for="account in accounts" :key="account.id" :account="account" @deleteAccount="deleteAccount" />
  </v-container>
</template>

<script setup lang="ts">

import { useAccountsStore } from '@/stores/accounts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import AccountItem from './AccountItem.vue';

defineOptions({
  name: 'AccountsTable'
});

const store = useAccountsStore();
const { accounts } = storeToRefs(store);

onMounted(() => {
  checkAccounts()
});

const checkAccounts = () => {
  store.checkAccounts();
}
const deleteAccount = (id: number) => {
  store.deleteAccount(id);
}
</script>

<style scoped></style>
