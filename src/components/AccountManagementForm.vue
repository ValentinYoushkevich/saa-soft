<template>
  <v-container>
    <AddAccount />
    <AccountClue />
    <AccountsTable />
  </v-container>
</template>

<script setup lang="ts">
import AccountClue from "@/components/AccountClue.vue";
import AccountsTable from "@/components/AccountsTable.vue";
import AddAccount from "@/components/AddAccount.vue";

defineOptions({
  name: 'AccountManagementForm'
});
</script>

<style lang="scss" scoped></style>
