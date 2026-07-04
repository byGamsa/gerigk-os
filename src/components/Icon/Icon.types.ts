import type { SVGProps } from 'react';
import type { icons } from './icons';

export type IconSvgProps = SVGProps<SVGSVGElement>;

export type IconComponent = (props: IconSvgProps) => React.JSX.Element;

export type IconName = keyof typeof icons;

export interface IconProps extends IconSvgProps {
  name: IconName;
}
