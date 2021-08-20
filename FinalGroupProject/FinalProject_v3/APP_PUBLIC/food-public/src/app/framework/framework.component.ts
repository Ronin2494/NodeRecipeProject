import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  
  router :Router;
  constructor(router: Router) { 
    this.router = router;
  }
  

  ngOnInit(): void {
  }

  public logout(){
    sessionStorage.removeItem("usertoken");
    this.router.navigateByUrl('/');
    window.location.reload();
    
    
  }

}
