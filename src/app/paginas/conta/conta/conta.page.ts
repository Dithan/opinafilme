import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Certifique-se de que o caminho está correto

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
    private navCtrl: NavController,
    private authService: AuthService, // Adiciona o serviço de autenticação
    private toastCtrl: ToastController

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

  async signIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const user = await this.authService.login(email, password);
        if (user) {
          this.navCtrl.navigateForward('/tabs/conta/minhaconta');
        } else {
          this.showErrorToast('Erro no login: Usuário não encontrado.');
          this.navCtrl.navigateForward('/tabs/conta');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        this.showErrorToast('Erro no login: Verifique suas credenciais.');
        this.navCtrl.navigateForward('/tabs/conta');
      } finally {
        loading.dismiss();
      }
    } else {
      console.log('Formulário inválido');
      loading.dismiss();
    }
  }
  async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
  
  navToCadastro() {
    this.navCtrl.navigateForward('/tabs/conta/cadastro');
  }
}

  /* NAVEGA PARA: MINHA CONTA e CADASTRO */
  // navToMinhaConta() {
  //   this.navCtrl.navigateForward('/tabs/conta/minhaconta');
  // }


