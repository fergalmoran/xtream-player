import React, { useContext } from "react";
import classNames from "classnames";
import { defaultTheme } from "../../constants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: "success" | "danger" | "warning" | "neutral" | "primary";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  props,
  ref
) {
  const { className, children, type = "primary", ...other } = props;

  const { badge } = defaultTheme;
  const baseStyle = badge.base;
  const typeStyle = {
    success: badge.success,
    danger: badge.danger,
    warning: badge.warning,
    neutral: badge.neutral,
    primary: badge.primary,
  };

  const cls = classNames(baseStyle, typeStyle[type], className);

  return (
    <span className={cls} ref={ref} {...other}>
      {children}
    </span>
  );
});

export default Badge;
