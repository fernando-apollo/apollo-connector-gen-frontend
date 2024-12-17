import { Root, Content, Portal, Trigger } from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface TooltipProps {
  className?: string;
  asChild?: boolean;
  content: ReactNode;
  children?: ReactNode;
  delayDuration?: number;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  className,
  content,
  children,
  delayDuration,
  side = 'bottom',
}: TooltipProps) {
  return (
    <Root delayDuration={delayDuration}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content
          sideOffset={4}
          className={clsx(
            className,
            'z-30 max-w-md tooltip shadow-popovers rounded py-1 px-2 text-white dark:text-white-dark text-sm font-body bg-black-100 dark:bg-black-100 dark:border-primary',
            {
              'data-[side="bottom"]': side === 'bottom',
            },
          )}
          side={side}
        >
          {content}
        </Content>
      </Portal>
    </Root>
  );
}
