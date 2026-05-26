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

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">New Ticket</h2>

                {error && (
                    <div className="mb-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
                )}

                <div className="flex flex-col gap-3">
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 resize-none"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Critical</option>
                    </select>
                    <select
                        value={category}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value={1}>Hardware</option>
                        <option value={2}>Software</option>
                        <option value={3}>Network</option>
                        <option value={4}>Seciurity</option>
                        <option value={5}>Other</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:underline"
                    >
                        Calcen
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};