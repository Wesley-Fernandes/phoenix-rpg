'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  question1: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question2: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question3: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question4: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question5: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question6: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question7: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question8: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question9: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  question10: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  comment: z.string().min(10, {
    message: 'A resposta deve ter pelo menos 10 caracteres.',
  }),
  aminoLink: z
    .string()
    .url({
      message: 'Insira um URL válido.',
    })
    .min(10, {
      message: 'A resposta deve ter pelo menos 10 caracteres.',
    }),
});

export default function RecruitmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
      question7: '',
      question8: '',
      question9: '',
      question10: '',
      comment: '',
      aminoLink: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const questions: string[] = Object.keys(values)
      .filter((key) => key.startsWith('question'))
      .map((key) => values[key as keyof typeof values]);

    const res = await fetch('/api/public/recruitment', {
      method: 'POST',
      body: JSON.stringify({
        questions,
        comment: values.comment,
        aminoLink: values.aminoLink,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if(res.status === 201){
      toast.success(
        'Obrigado por sua candidatura. Entraremos em contato em breve.'
      );
  
      setTimeout(() => {
        setIsSubmitting(false);
        push('/');
      }, 2000);
    }else{
      toast.error(
        'Houve um erro, tente novamente.'
      );

      setIsSubmitting(false)
    }

  }

  const questions = [
    'Como você descobriu a comunidade PhoenixRPG e o que motivou seu interesse em se tornar um curador?',
    'Você possui experiência anterior como curador/administrador em outras comunidades de RPG ou plataformas semelhantes?',
    'Qual é a sua experiência com RPG e qual estilo de RPG você mais aprecia?',
    'Como você lida com situações de conflito entre membros da comunidade? Pode dar exemplos de como já lidou com isso no passado?',
    'Qual é a sua disponibilidade para contribuir ativamente para a comunidade? Quantas horas por semana você pode dedicar a essa função?',
    'Como você pretende incentivar a participação e a criação de conteúdo original dentro da comunidade PhoenixRPG?',
    'Como você se imagina lidando com novos membros e os ajudando a se integrar à comunidade?',
    'Que ideias você tem para melhorar ou expandir as atividades e recursos oferecidos pela comunidade?',
    'Como você enxerga o papel de um curador em manter um ambiente acolhedor e inclusivo na comunidade?',
    'Em situações onde as regras da comunidade são quebradas, como você abordaria isso e qual seria a sua abordagem para disciplinar os membros?',
  ];

  return (
    <main className="screen p-1 overflow-y-auto">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl uppercase text-center">
            Recrutamento PhoenixRPG
          </CardTitle>
          <CardDescription>
            Por favor, responda às seguintes perguntas para se candidatar a uma
            posição de curador na comunidade PhoenixRPG.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {questions.map((question, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={
                    `question${index + 1}` as keyof z.infer<typeof formSchema>
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{question}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Sua resposta aqui..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Por favor, forneça uma resposta detalhada.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                key="aminoLink"
                control={form.control}
                name={'aminoLink'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link do seu perfil na Phoenix:</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Sua resposta aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Por favor, forneça uma resposta detalhada.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                key="comment"
                control={form.control}
                name={'comment'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descreva o porque deveriamos escolher você:
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Sua resposta aqui..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Por favor, forneça uma resposta detalhada.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
