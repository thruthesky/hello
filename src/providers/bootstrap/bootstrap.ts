import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from './alert/alert';
import { AlertContent } from './alert/alert-content';
import { ImageModal } from "./modal/image";
import { MemberInfoModal } from "./modal/member-info";

@NgModule({
    declarations: [ AlertContent, ImageModal, MemberInfoModal ], // component declarations
    entryComponents: [ AlertContent, ImageModal, MemberInfoModal ],
    imports: [
        NgbModule.forRoot() // for ng-bootstrap registration
    ],
    exports: [ NgbModule ], // export alert for importing in other component.
    providers: [ Alert ] // provide alert for injecting in other component.
})
export class BootstrapModule {}
