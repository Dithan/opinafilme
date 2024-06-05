import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiIdService}from 'src/app/services/api-id.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {
  idFilme: string;
  nomeFilme = '';
  posterFilme = '';
  constructor(private route: ActivatedRoute,private apiserviceId : ApiIdService ) { }

  ngOnInit() :void{
    this.route.paramMap.subscribe(params => {
      this.idFilme = params.get('id');
      this.apiserviceId.getDadosDaAPIId(this.idFilme).subscribe(data => {
        this.nomeFilme = data.name;
        this.posterFilme = data.images[0].href;
      });
    });
  }


}
