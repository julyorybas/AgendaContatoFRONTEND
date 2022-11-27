import { Component, OnInit, Inject } from '@angular/core';
import { AgendaContato } from 'src/app/models/AgendaContato';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: AgendaContato;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: AgendaContato,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
   ){}

    ngOnInit(): void {
      if(this.data.nome != null){
        this.isChange = true;
      } else {
        this.isChange = false;
      }
    }

  onCancel(): void {
    this.dialogRef.close();
  }


}
