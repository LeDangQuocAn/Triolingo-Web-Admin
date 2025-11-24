import React, { useState } from 'react';
import {
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Center,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

export default function DeleteUser(props) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (props.onDelete) props.onDelete(reason);
    onClose();
    setReason('');
  };

  return (
    <>
      <Card mb="20px" {...props}>
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mb="12px">
          Delete User
        </Text>
        <Button colorScheme="red" width="full" onClick={onOpen}>
          DELETE
        </Button>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg='rgba(0,0,0,0.6)' />
        <ModalContent borderRadius='16px' mx='24px'>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text textAlign='center' fontSize='lg'>
                Warning: You are about to delete this user.
                <br />
                This action is irreversible.
              </Text>
            </Center>
            <FormControl mt='16px'>
              <FormLabel fontSize='sm'>Reason (Optional)</FormLabel>
              <Textarea
                placeholder='Reason'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleConfirm}>
              DELETE ANYWAY
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
