import React from "react";
import classNames from "classnames";
import { defaultTheme } from "../../../constants";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const TableFooter = React.forwardRef<HTMLDivElement, Props>(
  function TableFooter(props, ref) {
    const { className, children, ...other } = props;

    const { tableFooter } = defaultTheme;
    const baseStyle = tableFooter.base;

    const cls = classNames(baseStyle, className);

    return (
      <div className={cls} ref={ref} {...other}>
        {children}
      </div>
    );
  }
);

export default TableFooter;
