import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  regForm: FormGroup;
  confirmasenha: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private authService: AuthService // Adiciona o serviço de autenticação
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
      const { email, password } = this.regForm.value;
      try {
        await this.authService.register(email, password);
        this.navCtrl.navigateForward('/tabs/conta');
      } catch (error) {
        console.error('Erro no registro:', error);
        // Adicione aqui um feedback ao usuário sobre o erro
      } finally {
        loading.dismiss();
      }
    } else {
      console.log('Formulário inválido ou senhas não conferem');
      loading.dismiss();
    }
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
  /* APAGAR APÓS FINALIZAR BACKEND FORMULÁRIO -> NAVEGA PARA: MINHACONTA */
  navToLogin() {
    this.navCtrl.navigateForward('/tabs/conta');
  }
}
