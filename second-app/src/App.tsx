import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "min length must be 3")
      .max(10, "max length must be 10"),
    age: z
      .number()
      .transform((val) => (Number.isNaN(val) ? Math.random() : val)),
    isProgrammer: z.literal(true),
    hobby: z.enum(["programming", "swimming"]),
  })
  .strict();

type FormData = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      age: 0,
      isProgrammer: true,
      hobby: "programming",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Zod + React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input {...register("username")} />
          <p style={{ color: "red" }}>{errors.username?.message}</p>
        </div>

        <div>
          <label>Age:</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          <p style={{ color: "red" }}>{errors.age?.message}</p>
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("isProgrammer")} />
            Are you a programmer?
          </label>
          <p style={{ color: "red" }}>{errors.isProgrammer?.message}</p>
        </div>

        <div>
          <label>Hobby:</label>
          <select {...register("hobby")}>
            <option value="programming">Programming</option>
            <option value="swimming">Swimming</option>
          </select>
          <p style={{ color: "red" }}>{errors.hobby?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
