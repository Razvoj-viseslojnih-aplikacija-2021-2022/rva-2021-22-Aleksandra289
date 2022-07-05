import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodDialogComponent } from '../../dialogs/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource!: MatTableDataSource<Proizvod>;
  subscription!: Subscription;
  selectedProizvodTop!: Proizvod;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private proizvodService: ProizvodService,  public dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.subscription = this.proizvodService.getAllProizvod()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data)}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}
  }

  public openDialog(flag: number, id?: number, naziv?:string, proizvodjac?:Proizvodjac){
    const dialogRef = this.dialog.open(ProizvodDialogComponent, {data: {id, naziv, proizvodjac}});
    dialogRef.componentInstance.flag= flag;
    dialogRef.afterClosed()
      .subscribe(result=> {
        if (result===1){
          this.loadData();
        }
      })
  }
  public selectRow(row: any){
    console.log(row);
    this.selectedProizvodTop=row;
  }
  public applyFilter (filter: any){
    filter= filter.target.value;
    filter= filter.trim();
    filter= filter.toLocaleLowerCase();
    this.dataSource.filter= filter;

  }



}
