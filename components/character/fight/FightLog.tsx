import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import useFightContext from "../../../context/FightContext";
import { ActionResponse } from "../../../queries/fight";
import { Fragment } from "react";
import FightLogDamageLabel from "./FightLogDamageLabel";

const FightLog = () => {
  const { turnEvents } = useFightContext();

  const getActionEntry = (action?: ActionResponse) => {
    if (action == null) return "";

    const {
      actionType,
      characterName,
      targetCharacterName,
      skillName,
      damageInstance,
    } = action;

    switch (actionType) {
      case "WeaponAttack":
        return (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            rowGap={2}
          >
            {getCharacterTag(characterName)}
            <Text px={2}>attacked</Text>
            {getCharacterTag(targetCharacterName)}
            <Text px={2}>for</Text>
            <FightLogDamageLabel damageInstance={damageInstance} />
          </Box>
        );
      case "Skill":
        return (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            rowGap={2}
          >
            {getCharacterTag(characterName)}
            <Text px={2}>attacked</Text>
            {getCharacterTag(targetCharacterName)}
            <Text px={2}>with</Text>
            {getSkillTag(skillName ?? "")}
            <Text px={2}>for</Text>
            <FightLogDamageLabel damageInstance={damageInstance} />
          </Box>
        );
      default:
        throw new Error("Invalid ActionType");
    }
  };

  const getCharacterTag = (characterName: string) => (
    <Tag colorScheme="teal">
      <TagLabel>{characterName}</TagLabel>
    </Tag>
  );

  const getSkillTag = (skillName: string) => (
    <Tag colorScheme="blue">
      <TagLabel>{skillName}</TagLabel>
    </Tag>
  );

  return (
    <Card width="400px">
      <CardHeader>
        <Text fontWeight="bold" textAlign="center">
          Event Log
        </Text>
      </CardHeader>
      <CardBody textAlign="center">
        <Stack gap={4}>
          {getActionEntry(turnEvents?.playerAction)}
          <Divider />
          {turnEvents?.enemyActions.map((enemyAction, index) => (
            <Fragment key={index}>{getActionEntry(enemyAction)}</Fragment>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FightLog;
