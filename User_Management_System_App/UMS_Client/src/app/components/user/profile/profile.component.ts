import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/authentication/user';
import { ToastService } from 'src/app/services/shared/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imagePath = 'http://localhost:5000/uploaded';
  user: User = null!;
  constructor(
    private userService: UserService,
    private toastService:ToastService,
    private activatedRoute: ActivatedRoute
  ) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let username = <string>this.user.username;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(file);
        this.userService.uploadImage(username, file)
        .subscribe({
          next:r=>{
            this.user.picture=r.imgname;
            this.toastService.notify("Picture updated", "DISMISS");
          },
          error: err=>{
            this.toastService.notify("Picture update failed", "DISMISS");
          }
        })  
      };
      reader.readAsArrayBuffer(file);
    }
  }
  ngOnInit(): void {
    let username: string = this.activatedRoute.snapshot.params['name'];
    this.userService.getByName(username).subscribe({
      next: (r) => {
        this.user = r;
        this.user.picture = this.user.picture ?? 'no_pic.jpg';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
