export type ModuleStatus = 'not-started' | 'in-progress' | 'complete' | 'current';

export interface NodePosition {
  x: number;
  y: number;
}

export const COLS = 3;

/**
 * Compute x,y position for node index i using a 3-column boustrophedon (snake) layout.
 * Mobile (<640px): single column at x=50%, 110px row spacing.
 * Desktop: 3 columns at x=20%/50%/80%, 160px row spacing, snake order per row.
 */
export function getNodePosition(i: number, containerWidth: number): NodePosition {
  const isMobile = containerWidth < 640;

  if (isMobile) {
    return {
      x: containerWidth * 0.5,
      y: 70 + i * 110,
    };
  }

  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const effectiveCol = row % 2 === 0 ? col : (COLS - 1 - col);
  const colX = [0.20, 0.50, 0.80];
  return {
    x: containerWidth * colX[effectiveCol],
    y: 90 + row * 160,
  };
}

/**
 * Build a rounded-polyline SVG path through all node centers.
 * Straight segments connect each node, with quadratic bezier arcs
 * at every corner so the path looks like a smooth road, not a maze.
 */
export function buildConnectorPath(positions: NodePosition[]): string {
  const pts = positions;
  const n = pts.length;
  if (n < 2) return '';

  const RADIUS = 50; // corner rounding in px
  const parts: string[] = [`M ${pts[0].x} ${pts[0].y}`];

  for (let i = 1; i < n; i++) {
    if (i === n - 1) {
      // Last node: just draw straight to it
      parts.push(`L ${pts[i].x} ${pts[i].y}`);
    } else {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      // Incoming and outgoing unit vectors
      const dx1 = curr.x - prev.x, dy1 = curr.y - prev.y;
      const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const dx2 = next.x - curr.x, dy2 = next.y - curr.y;
      const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      const r = Math.min(RADIUS, len1 * 0.45, len2 * 0.45);

      // Point just before the corner (on the incoming segment)
      const bx = curr.x - (dx1 / len1) * r;
      const by = curr.y - (dy1 / len1) * r;

      // Point just after the corner (on the outgoing segment)
      const ax = curr.x + (dx2 / len2) * r;
      const ay = curr.y + (dy2 / len2) * r;

      // Straight line to just before corner, then smooth arc around it
      parts.push(`L ${bx.toFixed(1)} ${by.toFixed(1)}`);
      parts.push(`Q ${curr.x} ${curr.y} ${ax.toFixed(1)} ${ay.toFixed(1)}`);
    }
  }

  return parts.join(' ');
}

/**
 * Determine the display status of a module given progress data.
 */
export function getModuleStatus(
  lessonIds: string[],
  completedLessons: string[],
  quizId: string,
  quizResults: Record<string, { score: number; total: number }>,
  lastVisitedLessonId: string | null,
): ModuleStatus {
  if (lessonIds.length === 0) return 'not-started';

  const completedCount = lessonIds.filter((id) => completedLessons.includes(id)).length;

  const qr = quizResults[quizId];
  const quizPassed = qr !== undefined && qr.total > 0 && qr.score / qr.total >= 0.7;
  if (completedCount === lessonIds.length && quizPassed) {
    return 'complete';
  }

  const isLastVisitedInModule =
    lastVisitedLessonId !== null && lessonIds.includes(lastVisitedLessonId);

  if (isLastVisitedInModule) return 'current';
  if (completedCount > 0) return 'in-progress';
  return 'not-started';
}

export interface ColorTokens {
  hex: string;
  bg: string;
  ring: string;
}

const COLOR_MAP: Record<string, ColorTokens> = {
  blue:   { hex: '#3b82f6', bg: 'bg-blue-500/15',   ring: 'ring-blue-500' },
  purple: { hex: '#a855f7', bg: 'bg-purple-500/15', ring: 'ring-purple-500' },
  green:  { hex: '#22c55e', bg: 'bg-green-500/15',  ring: 'ring-green-500' },
  orange: { hex: '#f97316', bg: 'bg-orange-500/15', ring: 'ring-orange-500' },
  red:    { hex: '#ef4444', bg: 'bg-red-500/15',    ring: 'ring-red-500' },
  cyan:   { hex: '#06b6d4', bg: 'bg-cyan-500/15',   ring: 'ring-cyan-500' },
  yellow: { hex: '#eab308', bg: 'bg-yellow-500/15', ring: 'ring-yellow-500' },
  violet: { hex: '#8b5cf6', bg: 'bg-violet-500/15', ring: 'ring-violet-500' },
  rose:   { hex: '#f43f5e', bg: 'bg-rose-500/15',   ring: 'ring-rose-500' },
  indigo: { hex: '#6366f1', bg: 'bg-indigo-500/15', ring: 'ring-indigo-500' },
  teal:   { hex: '#14b8a6', bg: 'bg-teal-500/15',   ring: 'ring-teal-500' },
  pink:   { hex: '#ec4899', bg: 'bg-pink-500/15',   ring: 'ring-pink-500' },
};

const FALLBACK_TOKENS: ColorTokens = { hex: '#6366f1', bg: 'bg-indigo-500/15', ring: 'ring-indigo-500' };

export function moduleColorToTokens(color: string): ColorTokens {
  return COLOR_MAP[color] ?? FALLBACK_TOKENS;
}

export interface LessonDot {
  id: string;
  title: string;
  completed: boolean;
  cx: number;   // circle center x
  cy: number;   // circle center y
  busX: number; // vertical bus x (shared rail)
  labelX: number;
  isLeft: boolean;
}

/**
 * Compute satellite lesson dot positions for a module node.
 * Returns empty array on mobile, when no lessons, or for center column (no room).
 */
export function getLessonDots(
  pos: NodePosition,
  moduleIndex: number,
  lessons: { id: string; title: string; completed: boolean }[],
  containerWidth: number,
): LessonDot[] {
  if (containerWidth < 640 || lessons.length === 0) return [];

  const row = Math.floor(moduleIndex / COLS);
  const col = moduleIndex % COLS;
  const effectiveCol = row % 2 === 0 ? col : (COLS - 1 - col);

  // Center column has no horizontal room for satellite dots
  if (effectiveCol === 1) return [];

  const isLeft = effectiveCol === 0;
  const SPACING = 17;
  const n = lessons.length;

  const busX    = isLeft ? pos.x - 80 : pos.x + 80;
  const circleX = isLeft ? busX - 20  : busX + 20;
  const labelX  = isLeft ? circleX - 6 : circleX + 6;

  const startY = pos.y - ((n - 1) * SPACING) / 2;

  return lessons.map((lesson, j) => ({
    ...lesson,
    cx: circleX,
    cy: startY + j * SPACING,
    busX,
    labelX,
    isLeft,
  }));
}
