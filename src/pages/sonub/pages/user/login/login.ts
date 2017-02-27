import { Component } from '@angular/core';
import { AppRouter } from '../../../../../app/app.router';
import { formProcess } from '../../../../../etc/share';
import { Member, MEMBER_LOGIN_DATA } from '../../../../../api/philgo-api/v2/member';
import { App } from '../../../../../providers/app';
import { LanguagePipe } from '../../../../../pipes/language/language.pipe';
//import { IonicApi } from '../../../../../providers/ionic-api-0.2/ionic-api';
@Component({
    selector: 'sonub-login-page',
    templateUrl: 'login.html'
})
export class SonubLoginPage {
    title: string = "Login";
    form = < MEMBER_LOGIN_DATA > {};
    process = formProcess.reset();
    constructor(
        private member: Member,
//        private auth: FirebaseAuth,
        private ln: LanguagePipe,
        private router: AppRouter,
//        private ionic: IonicApi,
        public app: App
    ) {

//        this.form.id = 'thruthesky';
//        this.form.password = '1111';
        //this.onClickLogin();

//        this.login();


        
    }
    onClickLogin() {
        // console.log("LoginPage::onClickLogin()");
        if( ! this.form.id ) return this.process.setError( this.ln.t( 'Please input user ID' ) );
        if( ! this.form.password ) return this.process.setError( this.ln.t('Please enter password.') );
        this.login();
    }

    login() {
        //this.process.loader = true;
        //this.process.error = '';
       this.process.startLoader();
       
        this.member.login( this.form,
            login => {
                // console.log('philgo login success: ', login);
//                this.ionic.registerPushNotification( s => s, e => e );
                this.router.go('/');
                // this.loginFirebase( login );
            },
            er => {
                // this.message.error("login error:" + er);
                // console.log("philgo member.login error: ", er );
                setTimeout(()=>this.process.setError( this.ln.t ( er ) ), 345);
            },
            () => {
                // console.log('philgo login complete!');
            }
        );

    }
    
}
