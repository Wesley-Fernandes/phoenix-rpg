export interface EquipamentType {
  id: string;
  rarity: RarityType;
  title: string;
  picture: string;
  description: string;
  status: StatusType[];
  requirements: RequirimentType;
}

interface StatusType {
  mode: 'increase' | 'decrease';
  quantity: number;
  targets: TargetsType[];
  description: string;
}

type TargetsType = 'DEFM' | 'DEFF' | 'ATKF' | 'ATKM';

interface RequirimentType {
  level: number;
  classe: ClassesType;
}

type ClassesType =
  | 'Paladino'
  | 'Mago negro'
  | 'Arqueiro'
  | 'Mago branco'
  | 'Escudeiro'
  | 'Ladrão';

type RarityType = 'Lendario' | 'Raro' | 'Incomun' | 'Comun';
export const equipament_list: EquipamentType[] = [
  {
    id: 'berserk-armour',
    title: 'Berserk Armour',
    rarity: 'Lendario',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJBrcLRGICiO486rIsK-DeRvVmYXMAOh7ug&s',
    description:
      'A Armadura Berserker é uma armadura amaldiçoada extremamente resistente, uma das várias existentes, forjada pelos anões. Ela remove as limitações subconsciente do usuário (incluindo a dor), as quais o impede de usar todo o seu potencial, dando assim níveis extraordinários de força e resistência.',
    status: [
      {
        mode: 'increase',
        quantity: 150,
        targets: ['DEFM', 'DEFF'],
        description: '+ Aumenta as defesas magicas em 150.',
      },
    ],
    requirements: {
      level: 100,
      classe: 'Paladino',
    },
  },
  {
    id: 'DragonSlayer-sword',
    rarity: 'Lendario',
    title: 'DragonSlayer',
    description:
      'Poderosa lâmina forjada por Godo, Guts pode rachar a armadura dos cavaleiros e de seus cavalos blindados com facilidade. A Dragonslayer também é extremamente eficaz contra todos os Apóstolos, com exceção dos mais fortemente blindados. A espada é tão pesada que pode cortar através de armas e armaduras normais com um único ataque. ',
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnpiUPak3j7BcNIZHOJc5UjV5Qc94Y-zCy4VheRGa_LOfbPkg177tVrg9kN5498gfd9DY&usqp=CAU',
    status: [
      {
        mode: 'increase',
        quantity: 150,
        targets: ['ATKF'],
        description: '+ Aumenta o ataque fisico em 150',
      },
    ],
    requirements: {
      classe: 'Paladino',
      level: 80,
    },
  },
];
