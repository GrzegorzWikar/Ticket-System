import axiosClient from "./axiosClient";
import type { Ticket, CreateTicketRequest } from "../types";

interface TicketFilters{
    status?: string;
    priority?: string;
    category?: string;
}

export const getTickets = async (filters: TicketFilters = {}) : Promise<Ticket[]> => {{
    const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v != undefined && v != "")
    );
    const { data } = await axiosClient.get<Ticket[]>("/tickets", { params });
    return data;
}}

export const getTicket = async (id: number) : Promise<Ticket> => {
    const { data } = await axiosClient.get<Ticket>(`/tickets/${id}`);
    return data;
}

export const createTicket = async (requset: CreateTicketRequest) : Promise<Ticket> => {
    const { data } = await axiosClient.post<Ticket>(`/tickets`, requset);
    return data;
}

export const changeStatus = async (id: number, status: number) : Promise<Ticket> => {
    const { data } = await axiosClient.patch<Ticket>(`/tickets/${id}/status`, {status});
    return data;
}