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
import { SidebarComponent } from './body/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar'; // 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateTestComponent } from './create-test/create-test.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { NotfoundComponent } from './notfound/notfound.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TestPageComponent } from './test-page/test-page.component';
import { SideBarComponent } from './test-page/side-bar/sidebar.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    NgbModalModule,
    SidebarModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    RadioButtonModule,
    ToastModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    CountdownModule,
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
    SidebarComponent,
    CreateTestComponent,
    NotfoundComponent,
    TestPageComponent,
    SideBarComponent,
  ],
})
export class AppModule {}
