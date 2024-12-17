import IconDoubleChevronDown from '@apollo/icons/default/IconDoubleChevronDown.svg?react';
import IconDoubleChevronLeft from '@apollo/icons/default/IconDoubleChevronLeft.svg?react';
import IconDoubleChevronRight from '@apollo/icons/default/IconDoubleChevronRight.svg?react';
import IconDoubleChevronUp from '@apollo/icons/default/IconDoubleChevronUp.svg?react';
import IconInfo from '@apollo/icons/default/IconInfo.svg?react';
import { Button } from '@components/Button';
import { Tooltip } from '@components/Tooltip';
import clsx from 'clsx';
import React from 'react';

export const Panel = ({
  classNames,
  children,
  title,
  actions,
  description,
  overrideCollapseIcon,
  collapsible,
  collapseDirection,
  isCollapsed,
  setIsCollapsed,
}: {
  classNames?: string;
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  collapsible?: boolean;
  overrideCollapseIcon?:
    | React.ReactElement<
        {
          'aria-hidden': boolean;
          className?: string;
        },
        string
      >
    | undefined;
  collapseDirection?: 'vertical' | 'horizontal';
  isCollapsed?: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
}) => {
  return (
    <div
      className={clsx(
        'pt-3 px-4 flex flex-col gap-3 text-primary size-full',
        classNames,
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={clsx(
            collapsible &&
              isCollapsed &&
              collapseDirection === 'horizontal' &&
              'hidden',
            'flex flex-row items-center gap-1',
          )}
        >
          <h2 className="text-heading font-heading font-medium text-base">
            {title}
          </h2>
          {description && (
            <Tooltip content={description}>
              <span>
                <IconInfo className="size-3 m-1.5 text-icon-primary" />
              </span>
            </Tooltip>
          )}
        </div>
        {(collapsible || actions) && (
          <div className="flex items-center gap-2">
            {collapsible && (
              <Button
                variant="hidden"
                size="sm"
                onClick={() => setIsCollapsed?.(!isCollapsed)}
                icon={
                  collapseDirection === 'horizontal' ? (
                    isCollapsed ? (
                      overrideCollapseIcon ? (
                        overrideCollapseIcon
                      ) : (
                        <IconDoubleChevronLeft />
                      )
                    ) : (
                      <IconDoubleChevronRight />
                    )
                  ) : isCollapsed ? (
                    overrideCollapseIcon ? (
                      overrideCollapseIcon
                    ) : (
                      <IconDoubleChevronUp />
                    )
                  ) : (
                    <IconDoubleChevronDown />
                  )
                }
              />
            )}
            {actions}
          </div>
        )}
      </div>
      {!collapsible || !isCollapsed ? children : null}
    </div>
  );
};
