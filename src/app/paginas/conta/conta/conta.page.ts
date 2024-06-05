import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      // Senha deve conter pelo menos um número, uma letra maiúscula e uma letra minúscula, e no mínimo 8 caracteres ou mais.
      password: [
        '',
        [
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$'
          ),
          Validators.required,
        ],
      ],
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      // Valida Login
      // const user = await this.authService.loginUser(email, password);
      this.navCtrl.navigateForward('/tabs/conta/minhaconta');
    }
  }

  /* NAVEGA PARA: MINHA CONTA e CADASTRO */
  navToMinhaConta() {
    this.navCtrl.navigateForward('/tabs/conta/minhaconta');
  }

  navToCadastro() {
    this.navCtrl.navigateForward('/tabs/conta/cadastro');
  }
}
