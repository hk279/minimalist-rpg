import { Tag, TagLeftIcon, TagLabel, TagProps } from "@chakra-ui/react";
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
  <Tag colorScheme="blackAlpha" {...rest}>
    {showIcon && <TagLeftIcon as={GiScreenImpact} />}
    <TagLabel>
      {minDamage} - {maxDamage}
    </TagLabel>
  </Tag>
);

export default DamageRangeLabel;
