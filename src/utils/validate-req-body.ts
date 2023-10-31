export function validateReqBody(...data: any[]): boolean {
  const isValid = data.every((d) => {
    return !!d;
  });
  return !!isValid;
}
