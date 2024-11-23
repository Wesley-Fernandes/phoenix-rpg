import { Button } from '@/components/ui/button';

interface FormSubmitButtonProps {
  onClick: () => void;
}

export function SubmitButton({ onClick }: FormSubmitButtonProps) {
  return (
    <Button onClick={onClick} className="mt-4">
      Continuar
    </Button>
  );
}
