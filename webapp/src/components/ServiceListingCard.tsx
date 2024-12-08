/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useId, useState } from "react";
import { RatingView } from "./RatingView";
import { AccountInfo } from "./AccountInfo";
import { StartQuoteFormValues, User } from "../types";
import { Form } from "./Form";
import { RichTextFormInput } from "./forms/inputs/RichTextFormInput";
import { useForm } from "react-hook-form";
import { TextFormInput } from "./forms/inputs/TextFormInput";
import { useMutation } from "@tanstack/react-query";
import { startQuote } from "../client/mutations/customers";
import { useNavigate } from "react-router-dom";
import { useValidAuth } from "../hooks/useValidAuth";
import { Web3ConnectBox } from "./Web3ConnectBox";
import { useAppKit } from "@reown/appkit/react";
import classNames from "classnames";

export interface ServiceListingCardProps {
  serviceId?: string;
  name: string;
  coverImageUrl: string;
  description?: string;
  rating?: number;
  talent?: User;
  showStartQuote?: boolean;
}

export const ServiceListingCard: FC<ServiceListingCardProps> = ({
  serviceId,
  name,
  coverImageUrl,
  talent,
  description,
  rating,
  showStartQuote,
}) => {
  const id = useId();
  const navigate = useNavigate();
  const quoteForm = useForm<StartQuoteFormValues>();
  const validAuth = useValidAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const startQuoteMutation = useMutation({
    mutationKey: ['startQuote'],
    mutationFn: startQuote,
  })
  const onQuoteFormSubmit = async (data: StartQuoteFormValues) => {
    if (!serviceId) {
      return;
    }
    const project = await startQuoteMutation.mutateAsync({
      ...data,
      serviceId,
    });
    await navigate(`/app/customer/projects/${project.id}`);
  }
  return (
    <div className="bg-base-100 shadow-xl rounded-lg group">
      <div className="w-full h-48 overflow-hidden">
        <div
          className="w-full h-48 bg-no-repeat bg-cover rounded-t-lg transition-all duration-500 ease-in-out transform group-hover:scale-125 overflow-hidden"
          style={{
            backgroundImage: `url(${coverImageUrl})`,
          }}
        />
      </div>
      <div>
        <div className="p-4">
          {rating ? (
            <RatingView rating={rating} />
          ): (
            <div className="text-sm text-gray-400 flex">
              <RatingView rating={0} />
              <span className="ml-1">
                (no reviews yet)
              </span>
            </div>
          )}
          <div className="font-medium mb-2 flex items-center mt-2">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </div>
          </div>
          <div className="text-base-content/75">
            {description}
          </div>
        </div>
        {talent && (
          <div className="border-t">
            <div className="p-4">
              <AccountInfo
                address={talent?.address}
                label={talent.firstName ?? undefined}
                avatarSize={24}
                verified={true}
              />
            </div>
          </div>
        )}
        {showStartQuote && (
          <div>
            <div>
              <button className="btn btn-primary w-full rounded-t btn-outline" onClick={()=> setModalOpen(true)}>
                Start Quote
              </button>
            </div>
          </div>
        )}
        <div className={classNames('modal', { 'modal-open': modalOpen })}>
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>setModalOpen(false)}>
                ✕
            </button>
            {validAuth ? (
              <div>
                <h3 className="font-bold text-lg">Start a Quote</h3>
                <p className="my-4">Service: <strong>{name}</strong></p>
                <Form form={quoteForm} onSubmit={onQuoteFormSubmit}>
                  <TextFormInput label="Project Name" name="name" />
                  <RichTextFormInput label="Please, describe the service you need:" name="description" />
                  <button type="submit" className="btn btn-primary w-full mt-4">Submit</button>
                </Form>
              </div>
            ) : (
              <div className="p-4">
                <Web3ConnectBox />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
