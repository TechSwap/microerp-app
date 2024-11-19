import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";

@Component({
  selector: 'app-ordem-producao',
  templateUrl: './ordem-producao.component.html',
  styleUrls: ['./ordem-producao.component.css']
})
export class OrdemProducaoComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
