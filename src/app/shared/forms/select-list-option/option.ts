export interface Option {
  value: any,
  label: string
}

export function emptyOption(): Option {
  return {
    value: null,
    label: ''
  };
}