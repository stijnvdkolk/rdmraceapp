export function codeGenerator() {
  return Buffer.from(`${Math.random()}`).toString('base64').slice(0, 7);
}
