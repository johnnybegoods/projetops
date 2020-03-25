import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-rotinas';
  private close: boolean = false;
  private aut:boolean = false;
  private just:boolean = false;
  private opt:number;

  constructor(private router:Router){}

  closed(){
    this.close = !this.close;
  }
  autTrue(){
    this.aut = !this.aut;
  }
  
  optAut(n:number){
    this.aut = false;
    this.opt = n;
  }

  justTrue(){
    this.just = !this.just;
  }

  home(){
    this.router.navigate(['/home']);
  }
}
