import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentDialogComponent } from './torrent-dialog.component';

describe('TorrentDialogComponent', () => {
  let component: TorrentDialogComponent;
  let fixture: ComponentFixture<TorrentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
