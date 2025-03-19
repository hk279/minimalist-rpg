import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { GiScreenImpact } from "react-icons/gi";
import { DamageInstance } from "../../queries/fight";

type Props = { damageInstance: DamageInstance };

const DamageLabel = ({ damageInstance }: Props) => {
  const { totalDamage, damageType, hitType } = damageInstance;

  return (
    <Tag colorScheme={damageType === "Physical" ? "blackAlpha" : "blue"}>
      <TagLeftIcon as={GiScreenImpact} />
      <TagLabel>{totalDamage}</TagLabel>

      {hitType === "WeakHit" ? <TagLabel>WEAK</TagLabel> : null}
      {hitType === "CriticalHit" ? <TagLabel>CRITICAL</TagLabel> : null}
    </Tag>
  );
};

export default DamageLabel;
