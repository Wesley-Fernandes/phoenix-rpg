'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PowerInterface, SkillInterface } from '@/types/record';
import Character from '@/components/Character';

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
      skills,
    };
    console.log(data);
    alert('Apenas um teste.');
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
          <Character.BasicInfo
            name={name}
            setName={setName}
            race={race}
            setRace={setRace}
            profileUrl={profileUrl}
            setProfileUrl={setProfileUrl}
          />
          <Character.Description
            fisionomy={fisionomy}
            setFisionomy={setFisionomy}
            history={history}
            setHistory={setHistory}
          />
          <Character.PowersList powers={powers} setPowers={setPowers} />
          <Character.SkillsList skills={skills} setSkills={setSkills} />
          <Character.SubmitButton onClick={upload} />
        </CardContent>
      </Card>
    </main>
  );
}
