const persons = [
    {
        firstName: "Jane",
        lastName: "Doe",
        birthDate: "1992-03-04"
    },
    {
        firstName: "Jens",
        lastName: "Jensen",
        birthDate: "1992-07-04"
    },
    {
        firstName: "Birgitte",
        lastName: "Iversen",
        birthDate: "1990-10-04"
    },
    {
        firstName: "Lykke",
        lastName: "Dahlen",
        birthDate: "1987-06-04"
    },
    {
        firstName: "Kasper",
        lastName: "Topp",
        birthDate: "1989-03-07"
    }
];

const result = persons.map(person => {
    console.log(person);
    // manipulate and return value
});
