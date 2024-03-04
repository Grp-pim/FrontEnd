import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { BodyComponent } from './body/body.component';
import { HttpClientModule} from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from './hint-modal/hint-modal.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    NgbModalModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    GameComponent,
    HintModalComponent,
  ],
})
export class AppModule {}
