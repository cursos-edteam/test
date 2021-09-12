interface Storage {
  get: (key: string) => string,
  set: (key: string, value: any) => void,
  delete: () => void
}

export default Storage;
