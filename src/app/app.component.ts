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
  styles: [
    `#main-container {
      max-width: 800px;
      margin: 20px auto;
    }`
  ]
})
export class AppComponent {
  title = 'limble-assignment';
}
