import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { TituloServiceService } from 'src/app/services/titulo-service.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  public noticias: any = [];

  constructor(
    private noticiasService: NoticiasService,
    private tituloService: TituloServiceService
  ) { }

  ngOnInit() {
    this.tituloService.changeMessage('Noticias');
    this.tituloService.changeParent(true);

    this.noticiasService.getNoticiasByTwitter().subscribe(
      Response => {
        this.noticias = Response;
      }
    );
  }

}
