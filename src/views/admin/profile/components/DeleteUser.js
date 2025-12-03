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
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DeleteUser(props) {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user ? location.state.user : null;
  // Prefer the backend Mongo `_id` field when present
  const userId = user && (user._id || user.id) ? (user._id || user.id) : null;

  const handleConfirm = async () => {
    // If parent provided handler, call it (keeps backwards compatibility)
    if (props.onDelete) props.onDelete(reason);

    // If we have a user id, call backend DELETE
    if (userId) {
      try {
        const token = localStorage.getItem('token');
        const headers = Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : {});
        const res = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
          method: 'DELETE',
          headers,
          body: reason ? JSON.stringify({ reason }) : undefined,
        });

        if (res.ok) {
          toast({ title: 'User deleted', status: 'success', duration: 3000, isClosable: true });
          onClose();
          // Navigate back to users list
          navigate('/admin/user-management');
          setReason('');
          return;
        }

        const err = await res.json().catch(() => null);
        toast({ title: 'Delete failed', description: err && err.message ? err.message : 'Server error', status: 'error', duration: 4000, isClosable: true });
      } catch (e) {
        toast({ title: 'Delete failed', description: e.message || String(e), status: 'error', duration: 4000, isClosable: true });
      }
    } else {
      // No id available — simply close modal
      onClose();
      setReason('');
    }
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
