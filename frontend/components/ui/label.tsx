import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children?: React.ReactNode;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, className = "", ...props }, ref) => {
  return (
    <label ref={ref} {...props} className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
