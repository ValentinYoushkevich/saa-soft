export interface AccountTypeDto {
  id: number,
  tag: string,
  type: 'LDAP' | 'LOCAL',
  login: string,
  password: string,
}
