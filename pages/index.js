import styles from "../styles/Home.module.css";
import { useQuery, useMutation } from "react-query";
import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const fetchExercisesList = async () => {
    const response = await fetch("http://localhost:8080/exercises/");
    const data = await response.json();
    return data;
  };
  const info = useQuery("ExerciseList", fetchExercisesList);

  const deleteExercises = async (id) => {
    const response = await fetch(`http://127.0.0.1:8080/exercises/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    window.location = "/";
    return data;
  };
  const deleteMutation = useMutation("DeleteExercises", deleteExercises);

  const onClickEditExercise = (data) => {
    router.push({
      pathname: "/edit-exercise",
      query: {
        username: data.username,
        description: data.description,
        duration: data.duration,
        id: data._id,
      },
    });
  };

  const onClickDeleteExercise = (data) => {
    deleteMutation.mutate(data);
  };

  const onClickItem = (data) => {
    console.log(data.username);
    router.push({ pathname: `http://localhost:3000/individual/${data._id}` });
  };

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
            <Box border="1px" borderColor="gray.300" borderRadius="5px">
              <Table variant="striped" colorScheme="red">
                <Thead>
                  <Tr>
                    <Th fontSize={"15px"}>Username</Th>
                    <Th fontSize={"15px"}>Description</Th>
                    <Th fontSize={"15px"}>Duration</Th>
                    <Th fontSize={"15px"}>Edit</Th>
                    <Th fontSize={"15px"}>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {info?.data.map((ind) => (
                    <Tr
                      key={ind._id}
                      onClick={() => onClickItem(ind)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Td>{ind.username}</Td>
                      <Td>{ind.description}</Td>
                      <Td>{ind.duration}</Td>
                      <Td>
                        <EditIcon
                          onClick={() => onClickEditExercise(ind)}
                          w={6}
                          h={6}
                        />
                      </Td>
                      <Td sx={{ cursor: "pointer" }}>
                        <DeleteIcon
                          onClick={() => onClickDeleteExercise(ind._id)}
                          w={6}
                          h={6}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )
        )}
      </div>
    </div>
  );
}
