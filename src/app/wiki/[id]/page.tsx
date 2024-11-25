import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommentSection from './comment-section';
import database from '@/lib/prisma';

async function getWiki(id: string) {
  const wiki = await database.wiki.findUnique({
    where: { id },
    include: { comments: true },
  });
  if (!wiki) notFound();
  return wiki;
}

type ParamsProp = {
  params: Promise<{ id: string }>;
};
export default async function WikiPage({ params }: ParamsProp) {
  const { id } = await params;
  const wiki = await getWiki(id);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{wiki.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: wiki.content }}
          />
        </CardContent>
      </Card>
      <CommentSection wikiId={wiki.id} comments={wiki.comments} />
    </div>
  );
}
