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

const CreateExercise = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addExercises = async (inputData = {}) => {
    const response = await fetch("http://127.0.0.1:8080/exercises/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  };
  const mutation = useMutation("AddExercise", addExercises);

  const onSubmit = (data) => {
    const newExercise = {
      username: data.username,
      description: data.description,
      duration: parseInt(data.duration),
      date: new Date(),
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

export default CreateExercise;
