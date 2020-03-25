import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacaoViewComponent } from './autorizacao-view.component';

describe('AutorizacaoViewComponent', () => {
  let component: AutorizacaoViewComponent;
  let fixture: ComponentFixture<AutorizacaoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacaoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
