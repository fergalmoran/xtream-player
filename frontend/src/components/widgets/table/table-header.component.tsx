import React from "react";
import classNames from "classnames";
import { defaultTheme } from "../../../constants";

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, Props>(
  function TableHeader(props, ref) {
    const { className, children, ...other } = props;

    const { tableHeader } = defaultTheme;
    const baseStyle = tableHeader.base;

    const cls = classNames(baseStyle, className);

    return (
      <thead className={cls} ref={ref} {...other}>
        {children}
      </thead>
    );
  }
);

export default TableHeader;
