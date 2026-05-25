interface Props{
    value: string;
}

const statusColors: Record<string, string> ={
    Open: "bg-blue-100 text-blue-800",
    InProgress: "bg yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-greeen-800",
    Closed: "bg-grey-100 text-grey-800"
};

const priorityColors: Record<string, string> ={
    Low: "bg-gray-100 text-gray-600",
    Mdium: "bg-blue-200 text-blue-700",
    Hight: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700"
};

export const StatusBage = ({ value }: Props) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] ?? "bg-grey-100"}`}>
        {value}
    </span>
);

export const PrirorityBage = ({ value }: Props) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[value]} ?? bg-gray-100`}>
        {value}
    </span>
);