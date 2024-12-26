import {Component, Inject, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base/base.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";
import {OrdemProducaoService} from "../../../../../services/ordem-producao.service";
import {ToastrService} from "ngx-toastr";
import {Detalhes, Itens, StartOp} from "../../../../../models/request/ordem-producao-request.model";


@Component({
  selector: 'app-start-ordem',
  templateUrl: './start-ordem.component.html',
  styleUrls: ['./start-ordem.component.css']
})
export class StartOrdemComponent extends BaseComponent implements OnInit{

  startForm: FormGroup = this.formBuilder.group({
    'idOrdemServico': [''],
  })
  idOrdemProducao:string = ''
  listaIniciar : string[] = []
  itens: Itens[] = []
  listItens = new MatTableDataSource<Itens>()
  displayedColumns: string[] = ['id', 'descricao', 'qtd'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordemProducaoService: OrdemProducaoService,
    public dialogRef: MatDialogRef<StartOrdemComponent>,
    private loading: NgxSpinnerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.idOrdemProducao = this.data.Itens.idOrdemProducao
    this.itens = this.data.Itens.itensDesc
    this.loadItens(this.data.Itens.itensDesc)
  }

  onCloseClick(): void {
    this.listaIniciar = []
    this.dialogRef.close();
  }

  loadItens(itens: any) {
    this.loading.show()
    this.listItens.data.push(...itens)
    this.loading.hide()
  }

  selectItemLista(item: string) {    
    const itemIndex = this.listaIniciar.indexOf(item);
    if (itemIndex === -1) {
      this.listaIniciar.push(item);
    } else {
      this.listaIniciar.splice(itemIndex, 1);
    }   
  }

  onSubmit() {
    if(this.listaIniciar.length <= 0){
      this.toastrService.warning('Selecione os itens a serem iniciados')
    }else{
      this.loading.show()      
      let detalhes: Detalhes[] = this.listaIniciar.map((id) => ({
        idOrdemProducaoDetalhe: id
      }))

      let req: StartOp = {
        IdOrdemProducao: this.idOrdemProducao
        , Detalhes: detalhes
      }
      this.ordemProducaoService.startOp(req).subscribe((result) => {
        if (result.statusCode === 204) {
          this.onCloseClick()
        }
      },
      (error) => {
        this.loading.hide();
        this.toastrService.warning('Erro ao Iniciar', 'Atenção!');
      })
    }
  }
}
