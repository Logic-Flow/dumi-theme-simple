// React 版本兼容性类型修复
declare global {
  namespace React {
    // 确保 ReactNode 包含 bigint 以兼容 React 19
    type ReactNode =
      | React.ReactElement<any, any>
      | string
      | number
      | bigint
      | boolean
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
      | Iterable<React.ReactNode>;

    // 修复 JSX Element 类型
    interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
      type: T;
      props: P;
      key: React.Key | null;
    }
  }
}

export { };
