export function getStorage(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}

// base function to get items in storage
