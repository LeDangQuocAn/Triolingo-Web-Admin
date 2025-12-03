// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import Information from "views/admin/profile/components/Information";
import { useLocation } from 'react-router-dom';

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  const location = useLocation();
  const user = location.state && location.state.user ? location.state.user : null;
  const username = user && user.username ? user.username : null;

  const formatDate = (d) => {
    if (!d) return '—';
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return d;
    }
  };

  const [info, setInfo] = useState(() => ({
    username: user && user.username ? user.username : '',
    email: user && user.email ? user.email : '—',
    dateCreated: user && (user.createdAt || user.dateCreated) ? formatDate(user.createdAt || user.dateCreated) : '—',
    currentTopic: user && user.currentTopic ? user.currentTopic : '—',
    // removed: vocabulary, flashcard, quiz (not displayed)
  }));

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!username) return; // nothing to fetch for anonymous profile
      try {
        // If backend provides a user-general endpoint, we merge its results.
        if (!username) return;
        const res = await fetch(`/api/admin/user-general?username=${encodeURIComponent(username)}`);
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          // merge returned fields into info (prefer backend values)
          setInfo((prev) => ({
            username: data.username || prev.username,
            email: data.email || prev.email,
            dateCreated: (data.dateCreated || data.createdAt) ? formatDate(data.dateCreated || data.createdAt) : prev.dateCreated,
            currentTopic: data.currentTopic || prev.currentTopic,
            // removed: vocabulary, flashcard, quiz
          }));
        }
      } catch (e) {
        // API not available or network error — keep already-provided user data
      }
    }
    load();
    return () => { mounted = false; };
  }, [username]);
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
        <Information boxShadow={cardShadow} title='Username' value={info.username} />
        <Information boxShadow={cardShadow} title='Email' value={info.email} />
        <Information boxShadow={cardShadow} title='Date Created' value={info.dateCreated} />
          <Information boxShadow={cardShadow} title='Current Topic' value={info.currentTopic} />
      </SimpleGrid>
    </Card>
  );
}
