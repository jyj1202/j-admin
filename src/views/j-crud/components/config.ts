export const defaultConfig: Record<string, any> = {
  /** style */
  size: 'default',
  stripe: false,
  border: true,
  overHidden: false,
  align: 'center',
  /** menu */
  menuWidth: 220,
  editBtn: true,
  editBtnText: 'Edit',
  editBtnIcon: 'Edit',
  delBtn: true,
  delBtnText: 'Delete',
  delBtnIcon: 'Delete',
  /** default column config */
  index: false,
  indexLabel: 'index',
  selection: false,
  pageSizes: [20, 50, 100, 200, 500],
  header: true,
}

export const defaultColumn = [{
  type: 'index',
  label: 'Index',
  width: 70,
}, {
  type: 'selection'
}]
