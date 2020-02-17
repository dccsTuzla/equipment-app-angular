import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export default class HeaderComponent {
  constructor(
    private router: Router
  ) {

  }

  isEditingActive() {
    console.log(this.router.url);
    return /\/equipment\/.+/.test(this.router.url);
  }
}
