import { Component } from '@angular/core';

@Component({
  selector: 'lh-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  limeHomeLogo: string = 'assets/logo.svg';
  menuSrc: string = 'assets/burger-icon.svg';
}
