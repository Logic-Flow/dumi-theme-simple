// 修复 React 18+ 类型兼容性问题
import * as React from 'react';

declare module 'react' {
  // 确保 ReactNode 类型兼容性
  type ReactNode = React.ReactElement | string | number | React.ReactFragment | React.ReactPortal | boolean | null | undefined;

  // 修复 JSX 组件类型问题
  namespace JSX {
    interface ElementType extends React.ElementType { }
  }
}

// 修复 dumi Link 组件类型
declare module 'dumi' {
  interface LinkProps {
    to?: string;
    href?: string;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    prefetch?: boolean | "viewport" | "render" | "intent" | "none";
    prefetchTimeout?: number;
  }

  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

  interface FormattedMessageProps {
    id: string;
    values?: Record<string, any>;
    defaultMessage?: string;
  }

  const FormattedMessage: React.ComponentType<FormattedMessageProps>;

  // dumi hooks
  export function useSiteData(): any;
  export function useLocale(): any;
  export function useIntl(): any;
  export function useSidebarData(): any;
  export function useFullSidebarData(): any;
  export function useSiteSearch(): any;
}
