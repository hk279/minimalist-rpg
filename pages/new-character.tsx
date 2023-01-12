import { RepeatIcon } from '@chakra-ui/icons';
import { Stack, useRadioGroup, Image, Input, Heading, Container, Grid, GridItem, Text, HStack, IconButton, Divider, Box } from '@chakra-ui/react';
import AttributeInput from '../components/pages/new-character/AttributeInput';
import RadioCard from '../components/pages/new-character/RadioCard';

const NewCharacter = () => {
    const options = ["Warrior", "Mage", "Rogue", "Priest"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'class',
        defaultValue: 'Warrior',
        onChange: console.log,
    });

    const group = getRootProps();

    // PUT IN CONTEXT AS STATE
    const avatarSeed = crypto.randomUUID();
    const availablePoints = 10;

    return (
        <Container py={16}>
            <Stack gap={4}>
                {/* Avatar */}
                <Box position="relative" border="2px" borderColor="gray.100" borderRadius='lg'>
                    <Image src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${avatarSeed}`} alt="avatar" />
                    <IconButton icon={<RepeatIcon />} aria-label="Randomize avatar" position="absolute" bottom={4} right={4} />
                </Box>

                <Divider />

                {/* Class selection */}
                <HStack gap={8} justifyContent="space-between" {...group}>
                    {options.map((option) => {
                        const radio = getRadioProps({ value: option });
                        return (
                            <RadioCard key={option} {...radio}>
                                {option}
                            </RadioCard>
                        );
                    })}
                </HStack>

                {/* Character name */}
                <Input maxLength={24} placeholder="Character name" />

                <Divider />

                {/* Attributes */}
                <Grid gap={4} alignItems="center" width="70%" alignSelf="center">
                    <AttributeInput attribute="Strength" />
                    <AttributeInput attribute="Stamina" />
                    <AttributeInput attribute="Agility" />
                    <AttributeInput attribute="Intelligence" />

                    <GridItem gridColumn="2" justifySelf="end">
                        <HStack gap={8} justifyContent="flex-end" width="fit-content">
                            <Text>Points remaining:</Text>
                            <Heading size="lg">{availablePoints}</Heading>
                        </HStack>
                    </GridItem>
                </Grid>
            </Stack>
        </Container>
    );
};

export default NewCharacter;