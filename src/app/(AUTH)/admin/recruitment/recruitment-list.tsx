'use client';

import { useState } from 'react';
import { Recruitment } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface RecruitmentListProps {
  recruitments: Recruitment[];
}

export default function RecruitmentList({
  recruitments,
}: RecruitmentListProps) {
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<Recruitment | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recruitments?.map((recruitment) => (
        <Card key={recruitment.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Candidato {recruitment.creatorId}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submetido em:{' '}
              {new Date(recruitment.creatorAt).toLocaleDateString()}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedRecruitment(recruitment)}>
                  Ver Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Detalhes da Candidatura</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full pr-4">
                  {selectedRecruitment && (
                    <div className="space-y-4">
                      <p>
                        <strong>ID do Candidato:</strong>{' '}
                        {selectedRecruitment.creatorId}
                      </p>
                      <p>
                        <strong>Data de Submissão:</strong>{' '}
                        {new Date(
                          selectedRecruitment.creatorAt
                        ).toLocaleString()}
                      </p>
                      <p>
                        <strong>Link do Amino:</strong>{' '}
                        <a
                          href={selectedRecruitment.aminoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {selectedRecruitment.aminoLink}
                        </a>
                      </p>
                      <div>
                        <strong>Respostas:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-2">
                          {selectedRecruitment.questions.map(
                            (question, index) => (
                              <li key={index}>{question}</li>
                            )
                          )}
                        </ol>
                      </div>
                      <div>
                        <strong>Comentário:</strong>
                        <p className="mt-2">{selectedRecruitment.comment}</p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
