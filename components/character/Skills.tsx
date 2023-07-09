import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Card,
  Center,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Character } from "../../queries/character";
import {
  GiHealthIncrease,
  GiHealthNormal,
  GiHourglass,
  GiScreenImpact,
} from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";

const Skills = ({ character }: { character: Character }) => {
  return (
    <Card width="fit-content" padding="12">
      <Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Damage Type</Th>
                <Th>Name</Th>
                <Th>
                  <Icon boxSize={4} as={GiScreenImpact} />
                </Th>
                <Th>
                  <Icon boxSize={4} color="green.500" as={GiHealthNormal} />
                </Th>
                <Th>
                  <Icon boxSize={4} color="blue.500" as={AiFillThunderbolt} />
                </Th>
                <Th>
                  <Icon boxSize={4} color="purple.500" as={GiHourglass} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {character.skills.map((s) => (
                <Tr key={s.id}>
                  <Td>{s.damageType}</Td>
                  <Td>{s.name}</Td>
                  <Td>{s.damage}</Td>
                  <Td>{s.healing}</Td>
                  <Td>{s.energyCost}</Td>
                  <Td>{s.cooldown}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Card>
  );
};

export default Skills;
