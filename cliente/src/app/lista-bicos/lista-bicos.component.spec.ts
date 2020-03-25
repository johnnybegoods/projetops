import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBicosComponent } from './lista-bicos.component';

describe('ListaBicosComponent', () => {
  let component: ListaBicosComponent;
  let fixture: ComponentFixture<ListaBicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
