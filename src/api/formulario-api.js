const baseUrl = 'http://127.0.0.1:5000';

export const getAllFacultades = () => fetch(`${baseUrl}/facultad/all/`);

export const getAllAmbientes = () => fetch(baseUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

export const getTask = (id) => fetch(`${baseUrl}/${id}/`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

export const createTask = (task) => fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(task),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const deleteTask = (id) => fetch(`${baseUrl}/${id}/`, {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const updateTask = (id, task) => fetch(`${baseUrl}/${id}/`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(task),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});
