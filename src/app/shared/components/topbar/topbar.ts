import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './topbar.html'   // ← points to the html file
})
export class TopbarComponent implements OnInit {
  candidate: any = null;

  ngOnInit() {
    const stored = localStorage.getItem('intervia_candidate');
    if (stored) this.candidate = JSON.parse(stored);

    window.addEventListener('candidateLoggedIn', () => {
      const s = localStorage.getItem('intervia_candidate');
      if (s) this.candidate = JSON.parse(s);
    });
  }
}
