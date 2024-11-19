import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class AppUpperCaseDirective {
  @HostListener('input', ['$event']) input($event: InputEvent) {
    const target = $event.target as HTMLInputElement;
    target.value = target.value.toUpperCase();
  }
}
