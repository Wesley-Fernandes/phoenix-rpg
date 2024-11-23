import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CharacterDescriptionProps {
  fisionomy: string;
  setFisionomy: (fisionomy: string) => void;
  history: string;
  setHistory: (history: string) => void;
}

export function Description({
  fisionomy,
  setFisionomy,
  history,
  setHistory,
}: CharacterDescriptionProps) {
  return (
    <>
      <Label className="flex flex-col gap-1">
        <span>Fisionomia.::</span>
        <Textarea
          value={fisionomy}
          onChange={(e) => setFisionomy(e.target.value)}
          className="resize-none"
        />
      </Label>
      <Label className="flex flex-col gap-1">
        <span>Historia.::</span>
        <Textarea
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          className="resize-none"
        />
      </Label>
    </>
  );
}
