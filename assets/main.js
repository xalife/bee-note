$(document).ready(function () {

    initScreen();

    function initScreen() {
        if (readNotes) {
            $('.emptyNoteScreen').hide();
            $('.notesListScreen').show();
        }
        else {
            $('.emptyNoteScreen').show();
            $('.notesListScreen').hide();
        }
    }

    function addNote(note) {
        //THIS METHOD ADD A NEW NOTE TO THE OBJECT
        let myNotes = readNotes();
        if (!myNotes) {
            myNotes = [];
        }
        myNotes.push(note);
        writeNotes(myNotes);

    }

    function writeNotes(data) {

        localStorage.setItem('note', JSON.stringify(data));
    }
    function readNotes() {
        return JSON.parse(localStorage.getItem('note'));
    }

    $('.addNote').on('click', function () {

        $('#addNoteForm').submit();
    });


    $('#addNoteForm').on('submit', function (event) {
        //THIS PREVENT THE FORM TO SUBMIT ITSELF
        event.preventDefault();

        let formData = new FormData(this);

        let myNote = {
            note: {
                title: formData.get("title"),
                subtitle: formData.get("subtitle"),
                content: formData.get("content"),
            },
            meta: {
                updatedAt: "",
                createdAt: new Date()
            }
        }

        addNote(myNote);

        //location.reload();


    });
});