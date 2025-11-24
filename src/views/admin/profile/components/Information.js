// Chakra imports
import {
  Box,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Information(props) {
  const { title, value, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");

  const isPassword = title && title.toLowerCase() === 'password';
  const [show, setShow] = useState(false);

  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
          {title}
        </Text>
        {isPassword ? (
          <InputGroup>
            <Input
              value={value}
              type={show ? 'text' : 'password'}
              readOnly
              variant='unstyled'
              color={textColorPrimary}
              fontWeight='500'
              fontSize='md'
            />
            <InputRightElement>
              <IconButton
                aria-label={show ? 'Hide password' : 'Show password'}
                size='sm'
                variant='ghost'
                onClick={() => setShow(!show)}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        ) : (
          <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
            {value}
          </Text>
        )}
      </Box>
    </Card>
  );
}
