import { Tag, TagLeftIcon, TagLabel, TagProps } from "@chakra-ui/react";
import { GiHourglass } from "react-icons/gi";

type Props = TagProps & {
  cooldown: number;
  remainingCooldown: number;
  showIcon?: boolean;
};

const CooldownCounterLabel = ({
  cooldown,
  remainingCooldown,
  showIcon = true,
  ...rest
}: Props) => (
  <Tag colorScheme="purple" {...rest}>
    {showIcon && <TagLeftIcon as={GiHourglass} color="purple.500" />}
    <TagLabel color="purple.500">
      {remainingCooldown === 0 ? "Ready" : `${remainingCooldown} / ${cooldown}`}
    </TagLabel>
  </Tag>
);

export default CooldownCounterLabel;
