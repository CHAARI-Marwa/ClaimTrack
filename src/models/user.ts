import { ArticleVendu } from "./articlevendu";

export interface User
{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string; 
    articlesVendus: ArticleVendu[] ;
}