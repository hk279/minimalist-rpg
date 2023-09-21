import { Tag, TagLeftIcon, TagLabel, TagProps } from "@chakra-ui/react";
import { GiHourglass } from "react-icons/gi";

type Props = TagProps & {
  cooldown: number;
  showIcon?: boolean;
};

const CooldownLabel = ({ cooldown, showIcon = true, ...rest }: Props) => (
  <Tag colorScheme="purple" {...rest}>
    {showIcon && <TagLeftIcon as={GiHourglass} color="purple.500" />}
    <TagLabel color="purple.500">{cooldown}</TagLabel>
  </Tag>
);

export default CooldownLabel;
