import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {
  userInfo: any;
  updateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.getUserInfo();

    this.updateForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    
 
  }

  async getUserInfo() {
    try {
      this.userInfo = await this.authService.getUserInfo();
      if (this.userInfo) {
        this.updateForm.setValue({
          fullName: this.userInfo.fullName || '',
          email: this.userInfo.email || '',
          password: '', // Deixe vazio para não exibir a senha
        });
      }
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    this.navCtrl.navigateForward('/tabs/filmes');

    }
  }

  async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  async updateUserInfo() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.updateForm.valid) {
      const { fullName, email, password } = this.updateForm.value;
      try {
        await this.authService.updateUserInfo(fullName, email, password);
        this.navCtrl.navigateForward('/tabs/conta/minhaconta');
      } catch (error) {
        console.error('Erro ao atualizar informações do usuário:', error);
        this.showErrorToast('Erro ao atualizar informações. Tente novamente.');
      } finally {
        loading.dismiss();
      }
    } else {
      console.log('Formulário inválido');
      if (!this.updateForm.controls['email'].valid) {
        this.showErrorToast('Por favor, preencha o e-mail corretamente.');
      }
      if (!this.updateForm.controls['password'].valid) {
        this.showErrorToast('Por favor, preencha a senha corretamente.');
      }
      loading.dismiss();
    }
  }

  async logout() {
    this.authService.logout()
    this.navCtrl.navigateForward('/tabs/filmes');

  }

}
