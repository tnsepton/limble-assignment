import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="main-container">
      <app-comment-section></app-comment-section>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'limble-assignment';
}
