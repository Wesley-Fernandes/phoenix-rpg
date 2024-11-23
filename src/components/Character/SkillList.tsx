import { Button } from '@/components/ui/button';
import { SkillInterface } from '@/types/record';
import { Trash2 } from 'lucide-react';
import { DialogSkill } from '@/components/DialogSkill';

interface SkillsListProps {
  skills: SkillInterface[];
  setSkills: React.Dispatch<React.SetStateAction<SkillInterface[]>>;
}

export function SkillsList({ skills, setSkills }: SkillsListProps) {
  const eraserSkill = (id: string) => {
    setSkills((prev) => prev.filter((i) => i.id != id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-black text-lg">Habilidades {skills.length}/4</h1>
        <DialogSkill setSkills={setSkills} disabled={skills.length >= 4} />
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
  );
}
