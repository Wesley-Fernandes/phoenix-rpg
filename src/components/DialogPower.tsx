import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PowerInterface } from '@/types/record';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Textarea } from './ui/textarea';
import { Plus } from 'lucide-react';
interface Props {
  setPowers: Dispatch<SetStateAction<PowerInterface[]>>;
  disabled: boolean;
}
export function DialogPower({ setPowers, disabled }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const add = () => {
    if (!title || !description) {
      return;
    }

    setPowers((prev) => [...prev, { id: uuid(), title, description }]);
    closeRef.current?.click();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} size="icon" variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criando novo poder</DialogTitle>
          <DialogDescription>
            Para adicionar um novo poder, preencha os campos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose ref={closeRef} />
          <Button onClick={add}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
