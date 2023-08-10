import React,{useState} from "react"

function CreateChat(){
    const [note,setNote] = useState({
        title: "",
        content: ""
    });

    function update(event){
        const {name, value} = event.target;

        setNote((prevNote)=>{
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    const submitNote = async (event)=>{
        event.preventDefault();
        const response = await fetch(("http://localhost:8080/"),{
            method: "post",
            body: JSON.stringify(note),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);


    }
    return (
        <div>
            <form onSubmit={submitNote}> 
                <input value={note.title} onChange={update} name="title" placeholder="Title" />
                <textarea value={note.content} onChange={update} name="content" placeholder="Take a note..." rows="3" />
                <button onClick={submitNote} >Add</button>
            </form>
        </div>
    )
}

export default CreateChat;