export function terraAddress(input: string): string {
  return `terra1...${input.slice(-6)}`;
}
