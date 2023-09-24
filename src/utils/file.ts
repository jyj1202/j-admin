export function getFilenameFromPath(path: string):string {
  return (path.split('/').pop() as string).split('.').slice(0, -1).join()
}
