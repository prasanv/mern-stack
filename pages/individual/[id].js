import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Text, Box, Heading, VStack } from "@chakra-ui/react";

const Id = () => {
  const router = useRouter();

  const [id, setId] = useState();

  useEffect(() => {
    setId(router.query.id);
  }, [router.query.id]);

  const fetchExercise = async () => {
    const response = await fetch(`http://localhost:8080/exercises/${id}`);
    const data = await response.json();
    return data;
  };

  const result = useQuery(["Exercise"], fetchExercise, {
    enabled: !!id,
  });

  return (
    <div className={styles.container}>
      {result.isLoading && "Loading..."}
      {result.isSuccess && (
        <VStack spacing={4}>
          <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="5px"
            w="100%"
            p="10px"
          >
            <Heading as="h4" size="md">
              Action:{" "}
            </Heading>
            <Text>
              {result?.data?.username} performed {result?.data?.description}{" "}
              exercise for {result?.data?.duration} minutes.
            </Text>
            <Heading as="h4" size="md" paddingTop="10px">
              Benefits:{" "}
            </Heading>
            <Text>
              Exercise has been shown to improve your mood and decrease feelings
              of depression, anxiety, and stress. It produces changes in the
              parts of the brain that regulate stress and anxiety. It can also
              increase brain sensitivity to the hormones serotonin and
              norepinephrine, which relieve feelings of depression .
              Additionally, exercise can increase the production of endorphins,
              which are known to help produce positive feelings and reduce the
              perception of pain.
            </Text>
          </Box>
        </VStack>
      )}
    </div>
  );
};

export default Id;
