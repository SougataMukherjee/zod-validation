import { z } from "zod";


const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});


export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string().min(2, "Username must be at least 2 chars").max(20),
  email: z.string().email("Please enter valid email"),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});


export const UsersArraySchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
