export interface ReclamationDTO {
    sujet: string;
    description: string;
    dateReclamation: Date;
    idUser: number;
    idArticle: number;
    idIntervention?: number;
    statut: string;
  }