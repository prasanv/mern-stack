import React from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const EditExercise = () => {
  const router = useRouter();

  const defaultValues = {
    username: router.query.username,
    description: router.query.description,
    duration: router.query.duration,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const editExercises = async (inputData = {}) => {
    const response = await fetch(
      `http://127.0.0.1:8080/exercises/update/${router.query.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      }
    );
    const data = await response.json();
    return data;
  };
  const mutation = useMutation("EditExercise", editExercises);

  const onSubmit = (data) => {
    const newExercise = {
      username: data.username,
      description: data.description,
      duration: parseInt(data.duration),
    };
    mutation.mutate(newExercise);
    window.location = "/";
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            key="username"
            id="username"
            name="username"
            type="input"
            placeholder="username"
            {...register("username", {
              required: "This field is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            key="description"
            id="description1"
            name="description"
            type="input"
            placeholder="description"
            {...register("description", {
              required: "This field is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.duration}>
          <FormLabel htmlFor="duration">Duration</FormLabel>
          <Input
            key="duration"
            id="duration"
            name="duration"
            type="number"
            placeholder="duration"
            {...register("duration", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>
            {errors.duration && errors.duration.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditExercise;
