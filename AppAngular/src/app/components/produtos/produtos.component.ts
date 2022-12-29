import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/Produto';
import { ProdutosService } from 'src/app/produtos.service';
import { DeleteButonRenderer } from '../button/delete-button/delete-button.component';
import { EditButtonRenderer } from '../button/edit-button/edit-button.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  form: any;
  title: string | undefined;
  produtos: Produto[] | undefined;
  DescricaoProduto: string | undefined;
  Id: number = 0;
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  modalRef: BsModalRef | undefined;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

  testeData$: Observable<any> | undefined;
  rowData$: Observable<any[]> | undefined;
  colDefs: ColDef[] = [
    { field: 'id', maxWidth: 100, },
    { field: 'descProduto' },
    { field: 'situacao', maxWidth: 100, },
    {
      field: 'dtFabricacao', maxWidth: 200
    },
    { field: 'dtValidade', maxWidth: 200, },
    { field: 'codFornecedor', maxWidth: 200 },
    { field: 'descFornecedor' },
    { field: 'cnpj' },
    // {
    //   field: 'atualizar',
    //   maxWidth: 150,
    //   cellRenderer: () => {
    //     var atualizar = document.createElement('button');
    //     atualizar.classList.add('btn-info');
    //     atualizar.classList.add('btn');
    //     atualizar.style.cursor = 'pointer';
    //     atualizar.innerText = "Atualizar";
    //     document.body.appendChild(atualizar);
    //     atualizar.addEventListener('click', function () {
    //       alert('Item atualizado!')
    //     });

    //     return atualizar;
    //   }
    // },
    {
      field: 'Atualizar',
      minWidth: 100, cellRenderer: EditButtonRenderer,
    },
    {
      field: 'Deletar',
      minWidth: 100, cellRenderer: DeleteButonRenderer
    },

    // {
    //   field: 'excluir',
    //   maxWidth: 150,
    //   cellRenderer: () => {
    //     var button = document.createElement('button');
    //     button.classList.add('btn-danger');
    //     button.classList.add('btn');
    //     button.style.cursor = 'pointer';
    //     button.innerText = "Excluir";
    //     document.body.appendChild(button);
    //     button.addEventListener('click', function () {

    //     }
    //     );
    //     return button;
    //   }
    // }

  ];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,

  }

  constructor(
    private produtosServices: ProdutosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.produtosServices.ListarProdutos().subscribe(resultado => {
      this.produtos = resultado;
    })
    this.rowData$ = this.http.get<any[]>('https://localhost:5001/api/produtos/');
    this.testeData$ = this.http.post('https://localhost:5001/api/produtos/', Produto.toString);
    this.title = "Novo Produto";

  }
  Remover(): void {

  }
  EnviarFormulario(): void {
    const produto: Produto = this.form.value;

    if (this.Id > 0) {
      this.produtosServices.AtualizarProduto(this.Id, produto).subscribe(resultado => {
        alert('Produto inserido com sucesso');
        console.log(produto);
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.produtosServices.ListarProdutos().subscribe(registros => {
          this.produtos = registros;
        });
      })
    }

    this.produtosServices.AdicionarProduto(produto).subscribe((resultado) => {
      alert('Produto inserido com sucesso');
      console.log(produto);
      this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      this.produtosServices.ListarProdutos().subscribe(registros => {
        this.produtos = registros;
      })
    });


  }

  ExibirFormularioCadastro(): void {
    this.form = new FormGroup({
      DescProduto: new FormControl(null, [Validators.required]),
      Situacao: new FormControl(null),
      DtFabricacao: new FormControl(null),
      DtValidade: new FormControl(null),
      CodFornecedor: new FormControl(null),
      DescFornecedor: new FormControl(null),
      CNPJ: new FormControl(null),
    });
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

  }

  Voltar(): void {
    this.visibilidadeFormulario = false;
    this.visibilidadeTabela = true;

  }

  AtualizarDados(): void {

  }
  ExibirFormUpdate(Id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.produtosServices.SelecionarProduto(Id).subscribe(resultado => {
      this.title = `Atualizar $(resultado.id) $(resultado.DescProduto)`;
      this.form = new FormGroup({
        Id: new FormControl(resultado.Id),
        DescProduto: new FormControl(resultado.DescProduto),
        Situacao: new FormControl(resultado.Situacao),
        DtFabricacao: new FormControl(resultado.DtFabricacao),
        DtValidade: new FormControl(resultado.DtValidade),
        DescFornecedor: new FormControl(resultado.DescFornecedor),
        CNPJ: new FormControl(resultado.CNPJ)

      })
    })
  }

}
