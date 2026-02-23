export type CommandCategory =
  | 'slash-command'
  | 'skill'
  | 'hook'
  | 'gsd-plugin'
  | 'cli-flag'
  | 'keyboard-shortcut';

export interface Command {
  id: string;
  name: string;
  category: CommandCategory;
  summary: string;
  description: string;
  syntax?: string;
  examples: string[];
  relatedCommandIds: string[];
  tags: string[];
}
