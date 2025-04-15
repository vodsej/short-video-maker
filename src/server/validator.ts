import { createShortInput, CreateShortInput } from "../types/shorts";
import { logger } from "../logger";

export function validateCreateShortInput(input: object): CreateShortInput {
  const validated = createShortInput.safeParse(input);
  logger.info({ validated }, "Validated input");
  if (validated.success) {
    return validated.data;
  }
  throw new Error("Invalid input: " + validated.error.message);
}
