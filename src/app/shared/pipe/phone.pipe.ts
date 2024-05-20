import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    let foneFormated = ''


    if (value !== null || value !== "") {
      let tel = value.replace(/\D/g, '')

       if(tel.length > 12) {
         foneFormated = tel.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4')
       }else if(tel.length > 11) {
         foneFormated = tel.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4')
       }else if(tel.length > 10) {
         foneFormated = tel.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3')
       }else if(tel.length > 9) {
         foneFormated = tel.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3')
       }else if(tel.length > 5) {
         foneFormated = tel.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3')
       }else if(tel.length > 1) {
         foneFormated = tel.replace(/^(\d{2})?(\d{0,5})/, '($1) $2')
       }else {
         if(tel !== ''){
           foneFormated = tel.replace(/^(\d*)/, '($1')
         }
       }

    }

    return foneFormated;
  }

}
