import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon: LucideIcon;
    trend?: "up" | "down" | "neutral";
}

const StatsCard = ({ title, value, subtext, icon: Icon, trend }: StatsCardProps) => {
    return (
        <Card className="shadow-sm border-none">
            <CardContent className="p-6 flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
                    {subtext && (
                        <p className="text-xs text-muted-foreground mt-1">
                            {subtext}
                        </p>
                    )}
                </div>
                <div className={cn(
                    "p-3 rounded-xl",
                    "bg-blue-50 text-blue-600" // Default color, can be dynamic based on prop
                )}>
                    <Icon className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
