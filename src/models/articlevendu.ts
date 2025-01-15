import { User } from './user';

export interface ArticleVendu {
  id: number;
  nomArticle: string;
  idUser: number;
  user: User; 
  dateAchat: string;
  dureeGarantie: number;
}
