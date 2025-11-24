import React from 'react';
import {
  Box,
  Text,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

export default function AdminSettings(props) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Card mb="20px" {...props}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mb="4px">
        Administrative Settings
      </Text>

      <Flex align="center" justify="space-between" mt="10px" mb="16px">
        <Text fontSize="sm" color="gray.600">
          Suspend / Lock User
        </Text>
        <Switch id="suspend-lock" />
      </Flex>

      <FormControl mb="10px">
        <FormLabel fontSize="sm">From:</FormLabel>
        <Input placeholder="mm/dd/yyyy" />
      </FormControl>
      <FormControl mb="10px">
        <FormLabel fontSize="sm">To:</FormLabel>
        <Input placeholder="mm/dd/yyyy" />
      </FormControl>
      <FormControl mb="16px">
        <FormLabel fontSize="sm">Reason (Optional)</FormLabel>
        <Textarea placeholder="Reason" />
      </FormControl>
    </Card>
  );
}
