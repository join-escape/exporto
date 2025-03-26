import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ToolCardProps {
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

export default function ToolCard({
  title,
  description,
  children,
}: ToolCardProps) {
  return (
    <Card className="h-full shadow-sm bg-background">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">{children}</CardContent>
    </Card>
  );
}
