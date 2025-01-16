import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edituserform',
  templateUrl: './edituserform.component.html',
  styleUrls: ['./edituserform.component.css']
})
export class EdituserformComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'client' // Valeur par défaut si non définie
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.loadUser(userId);
    }
  }

  loadUser(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    );
  }

  updateUser(): void {
    console.log('Objet user avant envoi:', this.user);
    this.user.role='client';
    this.userService.editUser(this.user).subscribe(
      (response) => {
        console.log('Utilisateur mis à jour avec succès', response);
        this.router.navigate([`dashboardadmin/clients`]);
      },
      (error) => {
        console.error(this.user,'Erreur lors de la mise à jour de l\'utilisateur', error);
        alert('Erreur lors de la mise à jour de l\'utilisateur.');
      }
    );
  }
  
}
