import { useState } from "react";
import { createTicket } from "../../api/ticketsApi";

interface Props{
    onClose: () => void;
    onCreated: () => void;
}

export const CreateTicketModal = ({ onClose, onCreated} : Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(2);
    const [category, setCategory] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!title.trim()){
            setError("Title is required.")
            return;
        }
        setLoading(true);
        setError("");
        try{
            await createTicket({title, description, priority, category});
            onCreated();
        }catch{
            setError("Faild to create ticket.");
        }finally{
            setLoading(false);
        }
    };

    // RETURN DO NAPISANIA!!!!
}