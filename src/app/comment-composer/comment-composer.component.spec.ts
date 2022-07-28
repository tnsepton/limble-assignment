import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComposerComponent } from './comment-composer.component';

describe('CommentComposerComponent', () => {
  let component: CommentComposerComponent;
  let fixture: ComponentFixture<CommentComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComposerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
