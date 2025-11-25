import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Badge,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  VStack,
  Center,
  Circle,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdArrowBack, MdEdit, MdDelete, MdImage, MdCheckCircle } from "react-icons/md";

import mcqIcon from "assets/img/icons/Multiple choice.png";
import fillIcon from "assets/img/icons/Fill in the blank.png";
import matchIcon from "assets/img/icons/Matching headings.png";

import animalsImg from "assets/img/topic/animals.png";
import colorsImg from "assets/img/topic/colors.png";
import fruitsImg from "assets/img/topic/fruits.png";
import foodImg from "assets/img/topic/food.png";
import emotionImg from "assets/img/topic/emotion.png";
import educationImg from "assets/img/topic/education.png";

export default function EditQuiz() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const quiz = state && state.quiz ? state.quiz : null;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const rowOddBg = useColorModeValue("rgba(99,102,241,0.06)", "rgba(99,102,241,0.06)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);

  // Dummy topics/questions for demo when state not provided
  const topics = (quiz && quiz.topics) || ["Fruits", "Education", "Appearances"];
  const questions = [
    { id: 1, content: "Which picture describe 'pencil case'?", type: "mcq" },
    { id: 2, content: "............................................................", type: "mcq" },
    { id: 3, content: "............................................................", type: "fill" },
    { id: 4, content: "............................................................", type: "fill" },
    { id: 5, content: "Match the heading to the paragraph.", type: "match" },
    { id: 6, content: "Match the heading to the paragraph.", type: "match" },
    { id: 7, content: "............................................................", type: "mcq" },
    { id: 8, content: "............................................................", type: "match" },
  ];

  function handleEditQuestion(q) {
    setSelectedQuestion(q);
    if (q && q.type === "mcq") {
      onOpen();
    } else {
      // For now open modal for non-mcq as well (or implement other editors later)
      onOpen();
    }
  }

  function handleDeleteQuestion(q) {
    // placeholder: implement delete flow later
    // eslint-disable-next-line no-alert
    alert(`Delete question ${q.id} (not implemented)`);
  }

  function getTopicImage(name) {
    if (!name) return animalsImg;
    const key = name.toLowerCase();
    if (key.includes("fruit") || key.includes("fruits")) return fruitsImg;
    if (key.includes("education") || key.includes("information") || key.includes("technology")) return educationImg;
    if (key.includes("appear") || key.includes("face") || key.includes("appearance")) return animalsImg;
    if (key.includes("personality") || key.includes("personalit") || key.includes("person")) return emotionImg;
    if (key.includes("food")) return foodImg;
    if (key.includes("color") || key.includes("colour")) return colorsImg;
    if (key.includes("animal") || key.includes("animals")) return animalsImg;
    return animalsImg;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Flex align="center" gap="12px">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              leftIcon={<MdArrowBack />}
            >
              Back
            </Button>
            <Text color={textColor} fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
              Edit Quiz {quiz ? `#${quiz.name}` : ""}
            </Text>
          </Flex>
          <Menu />
        </Flex>

        <Box px="25px" pb="20px">
          <Text fontSize="20px" fontWeight="700" mb="12px">Topic included</Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 10 }} mb="24px">
            {topics.map((t, i) => (
              <Box
                key={t + i}
                bg="white"
                boxShadow="lg"
                borderRadius="12px"
                p={{ base: 4, md: 6 }}
                position="relative"
              >
                <Badge
                  position="absolute"
                  top="10px"
                  left="12px"
                  colorScheme={i % 3 === 0 ? "green" : i % 3 === 1 ? "orange" : "red"}
                  variant="subtle"
                  fontSize="10px"
                  px="2"
                >
                  {i % 3 === 0 ? "Easy" : i % 3 === 1 ? "Medium" : "Hard"}
                </Badge>

                <Flex align="center" gap="12px">
                  <Image src={getTopicImage(t)} boxSize={{ base: "56px", md: "64px" }} borderRadius="8px" objectFit="cover" />
                  <Box ml={{ base: 0, md: 2 }}>
                    <Text fontWeight={700} mt="6px">{t}</Text>
                    <Text color="blue.500" mt="6px">{(i + 1) * 10} words</Text>
                  </Box>
                </Flex>
              </Box>
            ))}

            <Flex align="center" justify="center">
              <Button
                borderRadius="full"
                boxSize={{ base: "44px", md: "56px" }}
                bg="white"
                color="purple.600"
                boxShadow="lg"
              >
                +
              </Button>
            </Flex>
          </SimpleGrid>

          <Text fontSize="18px" fontWeight="700" mb="12px">Total questions: {questions.length}</Text>
          <Table variant="simple" color="gray.700" mb="24px">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Content</Th>
                <Th>Question types</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {questions.map((q, idx) => {
                const getTypeIcon = (t) => (t === "mcq" ? mcqIcon : t === "fill" ? fillIcon : matchIcon);
                const typeLabel = q.type === "mcq" ? "Multiple choice" : q.type === "fill" ? "Fill in the gap" : "Matching headings";
                return (
                  <Tr key={q.id} bg={idx % 2 === 0 ? rowOddBg : "transparent"}>
                    <Td w="60px">{idx + 1}</Td>
                    <Td>{q.content}</Td>
                    <Td>
                      <Flex align="center" gap="10px">
                        <Image src={getTypeIcon(q.type)} boxSize="18px" alt={q.type} />
                        <Text fontWeight={600}>{typeLabel}</Text>
                      </Flex>
                    </Td>
                        <Td textAlign="right">
                          <Flex gap="12px" justify="flex-end" align="center">
                            <IconButton
                              aria-label={`Edit question ${q.id}`}
                              icon={<MdEdit />}
                              variant="ghost"
                              color="blue.400"
                              fontSize="20px"
                              onClick={() => handleEditQuestion(q)}
                            />
                            <IconButton
                              aria-label={`Delete question ${q.id}`}
                              icon={<MdDelete />}
                              variant="ghost"
                              color="red.400"
                              fontSize="20px"
                              onClick={() => handleDeleteQuestion(q)}
                            />
                          </Flex>
                        </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>

          <Flex justify="center" mb="20px">
            <Button
              borderRadius="12px"
              px="28px"
              py="12px"
              bg="white"
              color="purple.600"
              boxShadow="lg"
            >
              + New
            </Button>
          </Flex>

          {/* Edit MCQ Modal */}
          <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedQuestion(null); }} size="6xl" isCentered>
            <ModalOverlay />
            <ModalContent maxW="92vw" minH="80vh" borderRadius="16px">
              <ModalHeader px={6} pt={6}>
                <Text fontWeight={700} color="purple.700">{selectedQuestion ? `Question ${selectedQuestion.id} – Multiple choice` : "Question – Multiple choice"}</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedQuestion && selectedQuestion.type === "match" ? (
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
                      {["Prompt 1", "Prompt 2", "Prompt 3", "Prompt 4"].map((p, i) => {
                        const colors = ["blue.600", "teal.500", "yellow.400", "pink.500"];
                        return (
                          <Box key={p} bg={colors[i]} color="white" borderRadius="12px" p={6} position="relative" boxShadow="sm" minH={{ base: "160px", md: "200px" }}>
                            <Flex justify="space-between" position="absolute" top="10px" left="10px" right="10px">
                              <Flex gap="8px">
                                <IconButton aria-label="Delete prompt" icon={<MdDelete />} size="sm" variant="ghost" color="white" />
                                <IconButton aria-label="Add image to prompt" icon={<MdImage />} size="sm" variant="ghost" color="white" />
                              </Flex>
                            </Flex>
                            <Center h="100%">
                              <Text textAlign="center" fontSize={{ base: "16px", md: "18px" }}>{"Type prompt here"}</Text>
                            </Center>
                          </Box>
                        );
                      })}
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
                      {["Response 1", "Response 2", "Response 3", "Response 4"].map((r, i) => {
                        const colors = ["blue.300", "teal.200", "yellow.200", "pink.200"];
                        return (
                          <Box key={r} bg={colors[i]} color="white" borderRadius="12px" p={6} position="relative" boxShadow="sm" minH={{ base: "160px", md: "200px" }}>
                            <Flex justify="space-between" position="absolute" top="10px" left="10px" right="10px">
                              <Flex gap="8px">
                                <IconButton aria-label="Delete response" icon={<MdDelete />} size="sm" variant="ghost" color="white" />
                                <IconButton aria-label="Add image to response" icon={<MdImage />} size="sm" variant="ghost" color="white" />
                              </Flex>
                            </Flex>
                            <Center h="100%">
                              <Text textAlign="center" fontSize={{ base: "16px", md: "18px" }}>{"Type response here"}</Text>
                            </Center>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </VStack>
                ) : (
                  <VStack spacing={6} align="stretch">
                    <Box
                      bg="purple.100"
                      borderRadius="12px"
                      p={8}
                      boxShadow="sm"
                      minH={{ base: "140px", md: "180px" }}
                      position="relative"
                    >
                      <Circle size="40px" bg="purple.300" position="absolute" top="14px" left="14px">
                        <MdImage color="white" />
                      </Circle>
                      <Center h="100%">
                        <Text fontSize={{ base: "20px", md: "28px" }} fontWeight={700} color="purple.700">Type your question here...</Text>
                      </Center>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
                      {["#1", "#2", "#3", "#4"].map((opt, i) => {
                        const colors = ["blue.600", "teal.500", "yellow.400", "pink.500"];
                        return (
                          <Box key={opt} bg={colors[i]} color="white" borderRadius="12px" p={6} position="relative" boxShadow="sm" minH={{ base: "160px", md: "200px" }}>
                            <Flex justify="space-between" position="absolute" top="10px" left="10px" right="10px">
                              <Flex gap="8px">
                                <IconButton aria-label="Delete option" icon={<MdDelete />} size="sm" variant="ghost" color="white" />
                                <IconButton aria-label="Add image" icon={<MdImage />} size="sm" variant="ghost" color="white" />
                              </Flex>
                              <Icon as={MdCheckCircle} color={i === 3 ? "green.300" : "rgba(255,255,255,0.8)"} boxSize={6} />
                            </Flex>

                            <Center h="100%">
                              <Text textAlign="center" fontSize={{ base: "16px", md: "18px" }}>Type answer option here</Text>
                            </Center>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </VStack>
                )}
              </ModalBody>

              <ModalFooter justifyContent="flex-end" px={6} pb={6}>
                <Button colorScheme="purple" bg="purple.600" color="white" _hover={{ bg: "purple.700" }} px={8} py={4} borderRadius="12px">
                  <Text fontWeight={700}>SAVE</Text>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Card>
    </Box>
  );
}
