import { RepeatIcon } from '@chakra-ui/icons';
import { Stack, useRadioGroup, Image, Input, Heading, Container, Grid, GridItem, Text, HStack, IconButton, Divider, Box } from '@chakra-ui/react';
import AttributeInput from './AttributeInput';
import RadioCard from './RadioCard';
import useNewCharacterContext from '../../../context/NewCharacterContext';
import { CharacterClass } from '../../../types';

const NewCharacterForm = () => {
    const characterClasses: CharacterClass[] = ["Warrior", "Mage", "Rogue", "Priest"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'class',
        defaultValue: 'Warrior',
        onChange: console.log,
    });

    const group = getRootProps();

    const { remainingAttributePoints, avatarUrl, randomizeAvatar } = useNewCharacterContext();

    return (
        <Container py={4}>
            <Stack gap={4} alignItems="center">
                {/* Avatar */}
                <Box position="relative" border="2px" borderColor="gray.100" borderRadius='lg' boxSize="xs">
                    <Image src={avatarUrl} alt="avatar" />
                    <IconButton icon={<RepeatIcon />} aria-label="Randomize avatar" position="absolute" bottom={4} right={4} onClick={() => randomizeAvatar()} />
                </Box>

                <Divider />

                {/* Class selection */}
                <HStack justifyContent="space-between" width="full" {...group}>
                    {characterClasses.map((cc) => {
                        const radio = getRadioProps({ value: cc });
                        return (
                            <RadioCard key={cc} {...radio}>
                                {cc}
                            </RadioCard>
                        );
                    })}
                </HStack>

                {/* Character name */}
                <Input maxLength={24} placeholder="Character name" />

                {/* Attributes */}
                <Grid gap={4} alignItems="center" width="70%" alignSelf="center">
                    <AttributeInput attribute="strength" />
                    <AttributeInput attribute="stamina" />
                    <AttributeInput attribute="agility" />
                    <AttributeInput attribute="intelligence" />

                    <GridItem gridColumn="2" justifySelf="end">
                        <HStack gap={8} justifyContent="flex-end" width="fit-content">
                            <Text>Points remaining:</Text>
                            <Heading size="lg">{remainingAttributePoints}</Heading>
                        </HStack>
                    </GridItem>
                </Grid>
            </Stack>
        </Container>
    );
};

export default NewCharacterForm;