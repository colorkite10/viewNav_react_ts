import type { CSSProperties, ReactNode } from "react";

interface NavigationProps {
  children: ReactNode;
  size: string | number;
  level: number;
  strong: boolean;
  underline: boolean;
  color: string;
  style: CSSProperties;
}

const Navigation = ({
  children,
  size = 16,
  level = 1,
  strong,
  underline,
  color,
  ...props
}: Partial<NavigationProps>) => {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;

  if (level < 1 || level > 6) {
    console.warn(
      "Heading only accept `1 | 2 | 3 | 4 | 5 | 6` as `level` value."
    );
    Tag = "h1";
  }

  const fontStyle = {
    fontSize: typeof size === "number" ? `${size}px` : size,
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : undefined,
    color,
  };

  return <Tag style={{ ...props.style, ...fontStyle }}>{children}</Tag>;
};

export default Navigation;
