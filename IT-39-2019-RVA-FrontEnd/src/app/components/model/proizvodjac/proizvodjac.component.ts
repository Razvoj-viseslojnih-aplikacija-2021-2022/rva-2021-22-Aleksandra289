import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { ProizvodjacDialogComponent } from '../../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit, OnDestroy {
  displayedColumns= ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource!: MatTableDataSource<Proizvodjac>;
  subscription!: Subscription;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private proizvodjacService: ProizvodjacService,  public dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.subscription = this.proizvodjacService.getAllProizvodjac()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data)}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}
  }

  public openDialog(flag: number, id?: number, naziv?:string, adresa?:string, kontakt?:string  ){
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, {data: {id, naziv, adresa, kontakt}});
    dialogRef.componentInstance.flag= flag;
    dialogRef.afterClosed()
      .subscribe(result=> {
        if (result===1){
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
