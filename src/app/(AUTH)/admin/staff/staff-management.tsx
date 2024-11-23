'use client';

import { useState } from 'react';
import { Staff, PERMISSION_LEVEL } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome deve ter pelo menos 2 caracteres.',
  }),
  userId: z.string().min(1, {
    message: 'ID do usuário é obrigatório.',
  }),
  permission: z.enum(['ADMIN', 'MODERATOR', 'USER']),
});

interface StaffManagementProps {
  initialStaffMembers: Staff[];
}

export default function StaffManagement({
  initialStaffMembers,
}: StaffManagementProps) {
  const [staffMembers, setStaffMembers] =
    useState<Staff[]>(initialStaffMembers);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      userId: '',
      permission: 'MODERATOR',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (editingStaff) {
        const response = await fetch('/api/staff', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingStaff.id, ...values }),
        });
        if (!response.ok) throw new Error('Failed to update staff member');
        const updatedStaff = await response.json();
        setStaffMembers(
          staffMembers.map((staff) =>
            staff.id === updatedStaff.id ? updatedStaff : staff
          )
        );
        setEditingStaff(null);
        toast({ title: 'Staff atualizado com sucesso' });
      } else {
        const response = await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error('Failed to create staff member');
        const newStaff = await response.json();
        setStaffMembers([...staffMembers, newStaff]);
        toast({ title: 'Staff criado com sucesso' });
      }
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ title: 'Erro ao salvar staff', variant: 'destructive' });
    }
  }

  async function deleteStaff(id: string) {
    try {
      const response = await fetch('/api/staff', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete staff member');
      setStaffMembers(staffMembers.filter((staff) => staff.id !== id));
      toast({ title: 'Staff removido com sucesso' });
    } catch (error) {
      console.error('Error deleting staff:', error);
      toast({ title: 'Erro ao remover staff', variant: 'destructive' });
    }
  }

  function editStaff(staff: Staff) {
    setEditingStaff(staff);
    form.reset({
      name: staff.name,
      userId: staff.userId,
      permission: staff.permission,
    });
  }

  return (
    <main className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingStaff ? 'Editar Staff' : 'Adicionar Novo Staff'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do staff" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="ID do usuário no Clerk" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o ID do usuário no sistema de autenticação Clerk.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissão</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a permissão" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderador</SelectItem>
                        <SelectItem value="USER">Usuário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingStaff ? 'Atualizar' : 'Adicionar'} Staff
              </Button>
              {editingStaff && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingStaff(null)}
                >
                  Cancelar Edição
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col justify-between p-4 border rounded"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{staff.name}</p>
                  <p className="text-sm text-muted-foreground flex">
                    ID: {staff.userId}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <Badge>{staff.permission}</Badge>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-2"
                    onClick={() => editStaff(staff)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteStaff(staff.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
