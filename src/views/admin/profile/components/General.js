// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        General Information
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='20px'>
        Basic account details and progress overview for this user.
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Email'
          value='Ademad22@gmail.com'
        />
        <Information
          boxShadow={cardShadow}
          title='Date Created'
          value='10/14/2025'
        />
        <Information
          boxShadow={cardShadow}
          title='Password'
          value='************'
        />
        <Information
          boxShadow={cardShadow}
          title='Vocabulary Progress'
          value='Careers'
        />
        <Information
          boxShadow={cardShadow}
          title='Flashcard Progress'
          value='Careers, 32/50 words'
        />
        <Information
          boxShadow={cardShadow}
          title='Quiz Progress'
          value='Quiz 3, Score 10'
        />
      </SimpleGrid>
    </Card>
  );
}
