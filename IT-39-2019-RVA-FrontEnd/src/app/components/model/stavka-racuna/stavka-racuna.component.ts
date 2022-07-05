import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { Racun } from 'src/app/models/racun';
import { StavkaRacuna } from 'src/app/models/stavkaRacuna';
import { StavkaRacunaService } from 'src/app/services/stavkaRacuna.service';
import { StavkaRacunaDialogComponent } from '../../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges {

  displayedColumns = ['id','redniBroj','kolicina','jedinicaMere','cena','racun','proizvod','actions'];
  dataSource!: MatTableDataSource<StavkaRacuna>;
  subscription!: Subscription;
  @Input() selectedRacunBottom!: Racun;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private stavkaRacunaService: StavkaRacunaService,
    private dialog: MatDialog) { }
  
    ngOnChanges(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.stavkaRacunaService.
    getStavkaRacunaByRacun(this.selectedRacunBottom.id).subscribe
      (data => { this.dataSource = new MatTableDataSource(data) }),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }

  public openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string, 
                    cena?:number, racun?: Racun, proizvod?: Proizvod) {
    const dialogRef = this.dialog.open(StavkaRacunaDialogComponent, { data: { id,redniBroj,kolicina,jedinicaMere,cena,racun,proizvod } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.racun = this.selectedRacunBottom;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    })
  }

  public applyFilter (filter: any){
    filter= filter.target.value;
    filter= filter.trim();
    filter= filter.toLocaleLowerCase();
    this.dataSource.filter= filter;

  }

}
