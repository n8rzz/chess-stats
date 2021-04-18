// eslint-disable-next-line object-curly-newline
import { ChessRules, GameResult, IGame, TimeClass } from '../games.types';

export const validGameResponse: IGame = {
  url: 'https://www.chess.com/game/live/12366380735',
  pgn:
    // eslint-disable-next-line max-len
    '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "fafamnl"]\n[Black "n8rzz"]\n[Result "0-1"]\n[CurrentPosition "N1b3k1/pp3ppp/2n1p3/8/5Q2/2b5/P1P3PP/R1Bq1K1n w - -"]\n[Timezone "UTC"]\n[ECO "C42"]\n[ECOUrl "https://www.chess.com/openings/Petrovs-Defense"]\n[UTCDate "2021.04.17"]\n[UTCTime "02:42:21"]\n[WhiteElo "684"]\n[BlackElo "648"]\n[TimeControl "600"]\n[Termination "n8rzz won by checkmate"]\n[StartTime "02:42:21"]\n[EndDate "2021.04.17"]\n[EndTime "02:50:50"]\n[Link "https://www.chess.com/game/live/12366380735"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:59.3]} 2. Nf3 {[%clk 0:09:59.3]} 2... Nf6 {[%clk 0:09:56]} 3. d3 {[%clk 0:09:51.9]} 3... Nc6 {[%clk 0:09:51.9]} 4. Nc3 {[%clk 0:09:32.8]} 4... Bc5 {[%clk 0:09:49.6]} 5. Qd2 {[%clk 0:08:30.1]} 5... O-O {[%clk 0:09:39.5]} 6. d4 {[%clk 0:07:12.7]} 6... exd4 {[%clk 0:09:35.4]} 7. Nxd4 {[%clk 0:06:47.8]} 7... Bxd4 {[%clk 0:09:30.7]} 8. Nb5 {[%clk 0:06:34.1]} 8... Re8 {[%clk 0:09:10.5]} 9. Qf4 {[%clk 0:06:07.5]} 9... Nxe4 {[%clk 0:09:02.9]} 10. Nxc7 {[%clk 0:05:49.2]} 10... Nxf2+ {[%clk 0:08:59.7]} 11. Kd2 {[%clk 0:05:37.1]} 11... Nxh1 {[%clk 0:08:45.1]} 12. Bc4 {[%clk 0:04:48.9]} 12... Re6 {[%clk 0:08:11.3]} 13. Bxe6 {[%clk 0:04:30.5]} 13... dxe6 {[%clk 0:08:06.7]} 14. Nxa8 {[%clk 0:04:13.9]} 14... Bxb2+ {[%clk 0:08:04.3]} 15. Ke1 {[%clk 0:03:57.1]} 15... Bc3+ {[%clk 0:07:56.4]} 16. Kf1 {[%clk 0:03:47.5]} 16... Qd1# {[%clk 0:07:52.4]} 0-1\n',
  pgn_json: {},
  time_control: '600',
  end_time: 1618627850,
  rated: true,
  fen: 'N1b3k1/pp3ppp/2n1p3/8/5Q2/2b5/P1P3PP/R1Bq1K1n w - -',
  time_class: TimeClass.Rapid,
  rules: ChessRules.Chess,
  white: {
    rating: 684,
    result: GameResult.Checkmated,
    '@id': 'https://api.chess.com/pub/player/fafamnl',
    username: 'fafamnl',
  },
  black: {
    rating: 648,
    result: GameResult.Win,
    '@id': 'https://api.chess.com/pub/player/n8rzz',
    username: 'n8rzz',
  },
};
