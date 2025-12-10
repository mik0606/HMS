import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

interface ChartCardProps {
    title: string;
    type: "bar" | "line";
    data: any[];
    dataKey1: string;
    dataKey2?: string;
    dataKey3?: string;
    colors?: string[];
}

const ChartCard = ({ title, type, data, dataKey1, dataKey2, dataKey3, colors = ["#2563eb", "#10b981", "#ef4444"] }: ChartCardProps) => {
    return (
        <Card className="shadow-sm border-none h-[350px]">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    {type === "bar" ? (
                        <BarChart data={data} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey={dataKey1} fill={colors[0]} radius={[4, 4, 0, 0]} barSize={12} />
                            {dataKey2 && <Bar dataKey={dataKey2} fill={colors[1]} radius={[4, 4, 0, 0]} barSize={12} />}
                            {dataKey3 && <Bar dataKey={dataKey3} fill={colors[2]} radius={[4, 4, 0, 0]} barSize={12} />}
                        </BarChart>
                    ) : (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey={dataKey1} stroke={colors[0]} strokeWidth={3} dot={{ r: 4, fill: colors[0], strokeWidth: 0 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ChartCard;
