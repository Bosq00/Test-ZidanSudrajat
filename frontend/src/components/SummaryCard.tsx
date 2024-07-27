import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { IconType } from "react-icons";

// Define props interface
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: IconType; // Use IconType from react-icons
  color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: IconComponent,
  color,
}) => {
  return (
    <Card className="min-w-[275px] shadow-md">
      <CardContent className={`flex items-center gap-4 ${color || "bg-white"}`}>
        <IconComponent className="text-3xl text-gray-700" />
        <div>
          <Typography variant="h6" component="div" className="font-semibold">
            {title}
          </Typography>
          <Typography variant="h4" component="div" className="font-bold">
            {value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
