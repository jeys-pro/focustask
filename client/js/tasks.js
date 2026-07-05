console.log("tasks.js chargé");

async function loadTasks() {
  const tasks = await request("/tasks");

  const container = document.getElementById("tasks");
  container.innerHTML = "";

  tasks.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("task");

    div.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.description || ""}</p>
      <p>Priority: ${t.priority}</p>
      <p>Status: ${t.status}</p>

      <button onclick="startTask(${t.id}, \`${t.title}\`)">
        Start
      </button>

      <button onclick="deleteTask(${t.id})">
        Delete
      </button>
    `;

    container.appendChild(div);
  });
}

async function createTask() {
  console.log("SESSION CHECK");

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  if (!title) {
    alert("Titre obligatoire");
    return;
  }

  const res = await request("/tasks", "POST", {
    title,
    description,
    deadline,
    type: "task",
    priority,
    status: "todo",
    categoryId: null
  });

  console.log("SERVER RESPONSE:", res);

  loadTasks();
}

/* =========================
   RELANCE TDAH SYSTEM
========================= */

let activeTask = null;
let interval = null;

/**
 * Activer notifications navigateur
 */
async function enableNotifications() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    alert("Notifications activées !");
  } else {
    alert("Notifications refusées");
  }
}

/**
 * Démarrer une tâche (focus mode)
 */
function startTask(id, title) {
  activeTask = { id, title };

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    notifyUser();
  }, 15000);
}

/**
 * Notification utilisateur
 */
function notifyUser() {
  if (!activeTask) return;

  if (Notification.permission === "granted") {
    new Notification("FocusTask", {
      body: `Es-tu toujours sur : ${activeTask.title} ?`
    });
  }

  showPopup();
}

/**
 * Popup interaction
 */
function showPopup() {
  const stillWorking = confirm(
    `Tu es toujours sur : ${activeTask.title} ?\n\nOK = Oui / Annuler = Terminé`
  );

  if (!stillWorking) {
    finishTask(activeTask.id);
  }
}

/**
 * Terminer tâche
 */
async function finishTask(id) {
  await request(`/tasks/${id}`, "PUT", {
    status: "done"
  });

  activeTask = null;
  clearInterval(interval);

  loadTasks();
}

loadTasks();