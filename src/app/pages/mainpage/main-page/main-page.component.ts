import { Component } from '@angular/core';
import { LolsearchMatchdetail } from 'src/app/@core/models/lolsearch-matchdetail.model';
import { ParticipantDto } from 'src/app/@core/models/lolsearch-participantdto.model';
import { LolsearchService } from 'src/app/@core/service/lolsearch.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [LolsearchService],
})
export class MainPageComponent {
  constructor(private api: LolsearchService) {}
  nickname: string | undefined;
  matchList: LolsearchMatchdetail[] = [];

  searchButtonClick() {
    this.api.getPuid(this.nickname).subscribe((res) => {
      console.log('puuid', res.puuid);
      this.api.getMatchList(res.puuid).subscribe((res2) => {
        console.log(res2);

        res2.forEach((element: string) => {
          this.api.getMatchDetails(element).subscribe((res3) => {
            this.matchList.push(res3);

            this.matchList.forEach((element) => {
              if (element.info && element.info.participants) {
                element.info.participants = element.info.participants.filter((x) => {
                  return (x.summonerName === this.nickname);
                });

                console.log(this.matchList, 'if içi');
              }
            });
          });
        });
      });
    });
  }
}
