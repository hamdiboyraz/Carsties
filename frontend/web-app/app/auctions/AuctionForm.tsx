"use client";
import { Button, TextInput } from "flowbite-react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";

export default function AuctionForm() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm();

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      {/* <div className="mb-3 block">
        <TextInput
          {...register("make", { required: "Make is required" })}
          placeholder="Make"
          color={errors.make && "failure"}
          helperText={errors.make?.message as string}
        />
      </div>
      <div className="mb-3 block">
        <TextInput
          {...register("model", { required: "Model is required" })}
          placeholder="Model"
          color={errors.model && "failure"}
          helperText={errors.model?.message as string}
        />
      </div> */}
      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          type="submit"
          outline
          color="success"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
