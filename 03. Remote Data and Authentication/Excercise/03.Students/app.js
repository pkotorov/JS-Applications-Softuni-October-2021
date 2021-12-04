let tableBody = document.querySelector('tbody');

loadData();

let [firstName, lastName, facultyNumber, grade] = document.querySelectorAll('input');

let submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            'firstName': firstName.value,
            'lastName': lastName.value,
            'facultyNumber': facultyNumber.value,
            'grade': grade.value
        })
    });

    firstName.value = '';
    lastName.value = '';
    facultyNumber.value = '';
    grade.value = '';

    loadData();
})

function loadData() {
    tableBody.innerHTML = '';
    
    fetch('http://localhost:3030/jsonstore/collections/students')
    .then(body => body.json())
    .then(students => {
        console.log(students);

        Object.values(students).forEach(student => {
            let row = document.createElement('tr');

            let firstNameColumn = document.createElement('td');
            firstNameColumn.textContent = student.firstName;
            row.appendChild(firstNameColumn);

            let lastNameColumn = document.createElement('td');
            lastName.textContent = student.lastName;
            row.appendChild(lastNameColumn);

            let facultyNumberColumn = document.createElement('td');
            facultyNumberColumn.textContent = student.facultyNumber;
            row.appendChild(facultyNumberColumn);

            let gradeColumn = document.createElement('td');
            gradeColumn.textContent = student.grade;
            row.appendChild(gradeColumn);

            tableBody.appendChild(row);
        });
    });
}