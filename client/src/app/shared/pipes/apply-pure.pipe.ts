import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyPure',
  standalone: true,
})
export class ApplyPurePipe implements PipeTransform {
  /***
   * run pure function in template, it's improve performance
   * @param value
   * @param fn
   * @param args
   */
  transform(value: any, fn: Function, ...args: any[]): any {
    return fn(value, ...args);
  }
}
