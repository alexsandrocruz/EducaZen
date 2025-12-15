import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showcase.html',
  styleUrls: ['./showcase.scss']
})
export class ShowcaseComponent {
  progress = 65;
  
  handleButtonClick(type: string) {
    console.log(`${type} button clicked`);
  }
}
