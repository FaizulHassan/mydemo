import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentAreaComponent } from './home-content-area.component';

describe('HomeContentAreaComponent', () => {
  let component: HomeContentAreaComponent;
  let fixture: ComponentFixture<HomeContentAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
