export const search = $state(
    {value: ""}
)

export const studentsA = $state([
    {name: "Ronald", pets: []},
    {name: "Jareth", pets: [{name: "Bob", animal: "Turtle"}]},
    {name: "Gabe", pets: [{name: "Duck", animal: "Duck"}, {name: "Belinda", animal: "Octopus"}]},
    {name: "John", pets: [{name: "Hank", animal: "Cat"}, {name: "Jeff", animal: "Tortoise"}, {name: "Terry", animal: "Clownfish"}, {name: "Terence", animal: "Jellyfish"}]}
])

export const studentsB = $state([
    {name: "Omelia", pets: []},
    {name: "Elizabeth", pets: [{name: "Bill", animal: "Cat"}]},
    {name: "Jerry", pets: [{name: "Jerry Jr.", animal: "Kangaroo"}]}
])

export function swapStudent(student) {
    if (studentsA.includes(student)) {studentsB.push(student); studentsA.splice(studentsA.indexOf(student), 1);}
    else {studentsA.push(student); studentsB.splice(studentsB.indexOf(student), 1);}
}