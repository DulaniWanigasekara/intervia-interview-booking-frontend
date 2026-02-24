import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../core/services/candidate';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./home.html`
})
export class HomeComponent {
  form = { name: '', email: '', phone: '' };
  errors: any = {};
  errorMessage = '';
  loading = false;

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) {}

  submit() {
    this.errors = {};
    this.errorMessage = '';

    // Frontend validation
    if (!this.form.name.trim()) this.errors.name = 'Full name is required';
    if (!this.form.email.trim()) this.errors.email = 'Email is required';
    else if (!this.form.email.includes('@')) this.errors.email = 'Invalid email format';
    if (Object.keys(this.errors).length > 0) return;

    this.loading = true;

    // Try to find existing candidate by email first
    this.candidateService.getByEmail(this.form.email).subscribe({
      next: (existing) => {
        // Candidate already registered — just save and go
        this.saveAndNavigate(existing);
      },
      error: () => {
        // Not found — register as new candidate
        this.candidateService.create(this.form).subscribe({
          next: (created) => this.saveAndNavigate(created),
          error: (err) => {
            this.loading = false;
            const apiError = err.error;
            if (apiError?.fieldErrors) {
              this.errors = apiError.fieldErrors;
            } else {
              this.errorMessage = apiError?.message || 'Something went wrong';
            }
          }
        });
      }
    });
  }

  saveAndNavigate(candidate: any) {
    // Save candidate to localStorage so other pages can use it
    localStorage.setItem('intervia_candidate', JSON.stringify(candidate));
    window.dispatchEvent(new Event('candidateLoggedIn'));
    this.loading = false;
    this.router.navigate(['/slots']);
  }
}
