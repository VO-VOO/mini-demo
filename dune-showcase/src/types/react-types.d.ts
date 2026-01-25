/// <reference types="react" />
/// <reference types="react-dom" />

import type * as React from "react";

// NOTE: 作为 LSP 兜底，确保 JSX 命名空间可用。
declare global {
  namespace JSX {
    type Element = React.ReactElement;

    interface IntrinsicElements {
      [elementName: string]: React.ReactNode;
    }
  }
}

export {};
