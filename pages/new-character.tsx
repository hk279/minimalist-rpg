import NewCharacterForm from "../components/pages/new-character/NewCharacterForm";
import { NewCharacterProvider } from "../context/NewCharacterContext";

const NewCharacter = () => {
    return (
        <NewCharacterProvider>
            <NewCharacterForm />
        </NewCharacterProvider>
    );
};

export default NewCharacter;