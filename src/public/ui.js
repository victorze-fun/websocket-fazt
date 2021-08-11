const noteList = document.querySelector("#notes");

let savedId = "";

const noteUI = note => {
  console.log(note);
  const div = document.createElement("div");

  div.innerHTML += `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between">
        <h1 class="h3 card-title">${note.title}</h1>
        <div>
          <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
          <button class="btn btn-secondary update" data-id="${note.id}"">update</button>
        </div>
      </div>
      <p>${note.description}</p>
    </div>
  `

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => {
    deleteNote(btnDelete.dataset.id);
  });

  btnUpdate.addEventListener("click", () => {
    getNote(btnDelete.dataset.id);
  });

  return div;
}

const appendNote = note => {
  noteList.append(noteUI(note));
}

const renderNotes = notes => {
  savedId = "";
  noteList.textContent = "";

  notes.forEach(note => {
    noteList.append(noteUI(note));
  });
};
