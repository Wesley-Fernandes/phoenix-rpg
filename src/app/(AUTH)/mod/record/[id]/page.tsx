import { redirect } from 'next/navigation';
import database from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

async function getUserPermission(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission || 'USER';
}

type ParamsProp = {
  params: Promise<{ id: string }>;
};
export default async function RecordDetailPage({ params }: ParamsProp) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userPermission = await getUserPermission(userId);
  if (!['MODERATOR', 'ADMIN'].includes(userPermission)) {
    redirect('/');
  }

  const record = await database.record.findUnique({
    where: { id },
  });

  if (!record) {
    redirect('/admin/record-review');
  }

  return (
    <div className="screen overflow-y-auto flex items-start justify-center py-10 px-1">
      <Card className="container">
        <CardHeader>
          <CardTitle>{record.name}</CardTitle>
          <CardDescription>
            {record.race}, {record.age} anos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <strong>Altura:</strong> {record.height}
            </p>
            <p>
              <strong>Peso:</strong> {record.weight}
            </p>
            <p>
              <strong>Gênero:</strong> {record.gender}
            </p>
            <p>
              <strong>Fisionomia:</strong> {record.fisionomy}
            </p>
            <p>
              <strong>História:</strong> {record.history}
            </p>
            <h3 className="text-lg font-semibold mt-4">Poderes:</h3>
            <ul className="list-disc pl-5">
              {record.powers.map((power: any, index: number) => (
                <li key={index}>
                  {power.name}: {power.description}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4">Habilidades:</h3>
            <ul className="list-disc pl-5">
              {record.skills.map((skill: any, index: number) => (
                <li key={index}>
                  {skill.name}: {skill.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link href={`/mod/record/pending`}>
              <Button>Voltar para a lista de revisão</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
