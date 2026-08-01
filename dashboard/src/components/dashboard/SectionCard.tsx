import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <Card>
      {title && (
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
)}

      <CardContent>{children}</CardContent>
    </Card>
  );
}