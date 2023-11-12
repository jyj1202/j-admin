export function getFilenameFromPath(path: string):string {
  return (path.split('/').pop() as string).split('.').slice(0, -1).join()
}

export function getExt(path: string):string {
  return (path.split('/').pop() as string).split('.').slice(1).join()
}

export function getDir(path: string):string {
  const paths = path.split('/')
  paths.pop()
  return paths.join('/')
}
