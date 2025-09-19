import { z } from "zod";


const userSchema = z.object({
    firstName: z.string(),
    email: z.string().email(),
    profileUrl: z.string().url().nullish(),
    age: z.number().min(5).gt(1),
    birthday: z.date(),
    friends: z.array(z.string()).max(4).optional(),
    settings: z.object({
        isSubscribed: z.boolean()
    })
});


const validUser = {
    firstName: 'sam',
    email: 'sam@email.com',
    profileUrl: 'https://google.com',
    age: 30,
    birthday: new Date(),
    friends: ["mik", "jake", "paul"],
    settings: {
        isSubscribed: false
    }
};

const invalidUser = {
    firstName: 123,
    email: 'sam@email',
    age: 2,
    birthday: 'not-a-date',
    friends: ["mik", "jake", "paul", "sarah", "tom"],
    settings: {
        isSubscribed: 'no'
    }
};


console.log(userSchema.safeParse(validUser));
console.log(userSchema.safeParse(invalidUser));
