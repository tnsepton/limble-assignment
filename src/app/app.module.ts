import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { SharedModule } from './shared/shared.module';
import { CommentComposerComponent } from './comment-composer/comment-composer.component';
import { TaggedUsersPipe } from './tagged-users.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CommentSectionComponent,
    CommentComponent,
    CommentComposerComponent,
    TaggedUsersPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
