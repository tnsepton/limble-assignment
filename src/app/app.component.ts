import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="main-container">
      <hr>
      <app-comment-section></app-comment-section>
      <hr>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'limble-assignment';
}
