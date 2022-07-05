import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService) { }

  ngOnInit(): void {
  }

  public add(): void
  {
    this.racunService.addRacun(this.data)
    .subscribe(data=> {
      this.snackBar.open('Uspesno dodat racun: ' + data.id, 'U redu', {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name+ '-->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {duration: 2500});
    };
    
  }
  public update(): void{
    this.racunService.updateRacun(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno modifikovan racun: ' +data.id, 'U redu', {duration: 2500});
    }),
    (error: Error)=> {
      console.log(error.name+ '-->' +error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {duration: 2500});
    };
  }

  public delete(): void{
    this.racunService.deleteRacun(this.data.id)
    .subscribe(()=> {
      this.snackBar.open('Uspesno obrisan artikl', 'U redu', {duration:2500});
    }),
    (error: Error)=> {
      console.log (error.name+ '-->' +error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {duration: 2500});
    };
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {duration:1000});
  }

}
