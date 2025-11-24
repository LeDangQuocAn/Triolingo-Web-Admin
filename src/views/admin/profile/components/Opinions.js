import React from 'react';
import { Box, Text, Stack, Flex, Badge, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card.js';

function OpinionItem({ date, time, feedback, type }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Flex justify="space-between" align="flex-start" mb="14px">
      <Box>
        <Text fontSize="sm" color="gray.500">
          {date}
          {'  '}
          {time}
        </Text>
        <Text fontSize="md" color={textColor} mt="6px">
          {feedback}
        </Text>
      </Box>
      <Badge colorScheme={type === 'BUG' ? 'red' : 'purple'} alignSelf="center">
        {type}
      </Badge>
    </Flex>
  );
}

export default function Opinions(props) {
  const items = [
    { date: '10/29/2025', time: '11:30 am', feedback: 'This app seems meh.', type: 'FEEDBACK' },
    { date: '10/27/2025', time: '8:26 pm', feedback: 'Hey i have seen so many bugs to report...', type: 'BUG' },
  ];
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Card mb="20px" {...props}>
      <Text fontWeight="bold" fontSize="xl" color={textColorPrimary} mb="12px">
        Opinions From User
      </Text>
      <Stack>
        {items.map((it, idx) => (
          <OpinionItem key={idx} {...it} />
        ))}
      </Stack>
    </Card>
  );
}
