document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');

    burger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
});

const students = [];

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const names = document.getElementById('names').value.split('\n').map(name => name.trim()).filter(name => name);
    const gender = document.getElementById('gender').value;

    names.forEach(name => {
        students.push({ name, gender });
    });

    document.getElementById('registrationForm').reset();
    displayRegisteredStudents();
});

function displayRegisteredStudents() {
    const maleList = document.getElementById('maleList');
    const femaleList = document.getElementById('femaleList');
    
    maleList.innerHTML = '';
    femaleList.innerHTML = '';
    
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student.name;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            removeStudent(index);
        };

        li.appendChild(removeBtn);
        
        if (student.gender === 'male') {
            maleList.appendChild(li);
        } else {
            femaleList.appendChild(li);
        }
    });
}

function removeStudent(index) {
    students.splice(index, 1);
    displayRegisteredStudents();
}

document.getElementById('customGroupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const numGroups = parseInt(document.getElementById('numGroups').value);
    createCustomGroups(numGroups);
});

function startGrouping() {
    window.location.hash = '#register';
}

function groupByGender() {
    const males = students.filter(student => student.gender === 'male');
    const females = students.filter(student => student.gender === 'female');
    
    displayGroups({ males, females });
}

function groupRandomly() {
    const shuffled = students.sort(() => 0.5 - Math.random());
    const midIndex = Math.ceil(shuffled.length / 2);
    const group1 = shuffled.slice(0, midIndex);
    const group2 = shuffled.slice(midIndex);
    
    displayGroups({ group1, group2 });
}

function createCustomGroups(numGroups) {
    const shuffled = students.sort(() => 0.5 - Math.random());
    const groups = {};
    
    for (let i = 0; i < numGroups; i++) {
        groups[`Group ${i + 1}`] = [];
    }
    
    shuffled.forEach((student, index) => {
        const groupIndex = index % numGroups;
        groups[`Group ${groupIndex + 1}`].push(student);
    });
    
    displayGroups(groups);
}

function displayGroups(groups) {
    const groupResults = document.getElementById('groupResults');
    groupResults.innerHTML = '';
    
    Object.keys(groups).forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.innerHTML = `<h3>${group}</h3><ul>${groups[group].map(student => `<li>${student.name}</li>`).join('')}</ul>`;
        groupResults.appendChild(groupDiv);
    });
}
