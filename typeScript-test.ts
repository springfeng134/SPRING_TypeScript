export type User = unknown
export const users: unknown[] = [
  {
    name: "Max Mustermann",
    age:25,
    occupation: "sweep"
  },
  {
    name: "kate",
    age: 23,
    occupation:'astronaut'
  }
]

export function logPerson(user:unknown) {
  console.log(`-${user.name},${user.age}`);
}
console.log("User:")
user.forEach(logPerson)