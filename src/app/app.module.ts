import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { BodyComponent } from './body/body.component';
import { HttpClientModule} from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from './hint-modal/hint-modal.component';
import { SidebarComponent } from './body/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateTestComponent } from './create-test/create-test.component';
import { ToastModule } from 'primeng/toast';
import { NotfoundComponent } from './notfound/notfound.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TestPageComponent } from './test-page/test-page.component';
import { SideBarComponent } from './test-page/side-bar/sidebar.component';
import { CountdownModule } from 'ngx-countdown';
import { MatChipsModule } from '@angular/material/chips';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { TagModule } from 'primeng/tag';
import { SidebarQuizComponent } from './quiz-page/sidebar-quiz/sidebar-quiz.component';
import { ModalResultComponent } from './quiz-page/modal-result/modal-result.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileAccountSettingsComponent } from './components/profile-account-settings/profile-account-settings.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileNotificationsComponent } from './components/profile-notifications/profile-notifications.component';
import { ProfileSecurityComponent } from './components/profile-security/profile-security.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeStepperComponent } from './components/home-stepper/home-stepper.component';
import { EventsComponent } from './components/events/events.component';
import { CommunityComponent } from './components/community/community.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { PickListModule } from 'primeng/picklist'; // Import PickListModule
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DashboardComponent } from './components/admin-folder/dashboard/dashboard.component';
import { GeneralInfoDashboardComponent } from './components/admin-folder/general-info-dashboard/general-info-dashboard.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AdminProfComponent } from './components/admin-folder/admin-prof/admin-prof.component';
import { EventsTableAdminComponent } from './components/admin-folder/events-table-admin/events-table-admin.component';
import { ClassesTableAdminComponent } from './components/admin-folder/classes-table-admin/classes-table-admin.component';
import { ChaptersTableAdminComponent } from './components/admin-folder/chapters-table-admin/chapters-table-admin.component';
import { UsersTableAdminComponent } from './components/admin-folder/users-table-admin/users-table-admin.component';
import { AddChapterComponent } from './components/admin-folder/add-chapter/add-chapter.component';
import { AddUserComponent } from './components/admin-folder/add-user/add-user.component';
import { AddEventComponent } from './components/admin-folder/add-event/add-event.component';
import { SidebarPreviewComponent } from './test-details/sidebar-preview/sidebar-preview.component';
import { FloatLabelModule } from 'primeng/floatlabel';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatChipsModule,
    RadioButtonModule,
    MenuModule,
    ContextMenuModule,
    TagModule,
    // import module  "TDF" && "reactive Form"
    FormsModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    PickListModule,
    FloatLabelModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    BodyComponent,
    GameComponent,
    HintModalComponent,
    SidebarComponent,
    CreateTestComponent,
    NotfoundComponent,
    TestPageComponent,
    SideBarComponent,
    QuizPageComponent,
    SidebarQuizComponent,
    ModalResultComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgotPwdComponent,
    ProfileComponent,
    ResetPwdComponent,
    ProfileInformationComponent,
    ProfileAccountSettingsComponent,
    ProfileSecurityComponent,
    ProfileNotificationsComponent,
    HomeStepperComponent,
    EventsComponent,
    CommunityComponent,
    SelectRoleComponent,
    DashboardTeacherComponent,
    TestDetailsComponent,
    DashboardComponent,
    GeneralInfoDashboardComponent,
    ProgressBarComponent,
    AdminProfComponent,
    EventsTableAdminComponent,
    ClassesTableAdminComponent,
    ChaptersTableAdminComponent,
    UsersTableAdminComponent,
    AddChapterComponent,
    AddUserComponent,
    AddEventComponent,
    SidebarPreviewComponent,
  ],
})
export class AppModule {}
