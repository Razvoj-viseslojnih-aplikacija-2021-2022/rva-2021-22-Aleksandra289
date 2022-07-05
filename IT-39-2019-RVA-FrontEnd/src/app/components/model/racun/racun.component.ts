import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';
import { MatDialog } from '@angular/material/dialog';
import { RacunDialogComponent } from '../../dialogs/racun-dialog/racun-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {
  displayedColumns= ['id', 'datum', 'nacinPlacanja', 'actions'];
  dataSource!: MatTableDataSource<Racun>;
  subscription!: Subscription;
  selectedRacunTop!: Racun;

  @ViewChild(MatSort, {static:false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  constructor(private racunService: RacunService, public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.subscription = this.racunService.getAllRacun()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort= this.sort
    this.dataSource.paginator= this.paginator}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}
  }

  public openDialog(flag: number, id?: number, datum?:Date, nacinPlacanja?:string ){
    const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id, datum, nacinPlacanja}});
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
    this.selectedRacunTop=row;
  }
  public applyFilter (filter: any){
    filter= filter.target.value;
    filter= filter.trim();
    filter= filter.toLocaleLowerCase();
    this.dataSource.filter= filter;

  }

}
