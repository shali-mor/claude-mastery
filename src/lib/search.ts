import type { Command, CommandCategory } from '@/types/command';

export function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function scoreCommand(cmd: Command, query: string): number {
  if (!query) return 1;
  const q = query.toLowerCase();
  const name = cmd.name.toLowerCase();
  const summary = cmd.summary.toLowerCase();

  // Exact name match
  if (name === q) return 100;
  // Name starts with query
  if (name.startsWith(q)) return 80;
  // Name contains query
  if (name.includes(q)) return 60;
  // Summary contains query
  if (summary.includes(q)) return 40;
  // Tags contain query
  if (cmd.tags.some(t => t.toLowerCase().includes(q))) return 30;
  // Fuzzy match on name
  if (fuzzyMatch(name, q)) return 20;
  // Fuzzy match on summary
  if (fuzzyMatch(summary, q)) return 10;
  return 0;
}

export function searchCommands(
  commands: Command[],
  query: string,
  categories: CommandCategory[]
): Command[] {
  let results = commands;

  if (categories.length > 0) {
    results = results.filter(c => categories.includes(c.category));
  }

  if (query.trim()) {
    results = results
      .map(c => ({ cmd: c, score: scoreCommand(c, query.trim()) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ cmd }) => cmd);
  }

  return results;
}
