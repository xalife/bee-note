$(document).ready(function () {

    initScreen();

    function initScreen() {
        if (readNotes) {
            $('.emptyNoteScreen').hide();
            $('.notesListScreen').show();
            renderNotes();
        }
        else {
            $('.emptyNoteScreen').show();
            $('.notesListScreen').hide();


        }
    }

    function singleNoteCard(myNote, index) {
        return '<div  class="my-note-card rounded shadow-sm p-3 d-flex flex-column">' +
            '<div class="w-100">' +
            '<h3>' + myNote.note.title + '</h3>' +
            '</div>' +
            '<div class="w-100 flex-grow-1">' +
            '<p>' + myNote.note.content + '</p>' +
            '</div>' +
            '<div>' +
            '<span>' + myNote.meta.createdAt + '</span> ' +
            ' <div class="btn-group">' +
            '<button type="button" class="rounded btn " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '<i class="fa-solid fa-ellipsis"></i>' +
            '</button>' +
            '<div class="dropdown-menu">' +
            '<a data-index="' + index + '" class="dropdown-item editNote" href="javascript:void(0)">Edit</a>' +
            ' <a data-index="' + index + '" class="dropdown-item deleteNote" href="javascript:void(0)">Delete</a>' +
            ' </div>' +
            '</div >' +
            '</div>' +
            '</div>';
    }

    $(document).on('click', '.deleteNote', function () {
        let noteIndex = $(this).data('index');
        console.log(noteIndex);

        removeNote(noteIndex);

    });


    function renderNotes() {


        $('.my-note-card').each(function () {

            if (!$(this).hasClass('buttonCard')) {
                $(this).remove();
            }
        })

        var myNotes = readNotes();


        for (let index = 0; index < myNotes.length; index++) {
            $('.notesListScreen').append(singleNoteCard(myNotes[index], index))
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
    function removeNote(index) {
        //THIS METHOD ADD A NEW NOTE TO THE OBJECT
        let myNotes = readNotes();
        if (!myNotes) {
            renderNotes();
            return;
        }
        if (myNotes.length == 1) {
            localStorage.clear();
            renderNotes();
            return;
        }
        myNotes.splice(index, 1);
        writeNotes(myNotes);

        console.log(myNotes);
        renderNotes();

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
        renderNotes();
        $('#addNewNoteModal').modal("hide");

        //location.reload();


    });
});