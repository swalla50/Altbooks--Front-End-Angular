import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fresh'
})
export class FreshPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
