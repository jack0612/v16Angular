import { Component } from '@angular/core';
import { Observable, interval, share, take } from 'rxjs';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {


  ngOnInit(){
    this.myShare();
  }

  private myShare(){
    const source$ = interval(1000);
    
     
    
    const shared$ = source$.pipe(take(3),share());
    
    shared$.subscribe((value) => {
      console.log(`Subscriber B: ${value}`);
    });
    
    shared$.subscribe((value) => {
      console.log(`Subscriber A: ${value}`);
    });
    
     
    

  }
}
