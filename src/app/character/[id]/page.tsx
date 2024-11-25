import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type PageProps = {
  params: Promise<{ id: string }>;
};
async function getCharacter(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/records/${id}`,
    { method: 'GET', cache: 'no-store' }
  );
  const data = await res.json();
  return data;
}

export default async function PublicCharacterPage({ params }: PageProps) {
  const { id } = await params;
  let character;
  try {
    character = await getCharacter(id);
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <main className="screen mx-auto py-10 overflow-y-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl">{character.name}</CardTitle>
              <CardDescription>{character.race}</CardDescription>
            </div>
            {character.approved === 'PENDING' && (
              <Badge className="uppercase bg-yellow-300 hover:bg-yellow-600">
                Pendente
              </Badge>
            )}
            {character.approved === 'APPROVED' && (
              <Badge className="uppercase bg-green-600 hover:bg-green-800">
                Aprovado
              </Badge>
            )}
            {character.approved === 'REJECTED' && (
              <Badge className="uppercase bg-red-500 hover:bg-red-800">
                Rejeitado
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={character.photo || '/placeholder.svg?height=300&width=300'}
                alt={character.name}
                width={300}
                height={300}
                className="rounded-lg object-cover object-top w-full h-[300px]"
              />
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Idade:</strong> {character.age}
                </p>
                <p>
                  <strong>Altura:</strong> {character.height}
                </p>
                <p>
                  <strong>Peso:</strong> {character.weight}
                </p>
                <p>
                  <strong>Gênero:</strong> {character.gender}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <section>
                <h3 className="text-xl font-semibold mb-2">Fisionomia</h3>
                <p>{character.fisionomy}</p>
              </section>
              <Separator />
              <section>
                <h3 className="text-xl font-semibold mb-2">História</h3>
                <p>{character.history}</p>
              </section>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">Poderes</h3>
              <ul className="list-disc list-inside space-y-2">
                {character.powers.map(
                  (
                    power: { name: string; description: string },
                    index: number
                  ) => (
                    <li key={index}>
                      <strong>{power.name}:</strong> {power.description}
                    </li>
                  )
                )}
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-semibold mb-2">Habilidades</h3>
              <ul className="list-disc list-inside space-y-2">
                {character.skills.map(
                  (
                    skill: { name: string; description: string },
                    index: number
                  ) => (
                    <li key={index}>
                      <strong>{skill.name}:</strong> {skill.description}
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>
          <div className="mt-6">
            <a
              href={character.aminoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Ver no Amino
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
