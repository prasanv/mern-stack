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

const CreateUser = () => {
  const defaultValues = {
    username: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const addExercises = async (inputData = {}) => {
    const response = await fetch("http://127.0.0.1:8080/users/add", {
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
    console.log(data);
    mutation.mutate(data);
    window.location = "/users";
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
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
