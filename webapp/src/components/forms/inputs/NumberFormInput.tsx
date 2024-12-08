import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface NumberFormInputProps {
  name: string;
  label: string;
}

export const NumberFormInput: FC<NumberFormInputProps> = ({ name, label }) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="input"
      render={({ props }) => <input {...props} type="text" />}
    />
  );
};
