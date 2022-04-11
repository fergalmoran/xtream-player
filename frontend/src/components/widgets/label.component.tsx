import React from "react";
import classNames from "classnames";
import { defaultTheme } from "../../constants";

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  check?: boolean;
  radio?: boolean;
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  props,
  ref
) {
  const { children, check, radio, disabled, className, ...other } = props;
  const { label } = defaultTheme;

  const baseStyle = label.base;
  const checkStyle = label.check;
  const disabledStyle = label.disabled;

  const cls = classNames(
    baseStyle,
    // check and radio are interchangeable
    (check || radio) && checkStyle,
    disabled && disabledStyle,
    className
  );

  return (
    <label className={cls} ref={ref} {...other}>
      {children}
    </label>
  );
});
export default Label;
