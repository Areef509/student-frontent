const API_URL = "https://node-student-api.onrender.com/students";

// 🔹 Load all students
async function loadStudents() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("student-list");
    const count = document.getElementById("count");

    list.innerHTML = "";
    count.innerText = data.length;

    data.forEach(s => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${s.name} | ${s.dept} | Age: ${s.age}
        <button 
          onclick="deleteStudent('${s._id}')"
          style="
            float:right;
            background:red;
            color:white;
            border:none;
            padding:4px 8px;
            cursor:pointer;
          ">
          Delete
        </button>
      `;
      list.appendChild(li);
    });

  } catch (err) {
    document.getElementById("student-list").innerText =
      "Backend not reachable";
    console.error(err);
  }
}

// 🔹 Add new student
async function addStudent() {
  const name = document.getElementById("name").value;
  const dept = document.getElementById("dept").value;
  const age = document.getElementById("age").value;

  if (!name || !dept || !age) {
    alert("Please fill all fields");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, dept, age })
    });

    document.getElementById("name").value = "";
    document.getElementById("dept").value = "";
    document.getElementById("age").value = "";

    loadStudents();
  } catch (err) {
    console.error(err);
  }
}

// 🔹 Delete student
async function deleteStudent(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    loadStudents();
  } catch (err) {
    console.error(err);
  }
}

// 🔹 Load data on page open
loadStudents();
