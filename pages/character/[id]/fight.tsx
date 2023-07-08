import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCharacter, useEnemies } from "../../../queries/character";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import LoadingPage from "../../../components/generic/LoadingPage";
import { HeartFilled, ThunderboltFilled } from "@ant-design/icons";

const Fight = () => {
  const router = useRouter();
  const characterId = Number(router.query.id);
  const { data: character, isLoading } = useCharacter(characterId);
  const { data: enemies } = useEnemies(characterId);

  if (isLoading || character == null) return <LoadingPage />;

  return (
    <Center h="100vh" bgColor="teal.50">
      <HStack>
        <Card>
          <CardHeader>
            <Stack height={16} gap={1} alignItems="center">
              <Heading size="md">{character.name}</Heading>
              <HStack>
                <Text>
                  Level {character.level} {character.class}
                </Text>
              </HStack>
            </Stack>

            <Divider />
          </CardHeader>

          <CardBody>
            <Stack>
              <HStack justifyContent="center" gap={8}>
                <HStack>
                  <Icon as={HeartFilled} color="red.500" />
                  <Text fontWeight="bold" color="red.500">
                    {character.currentHitPoints} / {character.maxHitPoints}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={ThunderboltFilled} color="blue.500" />
                  <Text fontWeight="bold" color="blue.500">
                    {character.currentEnergy} / {character.maxEnergy}
                  </Text>
                </HStack>
              </HStack>

              <Image
                src={character.avatar}
                alt="Character avatar"
                boxSize="2xs"
              />
            </Stack>
          </CardBody>

          <CardFooter justifyContent="center">
            <ButtonGroup>
              <Button>Attack</Button>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Skills
                </MenuButton>
                <MenuList w="400px">
                  {character.skills.map((s) => (
                    <MenuItem key={s.name} justifyContent="space-between">
                      <Text fontStyle="italic" color="gray.500" flex={2}>
                        {s.damageType}
                      </Text>
                      <Text flex={2}>{s.name}</Text>
                      <Text flex={1} fontWeight="bold">
                        {s.damage}
                      </Text>
                      <HStack flex={1}>
                        <Icon as={ThunderboltFilled} color="blue.500" />
                        <Text fontWeight="bold" color="blue.500">
                          {/* Placeholder energy cost */}
                          25
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </HStack>
    </Center>
  );
};

export default Fight;
