import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoToolbarModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PoToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-app';
}
