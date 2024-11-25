'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@prisma/client';
import { toast } from 'sonner';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty.'),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentSectionProps {
  wikiId: string;
  comments: Comment[];
}

export default function CommentSection({
  wikiId,
  comments: initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const { userId, isSignedIn } = useAuth();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: CommentFormValues) {
    if (!isSignedIn) {
      toast('Você precisa estar logado pra comentar.');
      return;
    }

    try {
      const response = await fetch('/api/public/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: values.content,
          wikiId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      form.reset();
      toast.success('Comentario enviando.');
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Erro ao enviar comentario.');
    }
  }

  return (
    <main>
      <div className="mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        {isSignedIn && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mb-8"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adicionar comentario</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none h-40"
                        placeholder="Escreva sem comentario aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Comentar</Button>
            </form>
          </Form>
        )}
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-4 rounded">
            <p className="font-semibold text-lg text-blue-500">
              {comment.authorName}
            </p>
            <p className="text-sm opacity-85">{comment.content}</p>
            <p className="text-sm mt-2 opacity-40">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
