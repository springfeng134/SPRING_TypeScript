import store from '@/store'

export const permissionMixins = {
  computed: {
    noPermission() {
      return store.state.user.roleType < 3
    },
    auditPermission() {
      return store.state.user.roleType === 4
    },
    branchPermission() {
      return store.state.user.roleType === 3
    }
  }
}
