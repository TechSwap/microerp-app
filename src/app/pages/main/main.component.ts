import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from 'src/app/utils/http-helpers.utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username!: string;
  cliente = 'Petrini'

  constructor(
    private router: Router
  ) {  }


  ngOnInit(): void {
    var user = getUser()

    this.username = user.email
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('User')
    localStorage.removeItem('expires_at')
     this.router.navigate(['login'])
  }
}
