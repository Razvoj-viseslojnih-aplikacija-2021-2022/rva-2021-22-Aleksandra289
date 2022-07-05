import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/models/proizvod';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  proizvodjaci!: Proizvodjac[];
  public flag!: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProizvodDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Proizvod,
              public proizvodService: ProizvodService,
              public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {
    this.proizvodjacService.getAllProizvodjac().subscribe(
      result => {
        this.proizvodjaci = result;
      }
    )
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add(): void
  {
    this.proizvodService.addProizvod(this.data)
    .subscribe(data=> {
      this.snackBar.open('Uspesno dodat proizvod: ' + data.naziv, 'U redu', {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name+ '-->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {duration: 2500});
    };
    
  }
  public update(): void{
    this.proizvodService.updateProizvod(this.data)
    .subscribe(data=>{
      this.snackBar.open('Uspesno modifikovan proizvod: ' +data.naziv, 'U redu', {duration: 2500});
    }),
    (error: Error)=> {
      console.log(error.name+ '-->' +error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {duration: 2500});
    };
  }

  public delete(): void{
    this.proizvodService.deleteProizvod(this.data.id)
    .subscribe(()=> {
      this.snackBar.open('Uspesno obrisan proizvod', 'U redu', {duration:2500});
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
