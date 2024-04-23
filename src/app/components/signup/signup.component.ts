import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/Oauth_google/auth-service.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm! : FormGroup;
  imagePreview : any;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName:["", [Validators.required, Validators.minLength(3)]],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      phone:["", [Validators.required, Validators.pattern('[0-9]{8}')]],
      image:[""],
      role: [""]
    });


  }

  signup(){
    this.userService.signUp(this.signupForm.value, this.signupForm.value.image).subscribe((response)=>{
      console.log("here response from BE", response.msg);
      if (response.msg == "Success"){
        this.router.navigate(["login"]);
      } else{
        this.errorMsg = response.msg;
      }
    })
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.signupForm.patchValue({ image: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  continueWithGoogle(): void {
        // Si le code et le rôle sont dans l'URL, nous les récupérons et appelons la méthode handleGoogleCallback
        const code = this.route.snapshot.queryParamMap.get('code');
        const role = this.route.snapshot.queryParamMap.get('state');
    
        if (code && role) {
          this.authService.handleGoogleCallback(code, role).subscribe(
            response => {
              // Redirigez vers la page d'accueil ou la page appropriée après une authentification réussie
              if (role === 'student') {
                this.router.navigate(['/homeStepper']);
              } else if (role === 'teacher') {
                this.router.navigate(['/test']);
              } else {
                this.router.navigate(['/']);
              }
            },
            error => {
              console.error('Error during Google authentication:', error);
              this.router.navigate(['/signup']); // Redirigez vers la page d'inscription en cas d'erreur
            }
          );
        } else {
          // Si le code et le rôle ne sont pas présents, redirigez vers la page d'accueil
          this.router.navigate(['/']);
        }
  }

  
}
