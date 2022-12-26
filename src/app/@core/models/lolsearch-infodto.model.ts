import { ParticipantDto } from './lolsearch-participantdto.model';

export class infoDto {
  gameEndTimestamp!: number;
  gameStartTimestamp!: number;
  gameMode!: string;
  participants!: ParticipantDto[];
}
