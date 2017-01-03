import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from './alert/alert';
import { AlertContent } from './alert/alert-content';
@NgModule({
    declarations: [ AlertContent ], // component declarations
    entryComponents: [ AlertContent ],
    imports: [
        NgbModule.forRoot() // for ng-bootstrap registration
    ],
    exports: [ NgbModule ], // export alert for importing in other component.
    providers: [ Alert ] // provide alert for injecting in other component.
})
export class BootstrapModule {}
