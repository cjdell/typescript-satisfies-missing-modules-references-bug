import { z } from "zod";
import { isValid } from "./lib";

// Uncomment the below lines and the program will run...
// z;
// isValid;

interface MyObject {
    name: string;
}

export const MyObjectSchema = z.object({
    name: z.string().refine(isValid),
}) satisfies z.ZodSchema<MyObject>;     // Removing the `satisfies` keyword will also make the program run

console.log(MyObjectSchema.parse({ name: 'foo' }));
