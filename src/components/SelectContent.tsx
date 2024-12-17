import { CheckIcon } from '@radix-ui/react-icons';
import {
  Item,
  ItemText,
  ItemIndicator,
  Content,
  Viewport,
} from '@radix-ui/react-select';
import type { SelectContentProps } from '@radix-ui/react-select';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, disabled, ...props }, forwardedRef) => {
    return (
      <Item
        className={clsx('SelectItem', className)}
        disabled={disabled}
        {...props}
        ref={forwardedRef}
      >
        <ItemText>{children}</ItemText>
        <ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </ItemIndicator>
      </Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';

type SelectItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface SelectContentPropsWithItems extends SelectContentProps {
  items: SelectItem[];
}

const SelectContent = ({
  className,
  items,
  ...props
}: SelectContentPropsWithItems) => {
  return (
    <Content
      className={twMerge('z-50', className)}
      {...props}
      position="popper"
    >
      <Viewport className="border z-50 shadow-md border-secondary dark:border-secondary-dark w-[15.5rem] mt-1 rounded bg-primary">
        {items.map((item, i) => (
          <SelectItem
            key={i}
            className="py-2 px-4 font-body text-secondary text-base flex items-center justify-between rounded bg-button-secondary dark:bg-button-secondary-dark hover:bg-button-secondaryHover hover:dark:bg-button-secondaryHover-dark"
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </SelectItem>
        ))}
      </Viewport>
    </Content>
  );
};

SelectContent.displayName = 'SelectContent';

export default SelectContent;
