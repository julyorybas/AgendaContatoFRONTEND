import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { AgendaContato } from 'src/app/models/AgendaContato';
import { agendaContatoService } from 'src/app/services/agendaContato.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [agendaContatoService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  /*displayedColumns: string[] = ['id', 'name', 'fone', 'email', 'actions'];*/
  displayedColumns: string[] = ['nome', 'fone', 'email', 'actions'];
  dataSource!: AgendaContato[];

  constructor(
    public dialog: MatDialog,
    public agendaContatoService: agendaContatoService
    ) {
      this.agendaContatoService.getElements()
        .subscribe((data: AgendaContato[]) => {
        this.dataSource = data;
      });
     }

  ngOnInit(): void {
  }

  openDialog(element: AgendaContato | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        /*id: null,*/
        nome: '',
        fone: '',
        email: ''
      } : {
        id: element.id,
        nome: element.nome,
        fone: element.fone,
        email: element.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)){
          this.agendaContatoService.editElement(result)
            .subscribe((data: AgendaContato) => {
              const index = this.dataSource.findIndex(p => p.id === data.id)
              this.dataSource[index] = data;
              this.table.renderRows();
            });
          
        } else {
          this.agendaContatoService.creatElements(result)
            .subscribe((data: AgendaContato) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  editElement(element: AgendaContato): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void{
    this.agendaContatoService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id === id);
      });
  }
}
