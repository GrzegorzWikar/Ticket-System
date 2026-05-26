export enum TicketStatus{
    Open = "Open",
    InProgres = "InProgres",
    Resolved = "Resolved",
    Closed = "Closed"
}

export enum TicketPriority{
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Critical = "Critical"
}

export enum TicketCategory{
    Hardware = "Hardware",
    Software = "Software",
    Network = "Network",
    Seciurity = "Seciurity",
    Other = "Other"
}

export interface TicketHistoryEntry{
    fieldChanged: string;
    oldValue: string;
    newValue: string;
    changedByName: string;
    changedAt: string;
}

export interface Ticket{
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    createdByUserId: number,
    createdByName: string,
    assignedToUserId: number | null,
    assignedToName: string | null,
    createdAt: string,
    resolvedAt: string | null,
    history: TicketHistoryEntry[];
}

export interface AuthResponse{
    token: string;
    email: string;
    firstName: string;
    role: string;
    expiresAt: string;
}

export interface CreateTicketRequest{
    title: string;
    description: string,
    priority: number;
    category: number;
}