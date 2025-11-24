import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Flex,
  Input,
  Button,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { MdAdd, MdSearch, MdPerson } from 'react-icons/md';

import Card from 'components/card/Card.js';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';

import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar4 from 'assets/img/avatars/avatar4.png';
import avatar5 from 'assets/img/avatars/avatar5.png';

export default function UserManagement() {
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const brandColor = useColorModeValue('brand.500', 'white');

  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      avatar: avatar1,
      handle: '@maddison_c21',
      status: 'Online',
      name: 'Maddison C',
      job: 'UX Designer',
    },
    {
      id: 2,
      avatar: avatar2,
      handle: '@karl.will02',
      status: 'Online',
      name: 'Karl Will',
      job: 'Frontend Dev',
    },
    {
      id: 3,
      avatar: avatar3,
      handle: '@andreea.1z',
      status: 'Offline',
      name: 'Andreea Z',
      job: 'Illustrator',
    },
    {
      id: 4,
      avatar: avatar4,
      handle: '@abraham47.y',
      status: 'Online',
      name: 'Abraham Y',
      job: 'Product Manager',
    },
    {
      id: 5,
      avatar: avatar5,
      handle: '@simmnple.web',
      status: 'Offline',
      name: 'Simmmple',
      job: 'Brand',
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <Box gridColumn={{ base: '1', md: '1 / span 2' }}>
          <Card px="20px" py="20px">
            <Flex align="center" justify="space-between" mb="12px">
              <Text fontSize="xl" fontWeight="700">
                Users
              </Text>
              <Button leftIcon={<MdAdd />} colorScheme="brand" size="sm">
                Add
              </Button>
            </Flex>

            <Flex align="center" gap={3} mb={6}>
              <Icon as={MdSearch} w="20px" h="20px" color="gray.400" />
              <Input placeholder="Search user" variant="unstyled" />
            </Flex>

            <Stack spacing={5}>
              {users.map((u) => (
                <Flex
                  key={u.id}
                  align="center"
                  justify="space-between"
                  cursor="pointer"
                  onClick={() =>
                    navigate('/admin/user-management/profile', {
                      state: {
                        user: {
                          banner: null,
                          avatar: u.avatar,
                          name: u.name,
                          job: u.job,
                          role: u.role || 'Learner',
                          status: u.status || 'Offline',
                          // optional: other fields
                        },
                      },
                    })
                  }
                >
                  <Flex align="center" gap={4}>
                    <Avatar src={u.avatar} name={u.handle} boxSize="56px" />
                    <Box>
                      <Text fontWeight={700}>{u.handle}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {u.name}
                      </Text>
                    </Box>
                  </Flex>

                  <Box>
                    <Badge
                      colorScheme={u.status === 'Online' ? 'green' : 'gray'}
                      variant="subtle"
                    >
                      {u.status}
                    </Badge>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Card>
        </Box>

        <Box>
          <Stack spacing={5}>
            <MiniStatistics
              startContent={
                <IconBox
                  w="64px"
                  h="64px"
                  bg={boxBg}
                  icon={<Icon w="36px" h="36px" as={MdPerson} color={brandColor} />}
                />
              }
              name="Total Users"
              value={'20K'}
              growth={'+7.9%'}
              reverse
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="64px"
                  h="64px"
                  bg={boxBg}
                  icon={<Icon w="36px" h="36px" as={MdPerson} color={brandColor} />}
                />
              }
              name="Active Users"
              value={'7.6K'}
              growth={'+23.5%'}
              reverse
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="64px"
                  h="64px"
                  bg={boxBg}
                  icon={<Icon w="36px" h="36px" as={MdPerson} color={brandColor} />}
                />
              }
              name="New Users"
              value={'936'}
              growth={'+3.4%'}
              reverse
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="64px"
                  h="64px"
                  bg={boxBg}
                  icon={<Icon w="36px" h="36px" as={MdPerson} color={brandColor} />}
                />
              }
              name="Deleted Users"
              value={'581'}
              growth={'+12.8%'}
              reverse
            />
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
