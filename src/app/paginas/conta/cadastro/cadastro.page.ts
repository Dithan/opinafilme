import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';  // ajuste o caminho conforme necessário

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  regForm: FormGroup;
  confirmasenha: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Valida Formulário
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$'
          ),
          Validators.required,
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  validatePasswords() {
    const password = this.regForm.get('password').value;
    const confirmPassword = this.regForm.get('confirmPassword').value;
    this.confirmasenha = password === confirmPassword;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid && this.confirmasenha) {
      const { email, password, fullname } = this.regForm.value;
      try {
        await this.authService.register(email, password, fullname);
        this.navCtrl.navigateForward('/tabs/conta');
      } catch (error) {
        console.error('Erro no registro:', error);
        this.showErrorToast('Erro no registro: Verifique suas informações.');
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

  navToLogin() {
    this.navCtrl.navigateForward('/tabs/conta');
  }
  async signUpWithGoogle() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      await this.authService.googleSignIn();
      this.navCtrl.navigateForward('/tabs/conta');
    } catch (error) {
      console.error('Erro no login com Google:', error);
      // Adicione aqui um feedback ao usuário sobre o erro
    } finally {
      loading.dismiss();
    }
  }
}
