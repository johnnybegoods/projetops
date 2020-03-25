import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAutorizacaoComponent } from './nova-autorizacao.component';

describe('NovaAutorizacaoComponent', () => {
  let component: NovaAutorizacaoComponent;
  let fixture: ComponentFixture<NovaAutorizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaAutorizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaAutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
