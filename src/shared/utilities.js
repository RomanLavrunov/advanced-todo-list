export function idGenerator() {
  return Math.random().toString(36).slice(2);
}

export function userIdRandomizer() {
  return Math.floor(Math.random() * 10) + 1;
}

export function saveTodos(arrayOfTodos) {
  localStorage.setItem("Todos", JSON.stringify(arrayOfTodos));
}

export function loadTodos() {
  const taskString = localStorage.getItem("Todos");
  if (typeof taskString === "string") {
    const tasks = JSON.parse(taskString);
    return tasks || [];
  }
  return [];
}
