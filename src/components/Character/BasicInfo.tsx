import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Info } from 'lucide-react';
import { races } from './races';

interface CharacterBasicInfoProps {
  name: string;
  setName: (name: string) => void;
  race: string;
  setRace: (race: string) => void;
  profileUrl: string;
  setProfileUrl: (url: string) => void;
}

export function BasicInfo({
  name,
  setName,
  race,
  setRace,
  profileUrl,
  setProfileUrl,
}: CharacterBasicInfoProps) {
  return (
    <>
      <Label className="flex flex-col gap-1">
        <span>Nome.::</span>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>
      <Select value={race} onValueChange={setRace}>
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
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          type="url"
          required
          placeholder="exemplo: site.com/img.png"
        />
        <small className="flex items-center gap-1 text-red-600">
          <Info size={12} /> Tamanho preferencial 1080x400
        </small>
      </Label>
    </>
  );
}
