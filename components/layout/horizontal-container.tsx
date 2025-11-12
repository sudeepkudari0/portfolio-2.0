"use client";

import { ReactNode, Children } from "react";

interface HorizontalContainerProps {
  children: ReactNode;
}

export default function HorizontalContainer({
  children,
}: HorizontalContainerProps) {
  const childrenCount = Children.count(children);

  return (
    <div className="horizontal-scroll-wrapper">
      <div
        className="horizontal-scroll-content"
        style={{ width: `${childrenCount * 100}vw` }}
      >
        {children}
      </div>
    </div>
  );
}
