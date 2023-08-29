import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  public mySwiper?: Swiper;

  constructor (){
    
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper', {

      loop: true,
      
    });

    
  }

onSlideNext(){
 this.mySwiper!.slideNext();

 console.log("next");

}


onSlidePrev(){
  this.mySwiper!.slidePrev();

  console.log("prev");

}

}
