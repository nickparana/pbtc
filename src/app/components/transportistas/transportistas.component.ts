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
  private transportista: Transportista;

  public columns: Array<any> = [
    { title: 'Transporte', name: 'nombreTransporte' },
    { title: 'Nombre', name: 'nombre' },
    { title: 'Apellido', name: 'apellido' },
    { title: 'Chasis', name: 'patenteChasis' },
    { title: 'Acoplado', name: 'patenteAcoplado' },
    { title: 'Estado', name: 'estado' }
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
      error => console.log(error));
  }

}