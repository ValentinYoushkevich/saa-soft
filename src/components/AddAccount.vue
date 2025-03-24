<template>
  <div class="d-flex align-center">
    <span class="font-weight-bold mr-2">Учетные записи</span>
    <v-btn icon="mdi-plus" @click="createAccount">
      <v-icon icon="mdi-plus" color="black"></v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';

const accountsStore = useAccountsStore();
const createAccount = () => {
  accountsStore.addAccount();
};
</script>

<style lang="scss" scoped></style>
