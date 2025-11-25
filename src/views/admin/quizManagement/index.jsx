/*
  Quiz Management view
  - Adds a new admin page that displays a table of quizzes
  - Header matches other tables (title + menu area)
  - Uses placeholder data and icons; update resources later as needed
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Progress,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import ArrowIcon from "assets/img/icons/arrow_down.png";

import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import MCQIcon from "assets/img/icons/Multiple choice.png";
import FillIcon from "assets/img/icons/Fill in the blank.png";
import MatchIcon from "assets/img/icons/Matching headings.png";

const sampleData = [
  { id: 1, name: "1", questions: 5, topics: ["Animals"], types: ["mcq"], avg: 75.5, users: 1500 },
  { id: 2, name: "2", questions: 10, topics: ["Animals"], types: ["mcq"], avg: 35.4, users: 1456 },
  { id: 3, name: "3", questions: 10, topics: ["Animals","Food"], types: ["mcq","write"], avg: 25, users: 1300 },
  { id: 4, name: "4", questions: 10, topics: ["Animals","Food","Travel"], types: ["mcq","write"], avg: 100, users: 1249 },
  { id: 5, name: "5", questions: 10, topics: ["Animals"], types: ["match"], avg: 12.2, users: 980 },
  { id: 6, name: "6", questions: 15, topics: ["Animals","Nature"], types: ["match"], avg: 12.2, users: 710 },
  { id: 7, name: "7", questions: 15, topics: ["Animals"], types: ["match"], avg: 12.2, users: 150 },
  { id: 8, name: "8", questions: 16, topics: ["Animals","Food"], types: ["match","write"], avg: 12.2, users: 80 },
  { id: 9, name: "9", questions: 17, topics: ["Animals","Food"], types: ["match","write"], avg: 12.2, users: 31 },
  { id: 10, name: "10", questions: 20, topics: ["Animals","Food","Sports"], types: ["match","write"], avg: 12.2, users: 10 },
  { id: 11, name: "11", questions: 9999, topics: ["Animals","Food","Sports","Nature"], types: ["match","write"], avg: 12.2, users: 2 },
];

export default function QuizManagement() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [expandedRows, setExpandedRows] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState("desc");
  const navigate = useNavigate();

  function toggleRow(id) {
    setExpandedRows((p) => ({ ...p, [id]: !p[id] }));
  }

  function handleSort(key) {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  }

  function compareRows(a, b, key) {
    if (key === "topics") {
      const la = (a.topics || []).length;
      const lb = (b.topics || []).length;
      if (la !== lb) return la - lb;
      return String((a.topics && a.topics[0]) || "").localeCompare((b.topics && b.topics[0]) || "");
    }
    if (key === "types") {
      const la = (a.types || []).length;
      const lb = (b.types || []).length;
      return la - lb;
    }
    const va = a[key];
    const vb = b[key];
    // If both values are numbers, compare numerically
    if (typeof va === "number" && typeof vb === "number") return va - vb;
    // If both are numeric strings, compare numerically (handles ids like "1", "10", etc.)
    const numA = Number(va);
    const numB = Number(vb);
    if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
    return String(va || "").localeCompare(String(vb || ""));
  }

  const sortedData = React.useMemo(() => {
    if (!sortBy) return sampleData;
    const copy = [...sampleData];
    copy.sort((a, b) => {
      const res = compareRows(a, b, sortBy);
      return sortDir === "asc" ? res : -res;
    });
    return copy;
  }, [sortBy, sortDir]);

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
                <Th borderColor={borderColor} onClick={() => handleSort("name")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">Quiz name</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "name" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor} onClick={() => handleSort("questions")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">Number of question</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "questions" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor} onClick={() => handleSort("topics")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">Topic included</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "topics" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor} onClick={() => handleSort("types")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">Question types</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "types" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor} onClick={() => handleSort("avg")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">Average grade</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "avg" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor} onClick={() => handleSort("users")} cursor="pointer">
                  <Flex align="center" gap="8px">
                    <Text color="gray.400" fontSize="12px">User joined</Text>
                    <Image src={ArrowIcon} alt="sort" boxSize="25px" transform={sortBy === "users" && sortDir === "asc" ? "rotate(180deg)" : "none"} opacity={0.7} />
                  </Flex>
                </Th>
                <Th borderColor={borderColor}><Text color="gray.400" fontSize="12px">Actions</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              
              {sortedData.map((row) => (
                <Tr key={row.id}>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">{row.name}</Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">{row.questions}</Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Flex align="center">
                      {row.topics && row.topics.length > 0 ? (
                        <>
                          {!expandedRows[row.id] ? (
                            <>
                              <Badge
                                colorScheme="purple"
                                px="3"
                                py="1"
                                borderRadius="full"
                                fontSize="12px"
                                cursor="pointer"
                                onClick={() => toggleRow(row.id)}
                              >
                                {row.topics[0]}
                              </Badge>
                              {row.topics.length > 1 && (
                                <Badge
                                  colorScheme="gray"
                                  px="2"
                                  py="1"
                                  borderRadius="full"
                                  fontSize="12px"
                                  ms="8px"
                                >
                                  {row.topics.length}
                                </Badge>
                              )}
                            </>
                          ) : (
                            <Box>
                              <Flex align="center">
                                <Badge
                                  colorScheme="purple"
                                  px="3"
                                  py="1"
                                  borderRadius="full"
                                  fontSize="12px"
                                >
                                  {row.topics[0]}
                                </Badge>
                                <Box cursor="pointer" ms="6px" onClick={() => toggleRow(row.id)}>
                                  <Icon as={MdClose} w={4} h={4} color="gray.500" />
                                </Box>
                              </Flex>
                              <Box mt="8px">
                                {row.topics.slice(1).map((t, i) => (
                                  <Badge
                                    key={t + i}
                                    colorScheme="purple"
                                    px="3"
                                    py="1"
                                    borderRadius="full"
                                    fontSize="12px"
                                    display="inline-block"
                                    mb="6px"
                                  >
                                    {t}
                                  </Badge>
                                ))}
                              </Box>
                            </Box>
                          )}
                        </>
                      ) : (
                        <Text color="gray.400">-</Text>
                      )}
                    </Flex>
                  </Td>
                  <Td fontSize={{ sm: "14px" }} borderColor="transparent">
                    <Flex align="center">
                      {(() => {
                        const icons = [
                          { key: "mcq", src: MCQIcon, alt: "Multiple choice" },
                          { key: "match", src: MatchIcon, alt: "Matching" },
                          { key: "write", src: FillIcon, alt: "Fill in the blank" },
                        ];

                        return icons.map((it) => (
                          <Image
                            key={it.key}
                            src={it.src}
                            alt={it.alt}
                            boxSize="20px"
                            objectFit="contain"
                            mr="10px"
                            opacity={row.types.includes(it.key) ? 1 : 0.18}
                            filter={row.types.includes(it.key) ? "none" : "grayscale(100%)"}
                          />
                        ));
                      })()}
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
                        <Box cursor="pointer" onClick={() => navigate('/admin/quiz-management/edit', { state: { quiz: row } })}>
                          <Icon as={MdEdit} color="blue.400" w={6} h={6} />
                        </Box>
                        <Box cursor="pointer"><Icon as={MdDelete} color="red.400" w={6} h={6} /></Box>
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
