import axios from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import { CharacterClass, Skill } from "../types";

type Character = {
    id: number,
    name: string,
    avatar: string,
    strength: number,
    intelligence: number,
    stamina: number,
    maxHitPoints: number,
    currentHitPoints: number,
    armor: number,
    resistance: number,
    class: CharacterClass,
    skills: Skill[],
};

type CreateCharacterInput = {
    name: string,
    avatar: string,
    class: CharacterClass;
    strength: number,
    intelligence: number,
    stamina: number,
};

export const useCharacterData = () => {
    const toast = useToast();

    return useQuery(
        "characters",
        () => axios.get("/Character/all").then((res): Character[] => res.data.data),
        {
            onError: () => toast({ title: "Failed to get character data", status: "error" })
        });
};

export const useCreateCharacter = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation(
        (input: CreateCharacterInput) => axios.post('/Character', input),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["characters"] });
                toast({ title: "Character created", status: "success" });
            },
            onError: () => { toast({ title: "Character creation failed", status: "error" }); }
        });
};