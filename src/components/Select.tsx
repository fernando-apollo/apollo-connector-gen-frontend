import IconChevronDown from '@apollo/icons/default/IconChevronDown.svg?react';
import IconListBullet from '@apollo/icons/default/IconListBullet.svg?react';
import { Root, Trigger, Value, Icon, Portal } from '@radix-ui/react-select';
import type { SelectProps, SelectValueProps } from '@radix-ui/react-select';

import SelectContent from './SelectContent';

interface SelectWithGroupsProps extends SelectProps {
  items: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  container?: HTMLElement;
}

type MergedSelectProps = SelectValueProps & SelectWithGroupsProps;

export function Select({ items, container, ...props }: MergedSelectProps) {
  return (
    <Root {...props}>
      <Trigger className="py-1.5 px-3 rounded text-sm has-[>svg:only-child]:p-2 font-body flex items-center gap-2 text-primary dark:text-primary-dark border bg-button-secondary dark:bg-button-secondary-dark border-primary dark:border-primary-dark hover:bg-button-secondaryHover hover:dark:bg-button-secondaryHover-dark active:bg-button-secondarySelected active:dark:bg-button-secondarySelected-dark">
        <Icon>
          <IconListBullet className="size-4" />
        </Icon>
        Example:
        <Value placeholder={props.placeholder} />
        <Icon className="SelectIcon">
          <IconChevronDown className="size-4" />
        </Icon>
      </Trigger>
      <Portal container={container}>
        {/* Pass the 'groups' prop down to SelectContent */}
        <SelectContent items={items} />
      </Portal>
    </Root>
  );
}
