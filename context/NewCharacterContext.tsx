import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { useCreateCharacter } from "../queries/character";
import { Attribute, Attributes, CharacterClass } from "../types";

interface NewCharacterContextInterface {
    characterName: string,
    setCharacterName: Dispatch<SetStateAction<string>>,
    characterClass: CharacterClass,
    setCharacterClass: Dispatch<SetStateAction<CharacterClass>>,
    attributes: Attributes,
    remainingAttributePoints: number,
    incrementAttribute: (attribute: Attribute) => void;
    decrementAttribute: (attribute: Attribute) => void;
    avatarUrl: string;
    randomizeAvatar: () => void;
    createNewCharacter: () => void;
    isCreatingCharacter: boolean;
}

const avatarBaseUrl = "https://api.dicebear.com/5.x/adventurer/svg?seed=$";

export const NewCharacterContext = createContext<NewCharacterContextInterface | null>(null);

export const NewCharacterProvider = (props: { children: ReactNode; }) => {
    const [characterName, setCharacterName] = useState("");
    const [characterClass, setCharacterClass] = useState<CharacterClass>("Warrior");
    const [attributes, setAttributes] = useState({ strength: 5, stamina: 5, intelligence: 5 });
    const [avatarUrl, setAvatarUrl] = useState(avatarBaseUrl + "2");

    const { mutate: createCharacter, isLoading: isCreatingCharacter } = useCreateCharacter();

    const remainingAttributePoints = useMemo(() => {
        const maxAttributePoints = 30;
        const spentAttributePoints = Object.values(attributes).reduce((acc, curr) => acc + curr, 0);
        return maxAttributePoints - spentAttributePoints;
    }, [attributes]);

    const incrementAttribute = (attribute: Attribute) => {
        setAttributes({ ...attributes, [attribute]: attributes[attribute] + 1 });
    };

    const decrementAttribute = (attribute: Attribute) => {
        setAttributes({ ...attributes, [attribute]: attributes[attribute] - 1 });
    };

    const randomizeAvatar = () => {
        const avatarSeed = crypto.randomUUID();
        setAvatarUrl(avatarBaseUrl + avatarSeed);
    };

    const createNewCharacter = () => {
        createCharacter({ name: characterName, avatar: avatarUrl, class: characterClass, ...attributes });
    };

    return (
        <NewCharacterContext.Provider value={{
            characterName,
            setCharacterName,
            characterClass,
            setCharacterClass,
            attributes,
            remainingAttributePoints,
            incrementAttribute,
            decrementAttribute,
            avatarUrl,
            randomizeAvatar,
            createNewCharacter,
            isCreatingCharacter
        }}>
            {props.children}
        </NewCharacterContext.Provider>
    );
};

const useNewCharacterContext = () => {
    const context = useContext(NewCharacterContext);

    if (context == null) throw new Error("Using context outside of its Provider");

    return context;
};

export default useNewCharacterContext;