import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeContentAreaComponent } from './home-content-area/home-content-area.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, HomeContentAreaComponent],
  exports:[HeaderComponent]
})
export class HomeModule { }
