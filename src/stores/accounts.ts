import type { AccountTypeDto } from '@/dataTypes/accountTypeDto'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts: AccountTypeDto[] = reactive([])
  function checkAccounts(): void {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    accounts.push(...storedAccounts)
  }
  function addAccount(): void {
    accounts.push({
      id: Date.now(),
      tag: [],
      type: 'LDAP',
      login: '',
      password: '',
    })
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
  function deleteAccount(id: number): void {
    accounts.splice(0, accounts.length, ...accounts.filter(account => account.id !== id));
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  function updateAccountById(id: number, updatedAccount: AccountTypeDto) {
    const index = accounts.findIndex(account => account.id === id);
    if (index !== -1) {
      accounts[index] = updatedAccount;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  };

  return { accounts, addAccount, deleteAccount, updateAccountById, checkAccounts }
})
