import { Component, OnInit, Input } from '@angular/core';
import { Transportista } from '../../models/transportista';
import { TransportistaService } from '../../services/transportista.service';

@Component({
  selector: 'transportistas',
  templateUrl: './transportistas.component.html',
  styleUrls: ['./transportistas.component.css']
})

export class TransportistasComponent implements OnInit {

  @Input()
  private transportistas: Transportista[];

  public columns: Array<any> = [  
    { title: 'Chofer', name: 'chofer', sort: 'asc' },
    { title: 'Chasis', name: 'patenteChasis', sort: '' },
    { title: 'Acoplado', name: 'patenteAcoplado', sort: '' },
    { title: 'Transporte', name: 'nombreTransporte', sort: '' },    
    {title: 'Estado', name: 'estado', sort: ''}
  ];

  constructor(
    private transportistaService: TransportistaService
  ) { }

  ngOnInit(): void {
    this.getTransportistas();
  }

  getTransportistas() {
    this.transportistaService.getTransportistas()
      .subscribe(
      transportistas => this.transportistas = transportistas,
      error => console.log(error),
      () => this.transportistas.forEach(t => {
        t.nombreTransporte = t.transporte.nombre;  
        t.estado = 'Disponible';     
      })
      );
  }


}