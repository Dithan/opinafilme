import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  /* NAVEGA PARA: CADASTRO */
  navToCadastro() {
    this.navCtrl.navigateForward('/tabs/conta/cadastro');
  }
}
