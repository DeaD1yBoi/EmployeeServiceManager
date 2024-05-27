import { UserService } from './../../../../services/services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event, NavigationStart } from '@angular/router';
import { TokenService } from '../../../../services/token/token.service';
import { UserWrapper } from '../../../../services/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

isAdmin(): any {
    return this.currentUser?.roleNames?.includes('ADMIN');
}
  currentUser: UserWrapper | undefined;
  currentUrl: string = '';
  private isNavigated: boolean = false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.updateActiveLink();
      } else if (event instanceof NavigationStart) {
        this.isNavigated = true;
      }
    });
  }

  ngOnInit(): void {
    this.fetchUsername();
    if (!this.isNavigated) {
      this.updateActiveLink();
    }
  }

  fetchUsername() {
    this.userService.getMyUserDetails().subscribe({
      next: (res) => {
        this.currentUser = res;
      },
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.tokenService.removeToken();
  }

  updateActiveLink() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach((link) => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
