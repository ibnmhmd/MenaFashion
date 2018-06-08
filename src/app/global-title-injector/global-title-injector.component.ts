import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-global-title-injector',
  templateUrl: './global-title-injector.component.html',
  styleUrls: ['./global-title-injector.component.css']
})


export class GlobalTitleInjectorComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
 
  }

  @Input() titleInput:string = "";
  constructor(private titleService: Title) { }

  setTitle(_title: string)
  {
    this.titleService.setTitle(_title);
  }
  ngOnInit() {
    this.setTitle(this.titleInput)
  }

}
