'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { toast } from 'sonner';

const powerSkillSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres.',
  }),
  race: z.string().min(2, {
    message: 'Raça deve ter pelo menos 2 caracteres.',
  }),
  aminoLink: z.string().url({
    message: 'Link do Amino inválido.',
  }),
  photo: z.string().url({
    message: 'Link da foto inválido.',
  }),
  age: z.number().int().positive({
    message: 'Idade deve ser um número positivo.',
  }),
  height: z.string(),
  weight: z.string(),
  gender: z.string(),
  fisionomy: z.string(),
  history: z.string(),
  powers: z.array(powerSkillSchema),
  skills: z.array(powerSkillSchema),
});

type FormValues = z.infer<typeof formSchema>;

interface RecordFormProps {
  initialData?: Prisma.RecordGetPayload<{}>;
}

export default function RecordForm({ initialData }: RecordFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          powers: Array.isArray(initialData.powers)
            ? initialData.powers.map((p: JsonValue) => ({
                name:
                  typeof p === 'object' && p !== null && 'name' in p
                    ? String(p.name)
                    : '',
                description:
                  typeof p === 'object' && p !== null && 'description' in p
                    ? String(p.description)
                    : '',
              }))
            : [],
          skills: Array.isArray(initialData.skills)
            ? initialData.skills.map((s: JsonValue) => ({
                name:
                  typeof s === 'object' && s !== null && 'name' in s
                    ? String(s.name)
                    : '',
                description:
                  typeof s === 'object' && s !== null && 'description' in s
                    ? String(s.description)
                    : '',
              }))
            : [],
        }
      : {
          name: '',
          race: '',
          aminoLink: '',
          photo: '',
          age: 0,
          height: '',
          weight: '',
          gender: '',
          fisionomy: '',
          history: '',
          powers: [],
          skills: [],
        },
  });

  const {
    fields: powerFields,
    append: appendPower,
    remove: removePower,
  } = useFieldArray({
    control: form.control,
    name: 'powers',
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const url = initialData
        ? `/api/records/${initialData.id}`
        : '/api/records';
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar a ficha');
      }

      const savedRecord = await response.json();

      if (initialData && initialData.approved && !savedRecord.approved) {
        toast(
          'Sua ficha foi atualizada, mas perdeu o status de aprovada devido a alterações em poderes ou habilidades.'
        );
      } else {
        toast('Sua ficha foi salva com sucesso.');
      }

      router.push('/user/record');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast('Ocorreu um erro ao salvar a ficha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raça</FormLabel>
              <FormControl>
                <Input placeholder="Raça do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aminoLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do Amino</FormLabel>
              <FormControl>
                <Input placeholder="http://aminoapp.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <Input placeholder="URL da foto do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura</FormLabel>
              <FormControl>
                <Input placeholder="Altura do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso</FormLabel>
              <FormControl>
                <Input placeholder="Peso do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <Input placeholder="Gênero do personagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fisionomy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fisionomia</FormLabel>
              <FormControl>
                <Textarea
                  className="h-40 resize-none"
                  placeholder="Descrição física do personagem"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>História</FormLabel>
              <FormControl>
                <Textarea
                  className="h-40 resize-none"
                  placeholder="História do personagem"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">Poderes</h3>
          {powerFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col justify-start px-4 items-center mb-6"
            >
              <div className="flex items-center w-full gap-4 mb-2">
                <FormField
                  control={form.control}
                  name={`powers.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Nome do poder" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removePower(index)}
                >
                  Remover
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`powers.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Textarea
                        className="h-40 w-full resize-none"
                        placeholder="Descrição do poder"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendPower({ name: '', description: '' })}
          >
            Adicionar Poder
          </Button>
        </div>

        <div>
          <h3 className="text-lg w-full font-semibold mb-2">Habilidades</h3>
          {skillFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col items-center mb-6 px-4"
            >
              <div className="flex w-full gap-4 mb-2">
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Nome da habilidade" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSkill(index)}
                >
                  Remover
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`skills.${index}.description`}
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Descrição da habilidade"
                        className="w-full h-40 resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendSkill({ name: '', description: '' })}
          >
            Adicionar Habilidade
          </Button>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}{' '}
          Ficha
        </Button>
      </form>
    </Form>
  );
}
