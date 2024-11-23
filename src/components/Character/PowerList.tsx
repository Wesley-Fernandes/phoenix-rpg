import { Button } from '@/components/ui/button';
import { PowerInterface } from '@/types/record';
import { Trash2 } from 'lucide-react';
import { DialogPower } from '@/components/DialogPower';

interface PowersListProps {
  powers: PowerInterface[];
  setPowers: React.Dispatch<React.SetStateAction<PowerInterface[]>>;
}

export function PowersList({ powers, setPowers }: PowersListProps) {
  const eraserPower = (id: string) => {
    setPowers((prev) => prev.filter((i) => i.id != id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-black text-lg">Poderes {powers.length}/4</h1>
        <DialogPower setPowers={setPowers} disabled={powers.length >= 4} />
      </div>

      {powers.length < 1 && <small>Você não escolheu poderes.</small>}
      <ul className="flex flex-col gap-2 mt-1">
        {powers.map((power) => (
          <li key={power.id} className="border p-2 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-bold">{power.title}</span>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => eraserPower(power.id)}
              >
                <Trash2 />
              </Button>
            </div>
            <p>{power.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
