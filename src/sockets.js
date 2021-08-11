import { v4 as uuid } from "uuid";

let notes = [];

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo socket conectado:", socket.id);

    socket.emit("server:loadnotes", notes);

    socket.on("client:newnote", (newNote) => {
      const note = { ...newNote, id: uuid() };
      notes.push(note);
      io.emit("server:newnote", note);
    });

    socket.on("client:deletenote", (noteId) => {
      notes = notes.filter(note => note.id !== noteId);
      io.emit("server:loadnotes", notes);
    });

    socket.on("client:getnote", (noteId) => {
      const note = notes.find(note => note.id === noteId);
      socket.emit("server:selectednote", note);
    });

    socket.on("client:updatenote", (updatedNote) => {
      const i = notes.findIndex(note => note.id === updatedNote.id);
      notes[i] = updatedNote;
      io.emit("server:loadnotes", notes);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
}
