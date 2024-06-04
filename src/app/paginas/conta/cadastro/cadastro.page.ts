import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  nomeCompleto: string = '';
  email: string ='';
  dataNas!: Date ;
  Genero: string = '';
  cpf!: string ;
  senha: string = '';
  confirmaSenha: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const dataString = '31/05/2024'; // Exemplo de string no formato "dia/mês/ano"
    const partes = dataString.split('/'); // Dividir a string em partes: dia, mês, ano
    const dia = parseInt(partes[0], 10); // Converter o dia para número
    const mes = parseInt(partes[1], 10) - 1; // Converter o mês para número (subtrair 1, pois os meses em JavaScript são baseados em zero)
    const ano = parseInt(partes[2], 10); // Converter o ano para número

    this.dataNas = new Date(ano, mes, dia); // Criar um objeto Date a partir das partes
   }

  navCriarConta(){
    this.navCtrl.navigateForward('/tabs/conta/minhaconta')
  }
  
  submitForm() {
    // Aqui você submete o formulário, envia os dados para um servidor
    console.log('Nome completo:', this.nomeCompleto);
    console.log('E-mail:', this.email);
    console.log('Data de Nascimento:', this.dataNas);
    console.log('Genero:', this.Genero);
    console.log('CPF:', this.cpf);
    console.log('Senha:', this.senha);
    console.log('Confirme sua Senha:', this.confirmaSenha);
    // Adicione código para enviar os dados para o servidor ou qualquer outra ação que desejar
  }
}

