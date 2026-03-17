import { mainSeed } from "../../src/Infrastructure/Database/seed";
import { resetDatabase } from "./prisma-instance";

beforeAll(async () => {
  await resetDatabase();
  await mainSeed()

  console.clear()
});
