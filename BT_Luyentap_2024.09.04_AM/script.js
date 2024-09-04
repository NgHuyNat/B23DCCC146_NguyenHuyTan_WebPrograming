class Student {
    constructor(masinhvien, name, gioitinh, ngaysinh, quequan) {
        this.masinhvien = masinhvien;
        this.name = name;
        this.gioitinh = gioitinh;
        this.ngaysinh = ngaysinh;
        this.quequan = quequan;
    }
}

let editingIndex = null; 

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    
    const student = new Student(
        document.getElementById('masinhvien').value,
        document.getElementById('name').value,
        document.getElementById('gioitinh').value,
        document.getElementById('ngaysinh').value,
        document.getElementById('quequan').value
    );

    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (editingIndex === null) {
        students.push(student);
    } else {
        students[editingIndex] = student; 
        editingIndex = null;
    }
    
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    
    document.getElementById('student-form').reset(); 
});

function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentList = document.getElementById('student-list');
    
    studentList.innerHTML = ''; 

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.masinhvien}</td>
            <td>${student.name}</td>
            <td>${student.gioitinh}</td>
            <td>${student.ngaysinh}</td>
            <td>${student.quequan}</td>
            <td>
                <button onclick="editStudent(${index})">Sửa</button>
                <button onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        
        studentList.appendChild(row);
    });
}


displayStudents();

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('masinhvien').value = student.masinhvien;
    document.getElementById('name').value = student.name;
    document.getElementById('gioitinh').value = student.gioitinh;
    document.getElementById('ngaysinh').value = student.ngaysinh;
    document.getElementById('quequan').value = student.quequan;

    editingIndex = index;
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1); 
    localStorage.setItem('students', JSON.stringify(students)); 
    displayStudents(); 
}

document.getElementById('delete-all').addEventListener('click', function() {
    localStorage.clear();
    displayStudents(); 
});
