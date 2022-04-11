import React from "react";
import classNames from "classnames";
import { defaultTheme } from "../../constants";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "regular" | "small";
  alt?: string;
  src: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  props,
  ref
) {
  const { size = "regular", src, alt, className, ...other } = props;
  const { avatar } = defaultTheme;

  const baseStyle = avatar.base;
  const sizeStyles = {
    large: avatar.size.large,
    regular: avatar.size.regular,
    small: avatar.size.small,
  };

  const cls = classNames(baseStyle, sizeStyles[size], className);

  return (
    <div className={cls} ref={ref} {...other}>
      <img
        className="object-cover w-full h-full rounded-full"
        src={src}
        alt={alt}
        loading="lazy"
      />
      <div
        className="absolute inset-0 rounded-full shadow-inner"
        aria-hidden="true"
      ></div>
    </div>
  );
});

export default Avatar;
