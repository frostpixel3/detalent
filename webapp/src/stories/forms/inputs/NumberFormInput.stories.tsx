/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { NumberFormInput } from "../../../components/forms/inputs/NumberFormInput";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../components/Form";

const meta: Meta<typeof NumberFormInput> = {
  title: 'Forms/Inputs/NumberFormInput',
  component: NumberFormInput,
};

export default meta;

const schema = yup.object().shape({
  email: yup.string().label('Email').email().required(),
}).required();


export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ email: string }>({
      resolver: yupResolver(schema),
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <NumberFormInput
          name="email"
          label="Email"
        />
      </Form>
    );
  },
};