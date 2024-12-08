/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";
import { AmountInput } from "../../AmountInput";

export interface AmountFormInputProps {
  name: string;
  label: string;
}

export const AmountFormInput: FC<AmountFormInputProps> = ({
  name,
  label,
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="textarea"
      render={({ error }) => (
        <Controller
          control={form.control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
          }) => (
            <AmountInput
              symbol="USD"
              onChange={(value) => {
                onChange({ target: { value } })
              }}
              // onBlur={() => onBlur()}
              value={value}
            />
            // <RichText
            //   hasError={!!error}
            //   onChange={(value) => {
            //     onChange({ target: { value } })
            //   }}
            //   onBlur={() => onBlur()}
            //   initialValue={value}
            // />
          )}
        />
      )}
    />
  );
};
