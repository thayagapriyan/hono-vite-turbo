/**
 * Greet function that returns a friendly greeting message
 * @param name - Optional name to greet. Defaults to "World"
 * @returns A greeting string
 */
export function greet(name?: string): string {
  return `Hello, ${name || 'World'}!`;
}
