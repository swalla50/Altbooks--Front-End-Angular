import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fresh'
})
export class FreshPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
   
   @Pipe({
     name: 'customDate'
   })
   export class CustomDatePipe extends 
                DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       return super.transform(value, "EEEE d MMMM y h:mm a");
     }
   }
