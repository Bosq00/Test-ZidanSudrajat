import { Card, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <Paper elevation={0} square className="rounded-lg">
      <div className="p-2 flex mb-2 bg-gray-700 rounded-xl">
        <Card className="inline-block p-5">{icon}</Card>
        <div className="p-2 text-white">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
