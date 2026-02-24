import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './shared/components/topbar/topbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent],
  template: `
    <div class="min-h-screen bg-[#F5F5FA]">
      <app-topbar />
      <router-outlet />
    </div>
  `
})
export class AppComponent {}
