import { useRouter } from "next/router";

export const useCharacterId = () => {
  const router = useRouter();
  const characterIdParam = Number(router.query.id);

  return Number.isNaN(characterIdParam) ? undefined : characterIdParam;
};
