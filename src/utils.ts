import { CardType } from "./type.tsx";

export function isCardType(
  data: Record<string | symbol, unknown>
): data is CardType {
  return (
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.position === "number" &&
    typeof data.columnId === "string"
  );
}

export const noop = () => {};
