export function getStorage(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}
