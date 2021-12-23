import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Box, Heading, VStack } from "@chakra-ui/react";

const User = () => {
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/users/");
    const data = await response.json();
    return data;
  };

  const info = useQuery("UserList", fetchUsers);

  return (
    <div className={styles.container}>
      <div>
        {info?.data?.length === 0 ? (
          <Box
            w="100%"
            p={4}
            border="1px"
            borderColor="gray.300"
            borderRadius="5px"
            textAlign="center"
          >
            <Heading as="h4" size="md">
              Sorry, currently the no exercises in the List
            </Heading>
          </Box>
        ) : (
          info?.isSuccess && (
            <Box>
              <VStack align="stretch">
                {info?.data.map((ind) => (
                  <Box
                    w="50%"
                    bg="yellow.200"
                    p="10px"
                    key={ind._id}
                    borderRadius="5px"
                  >
                    <p>{ind.username}</p>
                  </Box>
                ))}
              </VStack>
            </Box>
          )
        )}
      </div>
    </div>
  );
};

export default User;
