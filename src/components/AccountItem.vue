<template>
  <v-form ref="formRef" class="w-100" v-model="formValid">
    <v-row class="w-100 ma-0">
      <v-col cols="3" class="pt-0 pl-0">
        <v-text-field variant="outlined" density="compact" v-model="tag" @blur="changeAccount"
          maxlength="10"></v-text-field>
      </v-col>
      <v-col cols="2" class="pt-0 pl-0">
        <v-select v-model="type" density="compact" :items="accountTypes" variant="outlined" item-title="name"
          item-value="id" @update:modelValue="changeAccount"></v-select>
      </v-col>
      <v-col :cols="loginCols" class="pt-0 pl-0">
        <v-text-field variant="outlined" density="compact" v-model="login" :rules="[rules.required, rules.max100]"
          @blur="changeAccount"></v-text-field>
      </v-col>
      <v-col v-if="showPasswordField" cols="3" class="pt-0 pl-0">
        <v-text-field v-model="password" variant="outlined" density="compact"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.max100]"
          :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
          @blur="changeAccount"></v-text-field>
      </v-col>
      <v-btn color="primary" class="ml-2" elevation="2" @click="$emit('deleteAccount', account.id)">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import type { AccountTypeDto } from '@/dataTypes/accountTypeDto';
import { useAccountsStore } from '@/stores/accounts';
import { computed, onMounted, ref } from 'vue';
import type { VForm, VTextField } from 'vuetify/components';

defineOptions({
  name: 'AccountItem'
});

const store = useAccountsStore();

const props = defineProps<{ account: AccountTypeDto }>();
const { account } = props;

const tag = ref('');
const type = ref<"LDAP" | "LOCAL">('LDAP');
const login = ref('');
const password = ref<string | null>('');

const showPasswordField = computed(() => {
  return type.value === 'LOCAL'
});
const loginCols = computed(() => {
  return showPasswordField.value ? 3 : 6
});

onMounted(() => {
  tag.value = Array.isArray(account.tag) ? account.tag.map(item => item.text).join(';') : '';
  type.value = account.type
  login.value = account.login
  password.value = account.password
});

const showPassword = ref(false);
const formValid = ref(false);
const formRef = ref<VForm | null>(null);

type ValidationRule = (v: string) => boolean | string;

const rules: Record<string, ValidationRule> = {
  required: v => !!v || 'Поле обязательно.',
  max100: v => v?.length <= 100 || 'Max 100 characters',
};

const accountTypes = [{
  id: 'LDAP',
  name: 'LDAP'
},
{
  id: 'LOCAL',
  name: 'Локальная'
}]

const changeAccount = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid?.valid) {
    store.updateAccountById(account.id, {
      id: account.id,
      tag: tag.value.split(';').map(item => ({ text: item })),
      type: type.value,
      login: login.value,
      password: type.value === 'LOCAL' ? password.value : null
    });
  }
}
</script>

<style scoped></style>
