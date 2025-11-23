/*
  Quiz Management view
  - Adds a new admin page that displays a table of quizzes
  - Header matches other tables (title + menu area)
  - Uses placeholder data and icons; update resources later as needed
*/
import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  Progress,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdEdit, MdDelete, MdLibraryBooks } from "react-icons/md";

const sampleData = [
  { id: 1, name: "1", questions: 5, topic: "Animals", types: ["mcq"], avg: 75.5, users: 1500 },
  { id: 2, name: "2", questions: 10, topic: "Animals", types: ["mcq"], avg: 35.4, users: 1456 },
  { id: 3, name: "3", questions: 10, topic: "Animals", types: ["mcq","write"], avg: 25, users: 1300 },
  { id: 4, name: "4", questions: 10, topic: "Animals", types: ["mcq","write"], avg: 100, users: 1249 },
  { id: 5, name: "5", questions: 10, topic: "Animals", types: ["match"], avg: 12.2, users: 980 },
  { id: 6, name: "6", questions: 15, topic: "Animals", types: ["match"], avg: 12.2, users: 710 },
  { id: 7, name: "7", questions: 15, topic: "Animals", types: ["match"], avg: 12.2, users: 150 },
  { id: 8, name: "8", questions: 16, topic: "Animals", types: ["match","write"], avg: 12.2, users: 80 },
  { id: 9, name: "9", questions: 17, topic: "Animals", types: ["match","write"], avg: 12.2, users: 31 },
  { id: 10, name: "10", questions: 20, topic: "Animals", types: ["match","write"], avg: 12.2, users: 10 },
  { id: 11, name: "11", questions: 9999, topic: "Animals", types: ["match","write"], avg: 12.2, users: 2 },
];

export default function QuizManagement() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text color={textColor} fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
            All Quizzes
          </Text>
          <Menu />
        </Flex>

        <Box>
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              <Tr>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Quiz name</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Number of question</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Topic included</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Question types</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Average grade</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">User joined</Text></Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Actions</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {sampleData.map((row) => (
                <Tr key={row.id}>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">{row.name}</Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">{row.questions}</Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Badge colorScheme="purple" px="3" py="1" borderRadius="full">
                      {row.topic}
                    </Badge>
                  </Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Flex align="center">
                      <Avatar size="sm" bg="transparent" icon={<Icon as={MdLibraryBooks} w={4} h={4} color="gray.600" />} />
                    </Flex>
                  </Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Flex align="center">
                      <Text me="12px" fontWeight="700">{row.avg}%</Text>
                      <Box w="120px">
                        <Progress value={row.avg} size="sm" colorScheme={row.avg > 60 ? "green" : row.avg > 30 ? "yellow" : "red"} />
                      </Box>
                    </Flex>
                  </Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">{row.users}</Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Flex gap="8px">
                      <Box cursor="pointer"><Icon as={MdEdit} color="blue.400" /></Box>
                      <Box cursor="pointer"><Icon as={MdDelete} color="red.400" /></Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
