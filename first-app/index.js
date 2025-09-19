import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be 18+"),
});

const inputData = {
  name: "John",
  email: "john@example.com",
  age: 19,
};


const result = userSchema.safeParse(inputData);

if (!result.success) {
  console.error("errors:", result.error.flatten().fieldErrors);
} else {
  console.log("data:", result.data);
}
