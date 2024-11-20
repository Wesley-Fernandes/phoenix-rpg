'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Info, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { races } from './races';
import { PowerInterface, SkillInterface } from '@/types/record';
import { DialogPower } from '@/components/DialogPower';
import { DialogSkill } from '@/components/DialogSkill';

export default function Page() {
  const [name, setName] = useState<string>('');
  const [race, setRace] = useState<string>('');
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [fisionomy, setFisionomy] = useState<string>('');
  const [history, setHistory] = useState<string>('');
  const [powers, setPowers] = useState<PowerInterface[]>([]);
  const [skills, setSkills] = useState<SkillInterface[]>([]);

  const upload = () => {
    const data = {
      name,
      race,
      profileUrl,
      fisionomy,
      history,
      powers,
    };
    console.log(data);
    alert('Apenas um teste.');
  };

  const eraserPower = (id: string) => {
    setPowers((prev) => prev.filter((i) => i.id != id));
  };

  const eraserSkill = (id: string) => {
    setSkills((prev) => prev.filter((i) => i.id != id));
  };

  return (
    <main className="screen flex justify-center p-1 overflow-y-auto">
      <Card className="w-96 h-fit">
        <CardHeader>
          <CardTitle>Criar ficha</CardTitle>
          <CardDescription>
            Bem-vindo à página de criação de fichas! Aqui é onde você dará vida
            ao seu personagem para o RPG do Amino.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Label className="flex flex-col gap-1">
            <span>Nome.::</span>
            <Input name="name" onChange={(e) => setName(e.target.value)} />
          </Label>
          <Select onValueChange={setRace}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Raças" />
            </SelectTrigger>
            <SelectContent>
              {races.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className="flex flex-col gap-1">
            <span>Imagem de perfil.::</span>
            <Input
              onChange={(e) => setProfileUrl(e.target.value)}
              type="url"
              required
              placeholder="exemplo: site.com/img.png"
            />
            <small className="flex items-center gap-1 text-red-600">
              <Info size={12} /> Tamanho preferencial 1080x400
            </small>
          </Label>
          <Label className="flex flex-col gap-1">
            <span>Fisionomia.::</span>
            <Textarea
              onChange={(e) => setFisionomy(e.target.value)}
              className="resize-none"
            />
          </Label>
          <Label className="flex flex-col gap-1">
            <span>Historia.::</span>
            <Textarea
              onChange={(e) => setHistory(e.target.value)}
              className="resize-none"
            />
          </Label>
          <Label className="flex flex-col gap-1">
            <span>Historia.::</span>
            <Textarea
              onChange={(e) => setHistory(e.target.value)}
              className="resize-none"
            />
          </Label>
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-black text-lg">Poderes {powers.length}/4</h1>
              <DialogPower
                setPowers={setPowers}
                disabled={powers.length >= 4}
              />
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
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-black text-lg">
                Habilidades {skills.length}/4
              </h1>
              <DialogSkill
                setSkills={setSkills}
                disabled={powers.length >= 4}
              />
            </div>
            {skills.length < 1 && <small>Você não escolheu habilidades.</small>}
            <ul className="flex flex-col gap-2 mt-1">
              {skills.map((skill) => (
                <li key={skill.id} className="border p-2 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{skill.title}</span>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => eraserSkill(skill.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  <p>{skill.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={upload} className="mt-4">
            Continuar
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
