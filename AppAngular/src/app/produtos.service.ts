import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵisObservable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './Produto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  url = 'https://localhost:5001/api/produtos'

  constructor(private http: HttpClient) { }

  ListarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  SelecionarProduto(Id: number): Observable<Produto> {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Produto>(apiUrl);
  }

  AdicionarProduto(produto: Produto): Observable<any> {
    return this.http.post<Produto>(this.url, produto, httpOptions);
  }

  AtualizarProduto(Id: number, produto: Produto): Observable<any> {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.put<Produto>(apiUrl, produto, httpOptions);
  }

  ExcluirProduto(Id: number): Observable<any> {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
