import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasAutorizacoesComponent } from './minhas-autorizacoes.component';

describe('MinhasAutorizacoesComponent', () => {
  let component: MinhasAutorizacoesComponent;
  let fixture: ComponentFixture<MinhasAutorizacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasAutorizacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAutorizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
