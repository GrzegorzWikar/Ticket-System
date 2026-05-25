import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../api/ticketsApi";
import { Ticket } from "../types";
import { StatusBage, PrirorityBage } from "../components/shared/Badge";
import { Navbar } from "../components/shared/Navbar";
import { CreateTicketModal } from "../components/tickets/CreateTicketModal";

export const TicketPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const navigate = useNavigate();

    const fetchTickets = async () => {
        setLoading(true);
        try{
            const data = await getTickets({
                status: statusFilter || undefined,
                priority: priorityFilter || undefined,
            });
            setTickets(data);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [statusFilter, priorityFilter]);

    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                        + New Ticket
                    </button>
                </div>

                <div className="flex gap-3 mb-6">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value="">All statuses</option>
                        <option value="Open">Open</option>
                        <option value="InProgress">In Progoress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <select 
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    >
                        <option value="">All priorites</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medim</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ): tickets.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No tickets found</div>
                ):(
                    <div className="flex flex-col gap-3">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                onClick={() => navigate(`/tickets/${ticket.id}`)}
                                className="bg-white rounded-xl border-gray-200 p-4 cursor-pointer hover:shadow-md transcription-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">#{ticket.id} - {ticket.category}</p>
                                        <h3 className="font-medium text-gray-800">{ticket.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {ticket.assignedToName 
                                                ? `Assigned to: ${ticket.assignedToName}`
                                                : "Unassigned"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <StatusBage value={ticket.status}/>
                                        <PrirorityBage value={ticket.priority}/>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-3">
                                    Created by {ticket.createdByName} - {new Date(ticket.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showCreate && (
                <CreateTicketModal
                    OnClose={() => setShowCreate(false)}
                    OnCreated={() => {
                        setShowCreate(false);
                        fetchTickets();
                    }}
                />
            )}
        </div>
    )
}