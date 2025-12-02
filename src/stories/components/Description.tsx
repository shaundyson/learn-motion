import { Alert } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

function Description({ description }: { description: string }) {
  return (
    <Alert className="min-w-40 max-w-120">
      <CheckCircle2Icon />
      {description}
    </Alert>
  );
}
export default Description;
