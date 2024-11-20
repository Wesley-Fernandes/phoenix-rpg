export interface RecordInterface {
  id: string;
  name: string;
  clan?: ClanInterface;
  description: string;
  profileUrl: string;
  fisionomy: string;
  history: string;
  race: string;
  powers: PowerInterface[];
  skills: SkillInterface[];
}

export interface PowerInterface {
  id: string;
  title: string;
  description: string;
}

export interface SkillInterface {
  id: string;
  title: string;
  description: string;
}

export interface ClanInterface {
  id: string;
  title: string;
  creatorId: string;
}
