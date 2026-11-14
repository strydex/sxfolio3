import React from "react";

const Input = ({
  children,
  type,
  id,
  value,
  onChange,
  placeholder,
  required,
  isTextarea,
  cols,
  rows,
  name,
}) => {
  const As = isTextarea ? "textarea" : "input";

  return (
    <As
      className="border-none bg-black p-4 font-mono text-lg text-accent caret-primary outline-none"
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      cols={cols}
      rows={rows}
      name={name}
    >
      {children}
    </As>
  );
};

export default Input;
