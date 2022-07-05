import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { StavkaRacuna } from 'src/app/models/stavkaRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { StavkaRacunaService } from 'src/app/services/stavkaRacuna.service';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {

  public flag!: number;
  racuni!: Racun[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna,
    public stavkaRacunaService: StavkaRacunaService,
    public racunService: RacunService) { }

  ngOnInit(): void {
    this.racunService.getAllRacun().subscribe(
      result => {
        this.racuni = result;
      }
    )
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add() {
    this.stavkaRacunaService.addStavkaRacuna(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali stavku racuna: " + data.id, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.stavkaRacunaService.updateStavkaRacuna(this.data).subscribe
      (data => { this.snackBar.open("Stavka racuna: " + data.id + " je uspesno azurirana", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id).subscribe
      (() => { this.snackBar.open("Stavka racuna je uspesno obrisana", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od promena", "U redu", {duration:3500});
  }


}
