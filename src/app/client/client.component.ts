import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  addArticle(): void {
    this.router.navigate(['dashboardadmin/addarticle']);
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== id);
          console.log('Utilisateur supprimé avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

  editUser(user: User): void {
    const updatedUser: User = { ...user, firstName: 'NouveauNom' }; // Exemple de mise à jour
    this.userService.editUser(updatedUser).subscribe(
      (updated) => {
        const index = this.users.findIndex((u) => u.id === updated.id);
        if (index !== -1) this.users[index] = updated;
        console.log('Utilisateur modifié avec succès');
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'utilisateur', error);
      }
    );
  }
}
