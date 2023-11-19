import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Card,
  Center,
  Icon,
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import { GiHourglass, GiScreenImpact } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import CooldownLabel from "../../generic/CooldownLabel";

const SkillsView = ({ character }: { character: Character }) => {
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
                  <Td>
                    {s.minBaseDamage !== 0 && s.maxBaseDamage !== 0 && (
                      <DamageRangeLabel
                        minDamage={s.minBaseDamage}
                        maxDamage={s.maxBaseDamage}
                        showIcon={false}
                      />
                    )}
                  </Td>
                  <Td>
                    <EnergyCostLabel
                      energyCost={s.energyCost}
                      showIcon={false}
                    />
                  </Td>
                  <Td>
                    <CooldownLabel cooldown={s.cooldown} showIcon={false} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Card>
  );
};

export default SkillsView;
