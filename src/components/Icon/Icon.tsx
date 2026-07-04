import { icons } from './icons';
import type { IconProps } from './Icon.types';

export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden focusable="false" {...props} />;
}
