import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text
        my='32px'
        color={logoColor}
        fontWeight='800'
        fontSize='2xl'
        letterSpacing='0.6px'
      >
        TRIOLINGO
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
