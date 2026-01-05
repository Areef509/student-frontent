const API_URL = "https://node-student-api.onrender.com/students";

async function loadStudents() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById("student-list");
    list.innerHTML = "";

    data.forEach(s => {
      const li = document.createElement("li");
      li.textContent = `${s.name} (${s.dept}) - ${s.place}`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("student-list").innerText =
      "Backend not reachable";
    console.error(err);
  }
}

loadStudents();
