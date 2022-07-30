import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'taggedUsers'
})
export class TaggedUsersPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const words: string[] = value.split(' ');
    for(const [i, word] of words.entries()) {
      if(word[0] === '@') {
        words[i] = '<span class="tagged-user">' + word + '</span>';
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(words.join(' '));
  }

}
