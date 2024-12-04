import React, { FC } from "react";
import { Form, FormProps } from "../Form";
import { TextFormInput } from "./inputs/TextFormInput";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { RichTextFormInput } from "./inputs/RichTextFormInput";

export interface CreateServiceFormValues {
  name: string;
  coverImage: string;
  description: string;
}

export interface CreateServiceFormProps
  extends Omit<FormProps<CreateServiceFormValues>, "children"> {
  footer?: React.ReactNode;
}

export const CreateServiceForm: FC<CreateServiceFormProps> = ({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        Submit
      </button>
    </div>
  ),
}) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextFormInput name="name" label="Name" />
      <ImageUploaderFormInput
        name="coverImage"
        label="Cover Image"
        previewWidth={240}
        previewHeight={240}
      />
      <RichTextFormInput name="description" label="Description" />
      {footer}
    </Form>
  );
};