import { DiaDaSemana } from './../enums/dias-da-semanas.js';
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
   private inputData: HTMLInputElement;
   private inputQuantidae: HTMLInputElement;
   private inputValor: HTMLInputElement;
   private negociacoes = new Negociacoes();
   private negociacoesView = new NegociacoesView('#negociacoesView', true);
   private mensagemView = new MensagemView('#mensagemView');

   constructor() {
      this.inputData = <HTMLInputElement>document.querySelector('#data')
      this.inputQuantidae = document.querySelector('#quantidade') as HTMLInputElement
      this.inputValor = document.querySelector('#valor') as HTMLInputElement
      this.negociacoesView.update(this.negociacoes);
   }

   public adiciona(): void {
      const negociacao = Negociacao.criaDe(

         this.inputData.value,
         this.inputQuantidae.value,
         this.inputValor.value
      );
      if (!this.ehDiaUtil(negociacao.data)) {
         this.mensagemView.update('Apenas negociaões em dias úteis são aceitas');
         return;
      }
      this.negociacoes.adiciona(negociacao);
      this.limparFormulario();
      this.atualizaView();

   }

   private ehDiaUtil(data: Date) {
      return data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO
   }

   private limparFormulario(): void {

      this.inputData.value = '';
      this.inputQuantidae.value = '';
      this.inputValor.value = '';
      this.inputData.focus();

   }

   private atualizaView(): void {
      this.negociacoesView.update(this.negociacoes);
      this.mensagemView.update('Negociação adicionado com sucesso');
   }
}