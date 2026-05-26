import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicket, changeStatus } from "../api/ticketsApi";
import type { Ticket, TicketStatus } from "../types";
import { StatusBage, PrirorityBage } from "../components/shared/Badge";
import { Navbar } from "../components/shared/Navbar";
import { TicketHistoryList } from "../components/tickets/TicketHistoryList";

export const TicketDetailPage = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);

    const fetchTicket = async () => {
        try{
            const data = await getTicket(Number(id));
            setTicket(data);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, [id])

    const handleStatusChange = async (newStatus: number) => {
        if(!ticket) return;
        setStatusLoading(true);
        try{
            const updated = await changeStatus(ticket.id,newStatus);
            setTicket(updated);
        }finally{
            setStatusLoading(false);
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="text-center py-20 text-gray400">Loading...</div>
        </div>
    );


    if (!ticket) return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="text-center py-20 text-gray-400">Ticket not found.</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl mx-auto p-6">
                
                <button
                    onClick={() => navigate("/tickets")}
                    className="text-sm text-blue-600 hover:underline mb-4 block"
                >
                    Back to tickets
                </button>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">
                                #{ticket.id} - {ticket.category}
                            </p>
                            <h1 className="text-xl font-bold text-gray-800">{ticket.title}</h1>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <StatusBage value={ticket.status} />
                            <PrirorityBage value={ticket.priority}/>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {ticket.description || "No Description."}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
                        <div>   
                            <span className="text-gray-400">Created by</span>
                            <p className="font-medium text-gray-700">{ticket.createdByName}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">Assigned to</span>
                            <p className="font-medium text-gray-700">
                                {ticket.assignedToName ?? "Unassigned"}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-400">Created at</span>
                            <p className="font-medim text-gray-700">
                                {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                        </div>
                        {ticket.resolvedAt &&(
                        <div>
                            <span className="text-gray-400">Resolved at</span>
                            <p className="font-medium text-gray-700">
                                {new Date(ticket.resolvedAt).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                <h2 className="text-sm font-semibold texy-gray-700 mb-3">Change Status</h2>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(statusLabels).map(([label, value]) => (
                        <button
                            key={value}
                            onClick={() => handleStatusChange(value)}
                            disabled={statusLoading || ticket.status === label}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors 
                                ${ticket.status === label
                                    ?"bg-blue-600 text-white"
                                    :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                                } disabled:opacity-50`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <TicketHistoryList history={ticket.history} />

        </div>
        </div>
    )
}

const statusLabels: Record<string, number> ={
    Open:1,
    InProgress:2,
    Resolved:3,
    Closed:4,
};