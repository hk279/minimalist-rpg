import {
  Tag,
  TagLeftIcon,
  TagLabel,
  TagProps,
  Tooltip,
} from "@chakra-ui/react";
import { GiScreenImpact } from "react-icons/gi";

type Props = TagProps & {
  minDamage: number;
  maxDamage: number;
  showIcon?: boolean;
};

const DamageRangeLabel = ({
  minDamage,
  maxDamage,
  showIcon = true,
  ...rest
}: Props) => (
  <Tooltip label="Damage range">
    <Tag colorScheme="blackAlpha" {...rest}>
      {showIcon && <TagLeftIcon as={GiScreenImpact} />}
      <TagLabel>
        {minDamage} - {maxDamage}
      </TagLabel>
    </Tag>
  </Tooltip>
);

export default DamageRangeLabel;
