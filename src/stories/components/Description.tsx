import { Alert } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

function Description({ description }: { description: string }) {
  return (
    <Alert className="max-w-120 min-w-40">
      <CheckCircle2Icon />
      {description}
    </Alert>
  );
}
export default Description;
