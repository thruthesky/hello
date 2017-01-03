import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from './alert/alert';
@NgModule({
    declarations: [ Alert ], // component declarations
    imports: [
        NgbModule.forRoot() // for ng-bootstrap registration
    ],
    exports: [ NgbModule, Alert ], // export alert for importing in other component.
    providers: [ Alert ] // provide alert for injecting in other component.
})
export class BootstrapModule {}
