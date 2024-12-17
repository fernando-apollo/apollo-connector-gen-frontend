import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ButtonGroupProps {
  className?: string;
  children: ReactNode;
}

export function ButtonGroup({ className, children }: ButtonGroupProps) {
  return (
    <div className={clsx('flex gap-2 items-center', className)}>{children}</div>
  );
}
