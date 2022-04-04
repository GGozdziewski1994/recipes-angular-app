import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
})
export class StarsPipe implements PipeTransform {
  transform(value: number) {
    return '⭐'.repeat(value);
  }
}
