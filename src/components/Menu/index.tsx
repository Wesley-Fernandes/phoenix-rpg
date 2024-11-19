import React from 'react';
import { MenuCategory } from './MenuCategory';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function Menu() {
  return (
    <Card className="sm:max-w-96 h-fit">
      <CardHeader>
        <CardTitle>Manual da comunidade</CardTitle>
        <img
          className="border-4"
          src="https://giffiles.alphacoders.com/219/219090.gif"
          alt=""
        />
        <CardDescription className="text-center">
          Clique em um dos menus abaixos para abrir suas opções. Posteriormente
          clique em uma delas para ser redirecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MenuCategory />
      </CardContent>
      <CardFooter>
        <small>
          Desenvolvido por <strong>Conde</strong>
        </small>
      </CardFooter>
    </Card>
  );
}
