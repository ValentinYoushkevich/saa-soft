import type { AccountTypeDto } from '@/dataTypes/accountTypeDto'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts: AccountTypeDto[] = reactive([])
  function addAccount(): void {
    accounts.push({
      id: Date.now(),
      tag: '',
      type: 'LDAP',
      login: '',
      password: '',
    })
  }
  function deleteAccount(id: number): void {
    accounts.splice(0, accounts.length, ...accounts.filter(account => account.id !== id));
  }

  return { accounts, addAccount, deleteAccount }
})
