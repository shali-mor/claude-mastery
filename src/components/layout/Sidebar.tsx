'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, Terminal, Search, DollarSign,
  Code2, HelpCircle, X, Home, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgress } from '@/store';
import { modules } from '@/data/modules';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { href: '/modules', label: 'Learn', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/commands', label: 'Commands', icon: <Terminal className="h-4 w-4" /> },
  { href: '/calculator', label: 'Cost Calculator', icon: <DollarSign className="h-4 w-4" /> },
  { href: '/playground', label: 'Playground', icon: <Code2 className="h-4 w-4" /> },
];

interface SidebarProps {
  onClose?: () => void;
  mobile?: boolean;
}

export function Sidebar({ onClose, mobile }: SidebarProps) {
  const pathname = usePathname();
  const { completedLessons, quizResults } = useProgress();

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const overallProgress = totalLessons > 0
    ? Math.round((completedLessons.length / totalLessons) * 100)
    : 0;

  return (
    <aside className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">Claude Mastery</span>
        </Link>
        {mobile && (
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Overall progress</span>
          <span className="text-xs font-medium">{overallProgress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {completedLessons.length}/{totalLessons} lessons
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}

        {/* Modules sub-nav */}
        <div className="pt-3">
          <p className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Modules
          </p>
          {modules.map((module) => {
            const lessonIds = module.lessons.map(l => l.id);
            const completed = completedLessons.filter(id => lessonIds.includes(id)).length;
            const progress = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
            const isActive = pathname.includes(module.id);
            const hasQuizResult = !!quizResults[module.quizId];

            return (
              <Link
                key={module.id}
                href={`/modules/${module.id}/${module.lessons[0]?.id}`}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 relative">
                  {progress === 100 ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-current" />
                  ) : progress > 0 ? (
                    <svg viewBox="0 0 20 20" className="w-4 h-4 absolute -inset-0.5">
                      <circle
                        cx="10" cy="10" r="8"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        strokeDasharray={`${progress * 0.503} 50.3`}
                        strokeLinecap="round"
                        transform="rotate(-90 10 10)"
                      />
                    </svg>
                  ) : null}
                </div>
                <span className="truncate flex-1">{module.title}</span>
                {hasQuizResult && <Award className="h-3 w-3 text-yellow-500 flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Claude Mastery v1.0
        </p>
      </div>
    </aside>
  );
}
