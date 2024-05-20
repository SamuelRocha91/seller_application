export function cepMask(value: string): string {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{3})$/, '$1-$2');
  return value;
}

export function phoneMask(value: string): string {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  return value;
}

export function priceMask(value: string): string {
  if (!value) return '';
  value = value.replace(/\D/gi, '');
  const arrayValue = value.split('');
  if (arrayValue.length <= 2) {
    return value;
  } else {
    const length = arrayValue.length - 2;
    arrayValue.splice(length, 0, '.');
    return arrayValue.join('');
  }
}
