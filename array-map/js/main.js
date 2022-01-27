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

persons.map(person => console.log(person));

const mappedHtml = persons
    .map(
        person => /*html*/ `
	<article>
		<h2>${person.firstName} ${person.lastName}</h2>
		<p>${person.birthDate}</p>
	</article>
`
    )
    .join("");

console.log(mappedHtml);
document.querySelector("#content").innerHTML = mappedHtml;
