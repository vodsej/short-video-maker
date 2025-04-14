import z from "zod";
import { CreateShortInput } from "../types/shorts";

export function validateCreateShortInput(input: object): CreateShortInput {
  const validated = z.custom<CreateShortInput>().safeParse(input);
  if (validated.success) {
    return validated.data;
  }
  throw new Error("Invalid input");
}
