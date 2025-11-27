import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  HStack,
  Stack,
  SimpleGrid,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Center,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { MdRefresh, MdDelete, MdAdd } from 'react-icons/md';

const tags = [
  'Antonyms',
  'Example',
  'Words',
  'POS',
  'Definition',
  'Topics',
  'Pronunciation',
  'Word_Families',
  'Synonyms_Groups',
  'Word_Family_Mapping',
  'Word_Synonym_Mapping',
  'Word_Topic_Mapping',
];

const initialPairs = [
  [1, 6],
  [2, 7],
  [3, 8],
  [4, 9],
  [5, 10],
  [6, 11],
];
const initialExamples = [
  { vocab: 'apple', example: 'I ate an apple.' },
  { vocab: 'book', example: 'She opened the book.' },
  { vocab: 'run', example: 'He likes to run every morning.' },
];
const initialWords = ['apple', 'book', 'run'];
const initialPOS = ['Noun', 'Verb', 'Adjective'];
const initialDefinitions = [
  { word: 'apple', definition: 'A round fruit with red or green skin.' },
  { word: 'run', definition: 'To move swiftly on foot.' },
];
const initialTopics = ['Food', 'Sports', 'Education'];
const initialPronunciations = [
  { word: 'apple', pron: "ˈæpəl" },
  { word: 'run', pron: "rʌn" },
];
const initialWordFamilies = [
  { family: 'run', members: 'ran, running' },
  { family: 'book', members: 'bookshelf, booking' },
];
const initialSynonymGroups = [
  { group: 'happy', words: 'glad, joyful' },
  { group: 'fast', words: 'quick, speedy' },
];
const initialWordFamilyMapping = [ { a: 'run', b: 'run_family' } ];
const initialWordSynonymMapping = [ { a: 'happy', b: 'glad' } ];
const initialWordTopicMapping = [ { a: 'apple', b: 'Food' } ];

export default function DataManagerment() {
  const [pairs, setPairs] = useState(initialPairs);
  const [examples, setExamples] = useState(initialExamples);
  const [words, setWords] = useState(initialWords);
  const [posList, setPosList] = useState(initialPOS);
  const [definitions, setDefinitions] = useState(initialDefinitions);
  const [topics, setTopics] = useState(initialTopics);
  const [pronunciations, setPronunciations] = useState(initialPronunciations);
  const [wordFamilies, setWordFamilies] = useState(initialWordFamilies);
  const [synonymGroups, setSynonymGroups] = useState(initialSynonymGroups);
  const [wordFamilyMapping, setWordFamilyMapping] = useState(initialWordFamilyMapping);
  const [wordSynonymMapping, setWordSynonymMapping] = useState(initialWordSynonymMapping);
  const [wordTopicMapping, setWordTopicMapping] = useState(initialWordTopicMapping);
  const [selectedTag, setSelectedTag] = useState(tags[0]);
  const updateModal = useDisclosure();
  const newModal = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [vocabText, setVocabText] = useState('');
  const [exampleText, setExampleText] = useState('');
  const [fieldA, setFieldA] = useState('');
  const [fieldB, setFieldB] = useState('');

  const openUpdate = (index) => {
    setSelectedIndex(index);
    // prepare fields for update modal based on tag
    if (selectedTag === 'Antonyms') {
      setWord1(String(pairs[index][0]));
      setWord2(String(pairs[index][1]));
    } else if (selectedTag === 'Example') {
      setVocabText(String(examples[index].vocab || ''));
      setExampleText(String(examples[index].example || ''));
    } else if (selectedTag === 'Words') {
      setVocabText(String(words[index] || ''));
    } else if (selectedTag === 'POS') {
      setVocabText(String(posList[index] || ''));
    } else if (selectedTag === 'Definition') {
      setVocabText(String(definitions[index].word || ''));
      setExampleText(String(definitions[index].definition || ''));
    } else if (selectedTag === 'Topics') {
      setVocabText(String(topics[index] || ''));
    } else if (selectedTag === 'Pronunciation') {
      setVocabText(String(pronunciations[index].word || ''));
      setExampleText(String(pronunciations[index].pron || ''));
    } else if (selectedTag === 'Word_Families') {
      setVocabText(String(wordFamilies[index].family || ''));
      setExampleText(String(wordFamilies[index].members || ''));
    } else if (selectedTag === 'Synonyms_Groups') {
      setVocabText(String(synonymGroups[index].group || ''));
      setExampleText(String(synonymGroups[index].words || ''));
    } else if (selectedTag === 'Word_Family_Mapping') {
      setFieldA(String(wordFamilyMapping[index].a || ''));
      setFieldB(String(wordFamilyMapping[index].b || ''));
    } else if (selectedTag === 'Word_Synonym_Mapping') {
      setFieldA(String(wordSynonymMapping[index].a || ''));
      setFieldB(String(wordSynonymMapping[index].b || ''));
    } else if (selectedTag === 'Word_Topic_Mapping') {
      setFieldA(String(wordTopicMapping[index].a || ''));
      setFieldB(String(wordTopicMapping[index].b || ''));
    }
    updateModal.onOpen();
  };

  const openNew = () => {
    setSelectedIndex(null);
    setWord1('');
    setWord2('');
    setVocabText('');
    setExampleText('');
    setFieldA('');
    setFieldB('');
    newModal.onOpen();
  };

  const handleUpdate = () => {
    if (selectedTag === 'Antonyms') {
      const updated = [...pairs];
      updated[selectedIndex] = [Number(word1), Number(word2)];
      setPairs(updated);
    } else if (selectedTag === 'Example') {
      const updated = [...examples];
      updated[selectedIndex] = { vocab: vocabText, example: exampleText };
      setExamples(updated);
    } else if (selectedTag === 'Words') {
      const updated = [...words];
      updated[selectedIndex] = vocabText;
      setWords(updated);
    } else if (selectedTag === 'POS') {
      const updated = [...posList];
      updated[selectedIndex] = vocabText;
      setPosList(updated);
    } else if (selectedTag === 'Definition') {
      const updated = [...definitions];
      updated[selectedIndex] = { word: vocabText, definition: exampleText };
      setDefinitions(updated);
    } else if (selectedTag === 'Topics') {
      const updated = [...topics];
      updated[selectedIndex] = vocabText;
      setTopics(updated);
    } else if (selectedTag === 'Pronunciation') {
      const updated = [...pronunciations];
      updated[selectedIndex] = { word: vocabText, pron: exampleText };
      setPronunciations(updated);
    } else if (selectedTag === 'Word_Families') {
      const updated = [...wordFamilies];
      updated[selectedIndex] = { family: vocabText, members: exampleText };
      setWordFamilies(updated);
    } else if (selectedTag === 'Synonyms_Groups') {
      const updated = [...synonymGroups];
      updated[selectedIndex] = { group: vocabText, words: exampleText };
      setSynonymGroups(updated);
    } else if (selectedTag === 'Word_Family_Mapping') {
      const updated = [...wordFamilyMapping];
      updated[selectedIndex] = { a: fieldA, b: fieldB };
      setWordFamilyMapping(updated);
    } else if (selectedTag === 'Word_Synonym_Mapping') {
      const updated = [...wordSynonymMapping];
      updated[selectedIndex] = { a: fieldA, b: fieldB };
      setWordSynonymMapping(updated);
    } else if (selectedTag === 'Word_Topic_Mapping') {
      const updated = [...wordTopicMapping];
      updated[selectedIndex] = { a: fieldA, b: fieldB };
      setWordTopicMapping(updated);
    }
    updateModal.onClose();
  };

  const handleDelete = (index) => {
    if (selectedTag === 'Antonyms') {
      const updated = pairs.filter((_, i) => i !== index);
      setPairs(updated);
    } else if (selectedTag === 'Example') {
      const updated = examples.filter((_, i) => i !== index);
      setExamples(updated);
    } else if (selectedTag === 'Words') {
      setWords((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'POS') {
      setPosList((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Definition') {
      setDefinitions((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Topics') {
      setTopics((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Pronunciation') {
      setPronunciations((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Word_Families') {
      setWordFamilies((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Synonyms_Groups') {
      setSynonymGroups((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Word_Family_Mapping') {
      setWordFamilyMapping((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Word_Synonym_Mapping') {
      setWordSynonymMapping((prev) => prev.filter((_, i) => i !== index));
    } else if (selectedTag === 'Word_Topic_Mapping') {
      setWordTopicMapping((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }} pb='40px'>
        <Box px={{ base: '16px', md: '30px' }}>
          <Stack spacing={6}>
            <HStack spacing={4} wrap='wrap'>
              {tags.map((t, i) => (
                <Button
                  key={i}
                  size='sm'
                  variant={selectedTag === t ? 'solid' : 'ghost'}
                  colorScheme='purple'
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </Button>
              ))}
            </HStack>

            <Box>
              <Card mx='auto' maxW='760px' p='24px' borderRadius='16px'>
                <HStack justify='space-between' mb='16px'>
                  <Text fontSize='2xl' fontWeight='700' color={textColor}>
                    {selectedTag} {
                      selectedTag === 'Antonyms' ? `(${pairs.length} x 2)` :
                      selectedTag === 'Example' ? `(${examples.length})` :
                      selectedTag === 'Words' ? `(${words.length})` :
                      selectedTag === 'POS' ? `(${posList.length})` :
                      selectedTag === 'Definition' ? `(${definitions.length})` :
                      selectedTag === 'Topics' ? `(${topics.length})` :
                      selectedTag === 'Pronunciation' ? `(${pronunciations.length})` :
                      selectedTag === 'Word_Families' ? `(${wordFamilies.length})` :
                      selectedTag === 'Synonyms_Groups' ? `(${synonymGroups.length})` :
                      selectedTag === 'Word_Family_Mapping' ? `(${wordFamilyMapping.length})` :
                      selectedTag === 'Word_Synonym_Mapping' ? `(${wordSynonymMapping.length})` :
                      selectedTag === 'Word_Topic_Mapping' ? `(${wordTopicMapping.length})` : ''
                    }
                  </Text>
                  <Button leftIcon={<MdAdd />} size='sm' variant='outline' onClick={openNew}>
                    New
                  </Button>
                </HStack>

                <Box borderTopWidth='1px' borderTopColor='gray.100' pt='18px'>
                  {selectedTag === 'Antonyms' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          word1_id
                        </Text>
                        <Stack spacing={6}>
                          {pairs.map((p, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>
                              {p[0]}
                            </Text>
                          ))}
                        </Stack>
                      </Box>

                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          word2_id
                        </Text>
                        <Stack spacing={6}>
                          {pairs.map((p, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>
                              {p[1]}
                            </Text>
                          ))}
                        </Stack>
                      </Box>

                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          Actions
                        </Text>
                        <Stack spacing={4} align='center'>
                          {pairs.map((_, idx) => (
                            <HStack key={idx} spacing={2}>
                              <IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} />
                              <IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} />
                            </HStack>
                          ))}
                        </Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Example' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          Vocab
                        </Text>
                        <Stack spacing={6}>
                          {examples.map((e, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>
                              {e.vocab}
                            </Text>
                          ))}
                        </Stack>
                      </Box>

                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          Example
                        </Text>
                        <Stack spacing={6}>
                          {examples.map((e, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>
                              {e.example}
                            </Text>
                          ))}
                        </Stack>
                      </Box>

                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>
                          Actions
                        </Text>
                        <Stack spacing={4} align='center'>
                          {examples.map((_, idx) => (
                            <HStack key={idx} spacing={2}>
                              <IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} />
                              <IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} />
                            </HStack>
                          ))}
                        </Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Words' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>
                          {words.map((w, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>{w}</Text>
                          ))}
                        </Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>&nbsp;</Text>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>
                          {words.map((_, idx) => (
                            <HStack key={idx} spacing={2}>
                              <IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} />
                              <IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} />
                            </HStack>
                          ))}
                        </Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'POS' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>POS</Text>
                        <Stack spacing={6}>
                          {posList.map((p, idx) => (
                            <Text key={idx} fontWeight='600' color={textColor}>{p}</Text>
                          ))}
                        </Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>&nbsp;</Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>
                          {posList.map((_, idx) => (
                            <HStack key={idx} spacing={2}>
                              <IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} />
                              <IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} />
                            </HStack>
                          ))}
                        </Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Definition' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>{definitions.map((d, idx) => <Text key={idx} fontWeight='600' color={textColor}>{d.word}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Definition</Text>
                        <Stack spacing={6}>{definitions.map((d, idx) => <Text key={idx} fontWeight='600' color={textColor}>{d.definition}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{definitions.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Topics' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Topic</Text>
                        <Stack spacing={6}>{topics.map((t, idx) => <Text key={idx} fontWeight='600' color={textColor}>{t}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>&nbsp;</Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{topics.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Pronunciation' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>{pronunciations.map((p, idx) => <Text key={idx} fontWeight='600' color={textColor}>{p.word}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Pronunciation</Text>
                        <Stack spacing={6}>{pronunciations.map((p, idx) => <Text key={idx} fontWeight='600' color={textColor}>{p.pron}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{pronunciations.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Word_Families' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Family</Text>
                        <Stack spacing={6}>{wordFamilies.map((f, idx) => <Text key={idx} fontWeight='600' color={textColor}>{f.family}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Members</Text>
                        <Stack spacing={6}>{wordFamilies.map((f, idx) => <Text key={idx} fontWeight='600' color={textColor}>{f.members}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{wordFamilies.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Synonyms_Groups' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Group</Text>
                        <Stack spacing={6}>{synonymGroups.map((g, idx) => <Text key={idx} fontWeight='600' color={textColor}>{g.group}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Words</Text>
                        <Stack spacing={6}>{synonymGroups.map((g, idx) => <Text key={idx} fontWeight='600' color={textColor}>{g.words}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{synonymGroups.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Word_Family_Mapping' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>{wordFamilyMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.a}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Family</Text>
                        <Stack spacing={6}>{wordFamilyMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.b}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{wordFamilyMapping.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Word_Synonym_Mapping' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>{wordSynonymMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.a}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Synonym</Text>
                        <Stack spacing={6}>{wordSynonymMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.b}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{wordSynonymMapping.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : selectedTag === 'Word_Topic_Mapping' ? (
                    <SimpleGrid columns={3} spacing={0} align='center'>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Word</Text>
                        <Stack spacing={6}>{wordTopicMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.a}</Text>)}</Stack>
                      </Box>
                      <Box px='12px' borderLeftWidth='1px' borderRightWidth='1px' borderColor='gray.100'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Topic</Text>
                        <Stack spacing={6}>{wordTopicMapping.map((m, idx) => <Text key={idx} fontWeight='600' color={textColor}>{m.b}</Text>)}</Stack>
                      </Box>
                      <Box px='12px'>
                        <Text fontSize='sm' color='gray.400' mb='8px'>Actions</Text>
                        <Stack spacing={4} align='center'>{wordTopicMapping.map((_, idx) => (
                          <HStack key={idx} spacing={2}><IconButton aria-label='update' icon={<MdRefresh />} size='sm' onClick={() => openUpdate(idx)} /><IconButton aria-label='delete' icon={<MdDelete />} colorScheme='red' size='sm' onClick={() => handleDelete(idx)} /></HStack>
                        ))}</Stack>
                      </Box>
                    </SimpleGrid>
                  ) : (
                    <Center py={10}>
                      <Text color={textColor} fontWeight='600'>Content for {selectedTag} not implemented yet.</Text>
                    </Center>
                  )}
                </Box>
              </Card>
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* Update Modal */}
      <Modal isOpen={updateModal.isOpen} onClose={updateModal.onClose} isCentered>
        <ModalOverlay bg='rgba(0,0,0,0.6)' />
        <ModalContent
          mx='20px'
          bg='purple.300'
          borderRadius='28px'
          py='20px'
          maxW='760px'
        >
          <ModalCloseButton color='gray.700' />
          <ModalHeader pt='8' pb='2' textAlign='center'>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight='800' color='black'>Updating</Text>
          </ModalHeader>
          <ModalBody>
            <Center>
              <Box bg='white' p='20px' w='100%' maxW='640px' borderRadius='6px'>
                {selectedTag === 'Antonyms' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px' textAlign='center'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>word1_id</FormLabel>
                        <Input value={word1} onChange={(e) => setWord1(e.target.value)} size='lg' textAlign='center' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Box h='48px' borderLeftWidth='1px' borderColor='gray.200' />
                    </Box>
                    <Box px='20px' textAlign='center'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>word2_id</FormLabel>
                        <Input value={word2} onChange={(e) => setWord2(e.target.value)} size='lg' textAlign='center' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Example' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Vocab</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Example</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Words' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'POS' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>POS Tag</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'Definition' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Definition</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Topics' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>Topic</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'Pronunciation' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Pronunciation</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Word_Families' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Family</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Members (comma separated)</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Synonyms_Groups' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Group</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Words (comma separated)</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Word_Family_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Family</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Word_Synonym_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Synonym</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Word_Topic_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Topic</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : (
                  <Text color={textColor}>No editable fields for this tag.</Text>
                )}
              </Box>
            </Center>
          </ModalBody>
          <ModalFooter px='8' pt='6' pb='8' justifyContent='space-between'>
            <Button
              onClick={updateModal.onClose}
              bgGradient='linear(to-b, #0b84ff, #0077e6)'
              color='white'
              _hover={{ opacity: 0.9 }}
              boxShadow='lg'
              borderRadius='999px'
              px='10'
              py='6'
              fontSize='xl'
              fontWeight='700'
            >
              Cancel
            </Button>
            <Button
              onClick={() => { handleUpdate(); }}
              bgGradient='linear(to-b, #0b84ff, #0077e6)'
              color='white'
              _hover={{ opacity: 0.9 }}
              boxShadow='lg'
              borderRadius='999px'
              px='10'
              py='6'
              fontSize='xl'
              fontWeight='700'
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Modal */}
      <Modal isOpen={newModal.isOpen} onClose={newModal.onClose} isCentered>
        <ModalOverlay bg='rgba(0,0,0,0.6)' />
        <ModalContent
          mx='20px'
          bg='purple.300'
          borderRadius='28px'
          py='20px'
          maxW='760px'
        >
          <ModalCloseButton color='gray.700' />
          <ModalHeader pt='8' pb='2' textAlign='center'>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight='800' color='black'>Create {selectedTag}</Text>
          </ModalHeader>
          <ModalBody>
            <Center>
              <Box bg='white' p='20px' w='100%' maxW='640px' borderRadius='6px'>
                {selectedTag === 'Antonyms' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px' textAlign='center'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>word1_id</FormLabel>
                        <Input value={word1} onChange={(e) => setWord1(e.target.value)} size='lg' textAlign='center' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                      <Box h='48px' borderLeftWidth='1px' borderColor='gray.200' />
                    </Box>
                    <Box px='20px' textAlign='center'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>word2_id</FormLabel>
                        <Input value={word2} onChange={(e) => setWord2(e.target.value)} size='lg' textAlign='center' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Example' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Vocab</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Example</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Words' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'POS' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>POS Tag</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'Definition' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Definition</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Topics' ? (
                  <FormControl>
                    <FormLabel fontSize='sm' color='gray.500' mb='6px'>Topic</FormLabel>
                    <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                  </FormControl>
                ) : selectedTag === 'Pronunciation' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Pronunciation</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Word_Families' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Family</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Members (comma separated)</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Synonyms_Groups' ? (
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Group</FormLabel>
                      <Input value={vocabText} onChange={(e) => setVocabText(e.target.value)} size='lg' />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize='sm' color='gray.500' mb='6px'>Words (comma separated)</FormLabel>
                      <Input value={exampleText} onChange={(e) => setExampleText(e.target.value)} size='lg' />
                    </FormControl>
                  </Stack>
                ) : selectedTag === 'Word_Family_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Family</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Word_Synonym_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Synonym</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : selectedTag === 'Word_Topic_Mapping' ? (
                  <SimpleGrid columns={[1,3]} spacing={0} align='center' templateColumns='1fr 48px 1fr'>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Word</FormLabel>
                        <Input value={fieldA} onChange={(e) => setFieldA(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'><Box h='48px' borderLeftWidth='1px' borderColor='gray.200' /></Box>
                    <Box px='20px'>
                      <FormControl>
                        <FormLabel fontSize='sm' color='gray.500' mb='6px'>Topic</FormLabel>
                        <Input value={fieldB} onChange={(e) => setFieldB(e.target.value)} size='lg' />
                      </FormControl>
                    </Box>
                  </SimpleGrid>
                ) : (
                  <Text color={textColor}>No fields for this tag.</Text>
                )}
              </Box>
            </Center>
          </ModalBody>
          <ModalFooter px='8' pt='6' pb='8' justifyContent='space-between'>
            <Button
              onClick={newModal.onClose}
              bgGradient='linear(to-b, #0b84ff, #0077e6)'
              color='white'
              _hover={{ opacity: 0.9 }}
              boxShadow='lg'
              borderRadius='999px'
              px='10'
              py='6'
              fontSize='xl'
              fontWeight='700'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedTag === 'Antonyms') {
                  const n1 = Number(word1);
                  const n2 = Number(word2);
                  setPairs((prev) => [...prev, [n1, n2]]);
                } else if (selectedTag === 'Example') {
                  setExamples((prev) => [...prev, { vocab: vocabText, example: exampleText }]);
                } else if (selectedTag === 'Words') {
                  setWords((prev) => [...prev, vocabText]);
                } else if (selectedTag === 'POS') {
                  setPosList((prev) => [...prev, vocabText]);
                } else if (selectedTag === 'Definition') {
                  setDefinitions((prev) => [...prev, { word: vocabText, definition: exampleText }]);
                } else if (selectedTag === 'Topics') {
                  setTopics((prev) => [...prev, vocabText]);
                } else if (selectedTag === 'Pronunciation') {
                  setPronunciations((prev) => [...prev, { word: vocabText, pron: exampleText }]);
                } else if (selectedTag === 'Word_Families') {
                  setWordFamilies((prev) => [...prev, { family: vocabText, members: exampleText }]);
                } else if (selectedTag === 'Synonyms_Groups') {
                  setSynonymGroups((prev) => [...prev, { group: vocabText, words: exampleText }]);
                } else if (selectedTag === 'Word_Family_Mapping') {
                  setWordFamilyMapping((prev) => [...prev, { a: fieldA, b: fieldB }]);
                } else if (selectedTag === 'Word_Synonym_Mapping') {
                  setWordSynonymMapping((prev) => [...prev, { a: fieldA, b: fieldB }]);
                } else if (selectedTag === 'Word_Topic_Mapping') {
                  setWordTopicMapping((prev) => [...prev, { a: fieldA, b: fieldB }]);
                }
                newModal.onClose();
              }}
              bgGradient='linear(to-b, #0b84ff, #0077e6)'
              color='white'
              _hover={{ opacity: 0.9 }}
              boxShadow='lg'
              borderRadius='999px'
              px='10'
              py='6'
              fontSize='xl'
              fontWeight='700'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
