import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

function Description({
  description,
  notes,
}: {
  description: string;
  notes?: string;
}) {
  return (
    <Alert className="max-w-120 min-w-40">
      <CheckCircle2Icon />
      <AlertTitle>{description}</AlertTitle>
      {notes ? (
        <AlertDescription className="w-full">{notes}</AlertDescription>
      ) : null}
    </Alert>
  );
}
export default Description;
