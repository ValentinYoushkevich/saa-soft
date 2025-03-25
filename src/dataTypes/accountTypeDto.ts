export interface AccountTypeDto {
  id: number,
  tag: { text: string }[],
  type: 'LDAP' | 'LOCAL',
  login: string,
  password: string | null,
}
