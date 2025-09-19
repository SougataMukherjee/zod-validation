import { useEffect, useState } from "react";
import { UsersArraySchema, type User } from "../types/userSchema";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        // Validate with Zod:
        const parsed = UsersArraySchema.parse(data);
        setUsers(parsed);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        if (err.errors) {
          setError(JSON.stringify(err.errors, null, 2));
        } else {
          setError(err.message);
        }
      }
    }
    fetchUsers();
  }, []);

  if (error) {
    return <pre style={{ color: "red" }}>{error}</pre>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}) - {u.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
