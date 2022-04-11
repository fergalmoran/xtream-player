import React from "react";
import classNames from "classnames";
import { defaultTheme } from "../../../constants";

interface Props extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = React.forwardRef<HTMLTableRowElement, Props>(function TableRow(
  props,
  ref
) {
  const { className, children, ...other } = props;

  const { tableRow } = defaultTheme;
  const baseStyle = tableRow.base;

  const cls = classNames(baseStyle, className);

  return (
    <tr className={cls} ref={ref} {...other}>
      {children}
    </tr>
  );
});

export default TableRow;
