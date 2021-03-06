/* eslint-disable max-len */
import { GameResult, ChessRules, TimeClass } from '../games.constants';
import { IGame } from '../games.types';

// FIXME: #initial_setup is the same for each record, and possibly incorrect
//        adding as a placeholder until the prop is actually in use
export const gameListForSinglePeriod: IGame[] = [
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 619,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
    end_time: 1618638144,
    fen: 'r5k1/ppp3pp/2np4/b3P3/4P1n1/P1NP2P1/1PP4q/R1B2RK1 w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "n8rzz"]\n[Black "fistyourface"]\n[Result "0-1"]\n[CurrentPosition "r5k1/ppp3pp/2np4/b3P3/4P1n1/P1NP2P1/1PP4q/R1B2RK1 w - -"]\n[Timezone "UTC"]\n[ECO "C46"]\n[ECOUrl "https://www.chess.com/openings/Three-Knights-Opening-3...Bb4"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:35:30"]\n[WhiteElo "647"]\n[BlackElo "619"]\n[TimeControl "600"]\n[Termination "fistyourface won by checkmate"]\n[StartTime "05:35:30"]\n[EndDate "2021.04.17"]\n[EndTime "05:42:24"]\n[Link "https://www.chess.com/game/live/12376613803"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:58.3]} 2. Nf3 {[%clk 0:09:57.2]} 2... Nc6 {[%clk 0:09:43.8]} 3. Nc3 {[%clk 0:09:54.8]} 3... Bb4 {[%clk 0:09:21.4]} 4. a3 {[%clk 0:09:45.2]} 4... Ba5 {[%clk 0:09:11]} 5. Bc4 {[%clk 0:09:40.3]} 5... Nf6 {[%clk 0:09:01.6]} 6. O-O {[%clk 0:09:36.8]} 6... O-O {[%clk 0:08:35.7]} 7. d3 {[%clk 0:09:13.6]} 7... d6 {[%clk 0:08:15.7]} 8. Bxf7+ {[%clk 0:08:38.3]} 8... Rxf7 {[%clk 0:07:55.9]} 9. Ng5 {[%clk 0:08:29.4]} 9... Bg4 {[%clk 0:07:30.2]} 10. f3 {[%clk 0:08:08.9]} 10... Bh5 {[%clk 0:07:19.5]} 11. Nxf7 {[%clk 0:08:02.5]} 11... Kxf7 {[%clk 0:07:08.7]} 12. f4 {[%clk 0:07:49.8]} 12... Bxd1 {[%clk 0:07:01.1]} 13. Rxd1 {[%clk 0:07:47.3]} 13... Ng4 {[%clk 0:06:39.3]} 14. Rf1 {[%clk 0:07:42.1]} 14... Qh4 {[%clk 0:06:15.7]} 15. fxe5+ {[%clk 0:07:36.3]} 15... Kg8 {[%clk 0:05:52.4]} 16. g3 {[%clk 0:07:30.1]} 16... Qxh2# {[%clk 0:05:44.8]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12376613803',
    white: {
      rating: 647,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
  {
    accuracies: {
      black: 30,
      white: 10.7,
    },
    black: {
      rating: 654,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
    end_time: 1618639025,
    fen: '1r6/pp5p/2n2kp1/4p3/6QR/6P1/PPr4P/5K2 w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "fistyourface"]\n[Black "n8rzz"]\n[Result "0-1"]\n[CurrentPosition "1r6/pp5p/2n2kp1/4p3/6QR/6P1/PPr4P/5K2 w - -"]\n[Timezone "UTC"]\n[ECO "B02"]\n[ECOUrl "https://www.chess.com/openings/Alekhines-Defense-Samisch-Attack"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:42:50"]\n[WhiteElo "612"]\n[BlackElo "654"]\n[TimeControl "600"]\n[Termination "n8rzz won on time"]\n[StartTime "05:42:50"]\n[EndDate "2021.04.17"]\n[EndTime "05:57:05"]\n[Link "https://www.chess.com/game/live/12377183441"]\n\n1. e4 {[%clk 0:10:00]} 1... Nf6 {[%clk 0:10:00]} 2. e5 {[%clk 0:09:50.1]} 2... Nd5 {[%clk 0:09:53.2]} 3. Nc3 {[%clk 0:09:22.2]} 3... e6 {[%clk 0:09:50.4]} 4. Nf3 {[%clk 0:08:58.1]} 4... Nc6 {[%clk 0:09:49]} 5. d4 {[%clk 0:08:35.6]} 5... d6 {[%clk 0:09:36]} 6. Bg5 {[%clk 0:08:16.4]} 6... Be7 {[%clk 0:09:30.1]} 7. Bb5 {[%clk 0:08:08.7]} 7... O-O {[%clk 0:09:26.1]} 8. O-O {[%clk 0:08:04.6]} 8... f6 {[%clk 0:09:21]} 9. Bh4 {[%clk 0:07:53.1]} 9... dxe5 {[%clk 0:08:57.5]} 10. dxe5 {[%clk 0:06:58.5]} 10... fxe5 {[%clk 0:08:52]} 11. Re1 {[%clk 0:06:49]} 11... Bxh4 {[%clk 0:08:40]} 12. Nxh4 {[%clk 0:06:19.2]} 12... Qxh4 {[%clk 0:08:29.3]} 13. g3 {[%clk 0:06:05.6]} 13... Qf6 {[%clk 0:08:14.6]} 14. Qg4 {[%clk 0:05:13]} 14... Qxf2+ {[%clk 0:07:55.2]} 15. Kh1 {[%clk 0:04:51.8]} 15... Qd4 {[%clk 0:07:14.1]} 16. Re4 {[%clk 0:04:00.3]} 16... Qf2 {[%clk 0:06:57.7]} 17. Rf1 {[%clk 0:03:33]} 17... Qxf1+ {[%clk 0:06:55.5]} 18. Bxf1 {[%clk 0:03:22.2]} 18... Rxf1+ {[%clk 0:06:53.8]} 19. Kg2 {[%clk 0:03:08.2]} 19... Rc1 {[%clk 0:06:33.4]} 20. Nxd5 {[%clk 0:02:12.2]} 20... Rxc2+ {[%clk 0:06:26]} 21. Kf1 {[%clk 0:01:43.5]} 21... g6 {[%clk 0:06:19.2]} 22. Nxc7 {[%clk 0:01:26.8]} 22... Rb8 {[%clk 0:06:17]} 23. Nxe6 {[%clk 0:01:16.8]} 23... Bxe6 {[%clk 0:06:15.2]} 24. Qxe6+ {[%clk 0:01:11.1]} 24... Kg7 {[%clk 0:06:11.7]} 25. Qd7+ {[%clk 0:00:38.6]} 25... Kh6 {[%clk 0:06:08.2]} 26. Rh4+ {[%clk 0:00:27.7]} 26... Kg5 {[%clk 0:06:01.5]} 27. Qg4+ {[%clk 0:00:08.6]} 27... Kf6 {[%clk 0:05:59.2]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12377183441',
    white: {
      rating: 612,
      result: GameResult.Timeout,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
  },
  {
    accuracies: {
      black: 5,
      white: 74,
    },
    black: {
      rating: 605,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
    end_time: 1618639614,
    fen: 'r2q2k1/ppp2pQp/6pn/7N/8/1B6/P1P2K1P/8 b - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "n8rzz"]\n[Black "fistyourface"]\n[Result "1-0"]\n[CurrentPosition "r2q2k1/ppp2pQp/6pn/7N/8/1B6/P1P2K1P/8 b - -"]\n[Timezone "UTC"]\n[ECO "C55"]\n[ECOUrl "https://www.chess.com/openings/Italian-Game-Two-Knights-Defense-4.O-O"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:57:20"]\n[WhiteElo "661"]\n[BlackElo "605"]\n[TimeControl "600"]\n[Termination "n8rzz won by checkmate"]\n[StartTime "05:57:20"]\n[EndDate "2021.04.17"]\n[EndTime "06:06:54"]\n[Link "https://www.chess.com/game/live/12377833777"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:10:00]} 2. Nf3 {[%clk 0:09:56.9]} 2... Nc6 {[%clk 0:09:56.8]} 3. Bc4 {[%clk 0:09:53.4]} 3... Nf6 {[%clk 0:09:48.3]} 4. O-O {[%clk 0:09:52]} 4... d5 {[%clk 0:09:40.5]} 5. Bb3 {[%clk 0:09:45]} 5... dxe4 {[%clk 0:09:30.6]} 6. Ne1 {[%clk 0:09:35]} 6... Bg4 {[%clk 0:09:17.4]} 7. f3 {[%clk 0:09:32.1]} 7... exf3 {[%clk 0:09:14.6]} 8. gxf3 {[%clk 0:09:28.8]} 8... Bc5+ {[%clk 0:09:04.3]} 9. d4 {[%clk 0:09:21.9]} 9... Bxd4+ {[%clk 0:08:57.5]} 10. Kg2 {[%clk 0:09:16.2]} 10... Bh5 {[%clk 0:08:43.2]} 11. Nd3 {[%clk 0:09:10.1]} 11... O-O {[%clk 0:08:31.4]} 12. Qe1 {[%clk 0:09:00.6]} 12... Re8 {[%clk 0:08:19.9]} 13. Qg3 {[%clk 0:08:55.4]} 13... g6 {[%clk 0:07:44.4]} 14. Bh6 {[%clk 0:08:41.2]} 14... Bxb2 {[%clk 0:07:13.9]} 15. Nd2 {[%clk 0:08:33.2]} 15... Bxa1 {[%clk 0:06:55.5]} 16. Rxa1 {[%clk 0:08:29.5]} 16... e4 {[%clk 0:06:38.5]} 17. fxe4 {[%clk 0:08:22.3]} 17... Nxe4 {[%clk 0:06:24.1]} 18. Nxe4 {[%clk 0:07:42.1]} 18... Rxe4 {[%clk 0:06:19.8]} 19. Re1 {[%clk 0:07:40.7]} 19... Rxe1 {[%clk 0:05:37.1]} 20. Qxe1 {[%clk 0:07:38.5]} 20... Ne7 {[%clk 0:05:06]} 21. Qc3 {[%clk 0:07:24.4]} 21... Nf5 {[%clk 0:04:50.8]} 22. Nf4 {[%clk 0:07:18]} 22... Ne3+ {[%clk 0:04:35.6]} 23. Kf2 {[%clk 0:07:12.1]} 23... Nf5 {[%clk 0:03:37]} 24. Nxh5 {[%clk 0:07:08.1]} 24... Nxh6 {[%clk 0:03:32.7]} 25. Qg7# {[%clk 0:07:06.5]} 1-0\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12377833777',
    white: {
      rating: 661,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
];

export const gameListForDate: IGame[] = [
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 619,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
    end_time: 1618638144,
    fen: 'r5k1/ppp3pp/2np4/b3P3/4P1n1/P1NP2P1/1PP4q/R1B2RK1 w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "n8rzz"]\n[Black "fistyourface"]\n[Result "0-1"]\n[CurrentPosition "r5k1/ppp3pp/2np4/b3P3/4P1n1/P1NP2P1/1PP4q/R1B2RK1 w - -"]\n[Timezone "UTC"]\n[ECO "C46"]\n[ECOUrl "https://www.chess.com/openings/Three-Knights-Opening-3...Bb4"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:35:30"]\n[WhiteElo "647"]\n[BlackElo "619"]\n[TimeControl "600"]\n[Termination "fistyourface won by checkmate"]\n[StartTime "05:35:30"]\n[EndDate "2021.04.17"]\n[EndTime "05:42:24"]\n[Link "https://www.chess.com/game/live/12376613803"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:58.3]} 2. Nf3 {[%clk 0:09:57.2]} 2... Nc6 {[%clk 0:09:43.8]} 3. Nc3 {[%clk 0:09:54.8]} 3... Bb4 {[%clk 0:09:21.4]} 4. a3 {[%clk 0:09:45.2]} 4... Ba5 {[%clk 0:09:11]} 5. Bc4 {[%clk 0:09:40.3]} 5... Nf6 {[%clk 0:09:01.6]} 6. O-O {[%clk 0:09:36.8]} 6... O-O {[%clk 0:08:35.7]} 7. d3 {[%clk 0:09:13.6]} 7... d6 {[%clk 0:08:15.7]} 8. Bxf7+ {[%clk 0:08:38.3]} 8... Rxf7 {[%clk 0:07:55.9]} 9. Ng5 {[%clk 0:08:29.4]} 9... Bg4 {[%clk 0:07:30.2]} 10. f3 {[%clk 0:08:08.9]} 10... Bh5 {[%clk 0:07:19.5]} 11. Nxf7 {[%clk 0:08:02.5]} 11... Kxf7 {[%clk 0:07:08.7]} 12. f4 {[%clk 0:07:49.8]} 12... Bxd1 {[%clk 0:07:01.1]} 13. Rxd1 {[%clk 0:07:47.3]} 13... Ng4 {[%clk 0:06:39.3]} 14. Rf1 {[%clk 0:07:42.1]} 14... Qh4 {[%clk 0:06:15.7]} 15. fxe5+ {[%clk 0:07:36.3]} 15... Kg8 {[%clk 0:05:52.4]} 16. g3 {[%clk 0:07:30.1]} 16... Qxh2# {[%clk 0:05:44.8]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12376613803',
    white: {
      rating: 647,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
  {
    accuracies: {
      black: 20,
      white: 30,
    },
    black: {
      rating: 654,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
    end_time: 1618639025,
    fen: '1r6/pp5p/2n2kp1/4p3/6QR/6P1/PPr4P/5K2 w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "fistyourface"]\n[Black "n8rzz"]\n[Result "0-1"]\n[CurrentPosition "1r6/pp5p/2n2kp1/4p3/6QR/6P1/PPr4P/5K2 w - -"]\n[Timezone "UTC"]\n[ECO "B02"]\n[ECOUrl "https://www.chess.com/openings/Alekhines-Defense-Samisch-Attack"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:42:50"]\n[WhiteElo "612"]\n[BlackElo "654"]\n[TimeControl "600"]\n[Termination "n8rzz won on time"]\n[StartTime "05:42:50"]\n[EndDate "2021.04.17"]\n[EndTime "05:57:05"]\n[Link "https://www.chess.com/game/live/12377183441"]\n\n1. e4 {[%clk 0:10:00]} 1... Nf6 {[%clk 0:10:00]} 2. e5 {[%clk 0:09:50.1]} 2... Nd5 {[%clk 0:09:53.2]} 3. Nc3 {[%clk 0:09:22.2]} 3... e6 {[%clk 0:09:50.4]} 4. Nf3 {[%clk 0:08:58.1]} 4... Nc6 {[%clk 0:09:49]} 5. d4 {[%clk 0:08:35.6]} 5... d6 {[%clk 0:09:36]} 6. Bg5 {[%clk 0:08:16.4]} 6... Be7 {[%clk 0:09:30.1]} 7. Bb5 {[%clk 0:08:08.7]} 7... O-O {[%clk 0:09:26.1]} 8. O-O {[%clk 0:08:04.6]} 8... f6 {[%clk 0:09:21]} 9. Bh4 {[%clk 0:07:53.1]} 9... dxe5 {[%clk 0:08:57.5]} 10. dxe5 {[%clk 0:06:58.5]} 10... fxe5 {[%clk 0:08:52]} 11. Re1 {[%clk 0:06:49]} 11... Bxh4 {[%clk 0:08:40]} 12. Nxh4 {[%clk 0:06:19.2]} 12... Qxh4 {[%clk 0:08:29.3]} 13. g3 {[%clk 0:06:05.6]} 13... Qf6 {[%clk 0:08:14.6]} 14. Qg4 {[%clk 0:05:13]} 14... Qxf2+ {[%clk 0:07:55.2]} 15. Kh1 {[%clk 0:04:51.8]} 15... Qd4 {[%clk 0:07:14.1]} 16. Re4 {[%clk 0:04:00.3]} 16... Qf2 {[%clk 0:06:57.7]} 17. Rf1 {[%clk 0:03:33]} 17... Qxf1+ {[%clk 0:06:55.5]} 18. Bxf1 {[%clk 0:03:22.2]} 18... Rxf1+ {[%clk 0:06:53.8]} 19. Kg2 {[%clk 0:03:08.2]} 19... Rc1 {[%clk 0:06:33.4]} 20. Nxd5 {[%clk 0:02:12.2]} 20... Rxc2+ {[%clk 0:06:26]} 21. Kf1 {[%clk 0:01:43.5]} 21... g6 {[%clk 0:06:19.2]} 22. Nxc7 {[%clk 0:01:26.8]} 22... Rb8 {[%clk 0:06:17]} 23. Nxe6 {[%clk 0:01:16.8]} 23... Bxe6 {[%clk 0:06:15.2]} 24. Qxe6+ {[%clk 0:01:11.1]} 24... Kg7 {[%clk 0:06:11.7]} 25. Qd7+ {[%clk 0:00:38.6]} 25... Kh6 {[%clk 0:06:08.2]} 26. Rh4+ {[%clk 0:00:27.7]} 26... Kg5 {[%clk 0:06:01.5]} 27. Qg4+ {[%clk 0:00:08.6]} 27... Kf6 {[%clk 0:05:59.2]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12377183441',
    white: {
      rating: 612,
      result: GameResult.Timeout,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
  },
  {
    accuracies: {
      black: 32,
      white: 44,
    },
    black: {
      rating: 605,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/fistyourface',
      username: 'fistyourface',
    },
    end_time: 1618639614,
    fen: 'r2q2k1/ppp2pQp/6pn/7N/8/1B6/P1P2K1P/8 b - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "n8rzz"]\n[Black "fistyourface"]\n[Result "1-0"]\n[CurrentPosition "r2q2k1/ppp2pQp/6pn/7N/8/1B6/P1P2K1P/8 b - -"]\n[Timezone "UTC"]\n[ECO "C55"]\n[ECOUrl "https://www.chess.com/openings/Italian-Game-Two-Knights-Defense-4.O-O"]\n[UTCDate "2021.04.17"]\n[UTCTime "05:57:20"]\n[WhiteElo "661"]\n[BlackElo "605"]\n[TimeControl "600"]\n[Termination "n8rzz won by checkmate"]\n[StartTime "05:57:20"]\n[EndDate "2021.04.17"]\n[EndTime "06:06:54"]\n[Link "https://www.chess.com/game/live/12377833777"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:10:00]} 2. Nf3 {[%clk 0:09:56.9]} 2... Nc6 {[%clk 0:09:56.8]} 3. Bc4 {[%clk 0:09:53.4]} 3... Nf6 {[%clk 0:09:48.3]} 4. O-O {[%clk 0:09:52]} 4... d5 {[%clk 0:09:40.5]} 5. Bb3 {[%clk 0:09:45]} 5... dxe4 {[%clk 0:09:30.6]} 6. Ne1 {[%clk 0:09:35]} 6... Bg4 {[%clk 0:09:17.4]} 7. f3 {[%clk 0:09:32.1]} 7... exf3 {[%clk 0:09:14.6]} 8. gxf3 {[%clk 0:09:28.8]} 8... Bc5+ {[%clk 0:09:04.3]} 9. d4 {[%clk 0:09:21.9]} 9... Bxd4+ {[%clk 0:08:57.5]} 10. Kg2 {[%clk 0:09:16.2]} 10... Bh5 {[%clk 0:08:43.2]} 11. Nd3 {[%clk 0:09:10.1]} 11... O-O {[%clk 0:08:31.4]} 12. Qe1 {[%clk 0:09:00.6]} 12... Re8 {[%clk 0:08:19.9]} 13. Qg3 {[%clk 0:08:55.4]} 13... g6 {[%clk 0:07:44.4]} 14. Bh6 {[%clk 0:08:41.2]} 14... Bxb2 {[%clk 0:07:13.9]} 15. Nd2 {[%clk 0:08:33.2]} 15... Bxa1 {[%clk 0:06:55.5]} 16. Rxa1 {[%clk 0:08:29.5]} 16... e4 {[%clk 0:06:38.5]} 17. fxe4 {[%clk 0:08:22.3]} 17... Nxe4 {[%clk 0:06:24.1]} 18. Nxe4 {[%clk 0:07:42.1]} 18... Rxe4 {[%clk 0:06:19.8]} 19. Re1 {[%clk 0:07:40.7]} 19... Rxe1 {[%clk 0:05:37.1]} 20. Qxe1 {[%clk 0:07:38.5]} 20... Ne7 {[%clk 0:05:06]} 21. Qc3 {[%clk 0:07:24.4]} 21... Nf5 {[%clk 0:04:50.8]} 22. Nf4 {[%clk 0:07:18]} 22... Ne3+ {[%clk 0:04:35.6]} 23. Kf2 {[%clk 0:07:12.1]} 23... Nf5 {[%clk 0:03:37]} 24. Nxh5 {[%clk 0:07:08.1]} 24... Nxh6 {[%clk 0:03:32.7]} 25. Qg7# {[%clk 0:07:06.5]} 1-0\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12377833777',
    white: {
      rating: 661,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
  {
    accuracies: {
      black: 86,
      white: 32,
    },
    black: {
      rating: 653,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
    end_time: 1618679592,
    fen: '8/5Q2/6k1/1p6/3P2n1/6K1/PP4PP/RNB2R2 b - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "PetrJir"]\n[Black "n8rzz"]\n[Result "1-0"]\n[CurrentPosition "8/5Q2/6k1/1p6/3P2n1/6K1/PP4PP/RNB2R2 b - -"]\n[Timezone "UTC"]\n[ECO "C42"]\n[ECOUrl "https://www.chess.com/openings/Petrovs-Defense-Urusov-Gambit"]\n[UTCDate "2021.04.17"]\n[UTCTime "17:07:05"]\n[WhiteElo "676"]\n[BlackElo "653"]\n[TimeControl "600"]\n[Termination "PetrJir won by checkmate"]\n[StartTime "17:07:05"]\n[EndDate "2021.04.17"]\n[EndTime "17:13:12"]\n[Link "https://www.chess.com/game/live/12418098763"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:59.8]} 2. Nf3 {[%clk 0:09:59.6]} 2... Nf6 {[%clk 0:09:58.1]} 3. Bc4 {[%clk 0:09:58.4]} 3... d5 {[%clk 0:09:50.2]} 4. exd5 {[%clk 0:09:53.5]} 4... Bc5 {[%clk 0:09:40.4]} 5. Nxe5 {[%clk 0:09:49.7]} 5... Ne4 {[%clk 0:09:30.7]} 6. Qf3 {[%clk 0:09:17.6]} 6... Bxf2+ {[%clk 0:09:28]} 7. Ke2 {[%clk 0:09:10.1]} 7... f5 {[%clk 0:09:09.7]} 8. Qh5+ {[%clk 0:09:05.9]} 8... g6 {[%clk 0:09:07.9]} 9. Qh6 {[%clk 0:08:57.3]} 9... Qg5 {[%clk 0:08:39.6]} 10. Qg7 {[%clk 0:08:45.1]} 10... Qe7 {[%clk 0:08:18.4]} 11. Qxh8+ {[%clk 0:08:43.7]} 11... Qf8 {[%clk 0:08:15.1]} 12. Qxh7 {[%clk 0:08:38.3]} 12... f4 {[%clk 0:08:09.6]} 13. Qxg6+ {[%clk 0:08:32.9]} 13... Ke7 {[%clk 0:07:59.4]} 14. Qxe4 {[%clk 0:08:17.9]} 14... Bg4+ {[%clk 0:07:56.9]} 15. Kxf2 {[%clk 0:08:13.9]} 15... Bf5 {[%clk 0:07:54]} 16. Qxf4 {[%clk 0:08:08.5]} 16... Bxc2 {[%clk 0:07:47.6]} 17. Ng6+ {[%clk 0:08:06.6]} 17... Kd7 {[%clk 0:07:40.9]} 18. Nxf8+ {[%clk 0:08:04.7]} 18... Ke8 {[%clk 0:07:28.6]} 19. Bb5+ {[%clk 0:07:57.2]} 19... c6 {[%clk 0:07:27.3]} 20. dxc6 {[%clk 0:07:56.1]} 20... bxc6 {[%clk 0:07:25.6]} 21. Qe5+ {[%clk 0:07:45.2]} 21... Kxf8 {[%clk 0:07:22.4]} 22. Qc5+ {[%clk 0:07:31.7]} 22... Kf7 {[%clk 0:07:17.5]} 23. Qxc2 {[%clk 0:07:30.5]} 23... cxb5 {[%clk 0:07:16.2]} 24. Qe4 {[%clk 0:07:22.8]} 24... Nd7 {[%clk 0:07:10.7]} 25. Qxa8 {[%clk 0:07:21.1]} 25... Ne5 {[%clk 0:07:09.3]} 26. Qxa7+ {[%clk 0:07:20.1]} 26... Kf6 {[%clk 0:07:07.7]} 27. d4 {[%clk 0:07:18.5]} 27... Ng4+ {[%clk 0:07:06.3]} 28. Kg3 {[%clk 0:07:16.1]} 28... Kf5 {[%clk 0:07:02.1]} 29. Rf1+ {[%clk 0:07:14.8]} 29... Kg6 {[%clk 0:06:56.5]} 30. Qf7# {[%clk 0:07:11.9]} 1-0\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12418098763',
    white: {
      rating: 676,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/petrjir',
      username: 'PetrJir',
    },
  },
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 660,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
    end_time: 1618679960,
    fen: 'r4rk1/ppp2ppp/3p4/3Pp3/1PP2Rb1/P2qB1P1/6PP/R6K b - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "playty"]\n[Black "n8rzz"]\n[Result "0-1"]\n[CurrentPosition "r4rk1/ppp2ppp/3p4/3Pp3/1PP2Rb1/P2qB1P1/6PP/R6K b - -"]\n[Timezone "UTC"]\n[ECO "C42"]\n[ECOUrl "https://www.chess.com/openings/Petrovs-Defense-Three-Knights-Game"]\n[UTCDate "2021.04.17"]\n[UTCTime "17:15:49"]\n[WhiteElo "606"]\n[BlackElo "660"]\n[TimeControl "600"]\n[Termination "n8rzz won by resignation"]\n[StartTime "17:15:49"]\n[EndDate "2021.04.17"]\n[EndTime "17:19:20"]\n[Link "https://www.chess.com/game/live/12418673097"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:59.3]} 2. Nc3 {[%clk 0:09:58.6]} 2... Nf6 {[%clk 0:09:54.7]} 3. Nf3 {[%clk 0:09:56.4]} 3... Nc6 {[%clk 0:09:47.8]} 4. Bb5 {[%clk 0:09:53.8]} 4... Bc5 {[%clk 0:09:43.5]} 5. O-O {[%clk 0:09:49.5]} 5... O-O {[%clk 0:09:41.8]} 6. a3 {[%clk 0:09:38.4]} 6... d6 {[%clk 0:09:36.3]} 7. b4 {[%clk 0:09:36.2]} 7... Bd4 {[%clk 0:09:26.5]} 8. Nxd4 {[%clk 0:09:34.1]} 8... Nxd4 {[%clk 0:09:16.3]} 9. Nd5 {[%clk 0:09:22.1]} 9... Nxd5 {[%clk 0:09:03.9]} 10. exd5 {[%clk 0:09:20.6]} 10... Qg5 {[%clk 0:08:55.4]} 11. d3 {[%clk 0:09:11.3]} 11... Qg6 {[%clk 0:08:51.6]} 12. c3 {[%clk 0:09:09]} 12... Nxb5 {[%clk 0:08:47.3]} 13. c4 {[%clk 0:09:04.1]} 13... Bh3 {[%clk 0:08:45.6]} 14. Qf3 {[%clk 0:08:54.3]} 14... Bg4 {[%clk 0:08:19.4]} 15. Qg3 {[%clk 0:08:48.9]} 15... Nd4 {[%clk 0:08:15.4]} 16. Be3 {[%clk 0:08:40.5]} 16... Ne2+ {[%clk 0:08:14.1]} 17. Kh1 {[%clk 0:08:38.4]} 17... Nxg3+ {[%clk 0:08:12.4]} 18. fxg3 {[%clk 0:08:37.6]} 18... Qxd3 {[%clk 0:08:06.8]} 19. Rf4 {[%clk 0:08:35.3]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12418673097',
    white: {
      rating: 606,
      result: GameResult.Resigned,
      '@id': 'https://api.chess.com/pub/player/playty',
      username: 'playty',
    },
  },
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 689,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/tdeelab',
      username: 'tdeelab',
    },
    end_time: 1618680490,
    fen: 'r1b5/ppkp1Q1p/8/1Rp2p2/6q1/6K1/P4PPP/5B1R w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "n8rzz"]\n[Black "tdeelab"]\n[Result "0-1"]\n[CurrentPosition "r1b5/ppkp1Q1p/8/1Rp2p2/6q1/6K1/P4PPP/5B1R w - -"]\n[Timezone "UTC"]\n[ECO "C44"]\n[ECOUrl "https://www.chess.com/openings/Scotch-Game"]\n[UTCDate "2021.04.17"]\n[UTCTime "17:21:32"]\n[WhiteElo "652"]\n[BlackElo "689"]\n[TimeControl "600"]\n[Termination "tdeelab won by checkmate"]\n[StartTime "17:21:32"]\n[EndDate "2021.04.17"]\n[EndTime "17:28:10"]\n[Link "https://www.chess.com/game/live/12419192439"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:49.3]} 2. Nf3 {[%clk 0:09:56]} 2... Nc6 {[%clk 0:09:45.6]} 3. d4 {[%clk 0:09:47.8]} 3... Bb4+ {[%clk 0:09:34.7]} 4. Nc3 {[%clk 0:09:43.4]} 4... Nxd4 {[%clk 0:09:30.7]} 5. Nxd4 {[%clk 0:09:35.3]} 5... c5 {[%clk 0:09:05.2]} 6. Nf5 {[%clk 0:09:19.3]} 6... Qa5 {[%clk 0:08:53.8]} 7. Qd6 {[%clk 0:09:07.9]} 7... Bxc3+ {[%clk 0:08:51.2]} 8. Bd2 {[%clk 0:09:03.8]} 8... Bxd2+ {[%clk 0:08:47.9]} 9. Ke2 {[%clk 0:08:59.4]} 9... g6 {[%clk 0:08:16.6]} 10. Qxe5+ {[%clk 0:08:57.2]} 10... Kd8 {[%clk 0:08:08.4]} 11. Qxh8 {[%clk 0:08:51.7]} 11... Bc3 {[%clk 0:07:38.9]} 12. Qxg8+ {[%clk 0:08:44.2]} 12... Kc7 {[%clk 0:07:36.2]} 13. bxc3 {[%clk 0:08:37.8]} 13... Qxc3 {[%clk 0:07:34.6]} 14. Rb1 {[%clk 0:08:11.7]} 14... Qc4+ {[%clk 0:07:31.3]} 15. Kf3 {[%clk 0:07:56]} 15... Qxc2 {[%clk 0:07:18.2]} 16. Rb5 {[%clk 0:07:37.1]} 16... gxf5 {[%clk 0:07:02.5]} 17. Qxf7 {[%clk 0:07:03.9]} 17... Qxe4+ {[%clk 0:06:52.4]} 18. Kg3 {[%clk 0:06:53.9]} 18... Qg4# {[%clk 0:06:37.4]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12419192439',
    white: {
      rating: 652,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 661,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
    end_time: 1618680729,
    fen: 'r3k2r/pp3pp1/7p/2bp4/4PPQ1/8/P4qPP/3R1KNR w kq -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.17"]\n[Round "-"]\n[White "tdeelab"]\n[Black "n8rzz"]\n[Result "0-1"]\n[CurrentPosition "r3k2r/pp3pp1/7p/2bp4/4PPQ1/8/P4qPP/3R1KNR w kq -"]\n[Timezone "UTC"]\n[ECO "A00"]\n[ECOUrl "https://www.chess.com/openings/Van-Geet-Opening-1...Nc6-2.d4-d5"]\n[UTCDate "2021.04.17"]\n[UTCTime "17:28:23"]\n[WhiteElo "680"]\n[BlackElo "661"]\n[TimeControl "600"]\n[Termination "n8rzz won by checkmate"]\n[StartTime "17:28:23"]\n[EndDate "2021.04.17"]\n[EndTime "17:32:09"]\n[Link "https://www.chess.com/game/live/12419323473"]\n\n1. d4 {[%clk 0:10:00]} 1... d5 {[%clk 0:10:00]} 2. Nc3 {[%clk 0:09:56.7]} 2... Nc6 {[%clk 0:09:56.1]} 3. f3 {[%clk 0:09:48.1]} 3... Nf6 {[%clk 0:09:40.8]} 4. Be3 {[%clk 0:09:46.2]} 4... e5 {[%clk 0:09:36.7]} 5. dxe5 {[%clk 0:09:42.8]} 5... Nxe5 {[%clk 0:09:34.8]} 6. Bg5 {[%clk 0:09:36.1]} 6... h6 {[%clk 0:09:32.8]} 7. Bxf6 {[%clk 0:09:34.6]} 7... Qxf6 {[%clk 0:09:29.5]} 8. Nxd5 {[%clk 0:09:28.3]} 8... Qd6 {[%clk 0:09:25.7]} 9. e4 {[%clk 0:09:18.9]} 9... c6 {[%clk 0:09:20]} 10. f4 {[%clk 0:08:58.7]} 10... Bg4 {[%clk 0:09:13.5]} 11. Be2 {[%clk 0:08:54.3]} 11... cxd5 {[%clk 0:08:56.1]} 12. Bxg4 {[%clk 0:08:44]} 12... Nxg4 {[%clk 0:08:54.7]} 13. Qxg4 {[%clk 0:08:42.5]} 13... Qb4+ {[%clk 0:08:51.1]} 14. c3 {[%clk 0:08:37.8]} 14... Qxb2 {[%clk 0:08:49.8]} 15. Rd1 {[%clk 0:08:29.4]} 15... Qxc3+ {[%clk 0:08:44.8]} 16. Kf2 {[%clk 0:08:17.7]} 16... Bc5+ {[%clk 0:08:41.1]} 17. Ke2 {[%clk 0:07:55.6]} 17... Qe3+ {[%clk 0:08:36.6]} 18. Kf1 {[%clk 0:07:48.8]} 18... Qf2# {[%clk 0:08:34.5]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12419323473',
    white: {
      rating: 680,
      result: GameResult.Checkmated,
      '@id': 'https://api.chess.com/pub/player/tdeelab',
      username: 'tdeelab',
    },
  },
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 604,
      result: GameResult.Resigned,
      '@id': 'https://api.chess.com/pub/player/narenar',
      username: 'narenar',
    },
    end_time: 1618708852,
    fen: '1k1r4/8/B2p3p/P1p1p3/1p5P/5RP1/1R3P2/6K1 b - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.18"]\n[Round "-"]\n[White "n8rzz"]\n[Black "narenar"]\n[Result "1-0"]\n[CurrentPosition "1k1r4/8/B2p3p/P1p1p3/1p5P/5RP1/1R3P2/6K1 b - -"]\n[Timezone "UTC"]\n[ECO "C42"]\n[ECOUrl "https://www.chess.com/openings/Petrovs-Defense-Classical-Damiano-Variation-Kholmov-Gambit"]\n[UTCDate "2021.04.18"]\n[UTCTime "01:08:24"]\n[WhiteElo "668"]\n[BlackElo "604"]\n[TimeControl "600"]\n[Termination "n8rzz won by resignation"]\n[StartTime "01:08:24"]\n[EndDate "2021.04.18"]\n[EndTime "01:20:52"]\n[Link "https://www.chess.com/game/live/12446845505"]\n\n1. e4 {[%clk 0:09:58.9]} 1... e5 {[%clk 0:09:58.5]} 2. Nf3 {[%clk 0:09:57.9]} 2... Nf6 {[%clk 0:09:52.5]} 3. Nxe5 {[%clk 0:09:55.6]} 3... Nxe4 {[%clk 0:09:51.4]} 4. Qe2 {[%clk 0:09:54.7]} 4... Qe7 {[%clk 0:09:47.4]} 5. Qxe4 {[%clk 0:09:51.7]} 5... f6 {[%clk 0:09:45.5]} 6. Qd5 {[%clk 0:09:25.2]} 6... Qxe5+ {[%clk 0:09:34.3]} 7. Qxe5+ {[%clk 0:09:23.4]} 7... fxe5 {[%clk 0:09:32.8]} 8. Bc4 {[%clk 0:09:17.1]} 8... Bc5 {[%clk 0:09:24.3]} 9. Nc3 {[%clk 0:09:11.3]} 9... d6 {[%clk 0:09:21.5]} 10. O-O {[%clk 0:09:05.4]} 10... Bf5 {[%clk 0:09:11.3]} 11. d3 {[%clk 0:09:03.1]} 11... g6 {[%clk 0:09:05.4]} 12. Bg5 {[%clk 0:08:53.4]} 12... Nc6 {[%clk 0:08:51.8]} 13. Rfe1 {[%clk 0:08:43.4]} 13... h6 {[%clk 0:08:13.5]} 14. Bf6 {[%clk 0:08:30.9]} 14... Rf8 {[%clk 0:07:59.7]} 15. Bh4 {[%clk 0:08:14.8]} 15... g5 {[%clk 0:07:58.2]} 16. Bg3 {[%clk 0:08:12]} 16... O-O-O {[%clk 0:07:50.3]} 17. Rad1 {[%clk 0:08:10.9]} 17... b6 {[%clk 0:07:29.1]} 18. d4 {[%clk 0:08:07.4]} 18... Bxd4 {[%clk 0:07:15.7]} 19. Ne4 {[%clk 0:08:01.6]} 19... Bxb2 {[%clk 0:06:57.4]} 20. Ba6+ {[%clk 0:07:48.4]} 20... Kb8 {[%clk 0:06:43.4]} 21. a4 {[%clk 0:07:28.5]} 21... Nb4 {[%clk 0:06:31.4]} 22. Rb1 {[%clk 0:07:16]} 22... Nxc2 {[%clk 0:05:26.9]} 23. Re2 {[%clk 0:06:56.3]} 23... Na3 {[%clk 0:04:36.8]} 24. Rbxb2 {[%clk 0:06:35.5]} 24... Bxe4 {[%clk 0:04:05]} 25. Rxe4 {[%clk 0:06:32.8]} 25... Rf4 {[%clk 0:03:50.4]} 26. Bxf4 {[%clk 0:06:30.6]} 26... gxf4 {[%clk 0:03:49.1]} 27. g3 {[%clk 0:06:27.3]} 27... f3 {[%clk 0:03:34]} 28. h4 {[%clk 0:06:22.2]} 28... c5 {[%clk 0:02:57.8]} 29. a5 {[%clk 0:06:16.1]} 29... b5 {[%clk 0:02:40.8]} 30. Re3 {[%clk 0:06:13.2]} 30... b4 {[%clk 0:02:37.8]} 31. Rxf3 {[%clk 0:06:10.6]} 31... Nc4 {[%clk 0:02:14.1]} 32. Bxc4 {[%clk 0:05:54.1]} 32... a6 {[%clk 0:02:04.5]} 33. Bxa6 {[%clk 0:05:51.7]} 1-0\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12446845505',
    white: {
      rating: 668,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
  {
    accuracies: {
      black: 50.2,
      white: 97.1,
    },
    black: {
      rating: 715,
      result: GameResult.Win,
      '@id': 'https://api.chess.com/pub/player/bennics',
      username: 'bennics',
    },
    end_time: 1618710449,
    fen: '8/8/6K1/q7/7q/8/6k1/8 w - -',
    initial_setup: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    pgn:
      '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2021.04.18"]\n[Round "-"]\n[White "n8rzz"]\n[Black "bennics"]\n[Result "0-1"]\n[CurrentPosition "8/8/6K1/q7/7q/8/6k1/8 w - -"]\n[Timezone "UTC"]\n[ECO "C40"]\n[ECOUrl "https://www.chess.com/openings/Kings-Pawn-Opening-Kings-Knight-McConnell-Defense"]\n[UTCDate "2021.04.18"]\n[UTCTime "01:33:11"]\n[WhiteElo "661"]\n[BlackElo "715"]\n[TimeControl "600"]\n[Termination "bennics won by resignation"]\n[StartTime "01:33:11"]\n[EndDate "2021.04.18"]\n[EndTime "01:47:29"]\n[Link "https://www.chess.com/game/live/12448586317"]\n\n1. e4 {[%clk 0:10:00]} 1... e5 {[%clk 0:09:59.3]} 2. Nf3 {[%clk 0:09:59.5]} 2... Qf6 {[%clk 0:09:56.7]} 3. g3 {[%clk 0:09:50.2]} 3... Bc5 {[%clk 0:09:53.8]} 4. d4 {[%clk 0:09:46.3]} 4... exd4 {[%clk 0:09:48]} 5. c3 {[%clk 0:09:38]} 5... Nc6 {[%clk 0:09:23.2]} 6. Bf4 {[%clk 0:09:28.8]} 6... d6 {[%clk 0:09:13.3]} 7. Bc4 {[%clk 0:09:15.1]} 7... Bg4 {[%clk 0:08:36.5]} 8. Qa4 {[%clk 0:09:01.9]} 8... Bxf3 {[%clk 0:08:27.4]} 9. Rg1 {[%clk 0:08:47.7]} 9... Ne7 {[%clk 0:08:00.9]} 10. Nd2 {[%clk 0:08:40.2]} 10... O-O {[%clk 0:07:58.3]} 11. Nxf3 {[%clk 0:08:38.5]} 11... dxc3 {[%clk 0:07:47.9]} 12. bxc3 {[%clk 0:08:23.3]} 12... a6 {[%clk 0:07:30]} 13. Qb3 {[%clk 0:08:17.3]} 13... b5 {[%clk 0:07:27.2]} 14. e5 {[%clk 0:08:13.7]} 14... Qh6 {[%clk 0:07:14.2]} 15. Bxh6 {[%clk 0:08:11.7]} 15... gxh6 {[%clk 0:07:08.9]} 16. Bd3 {[%clk 0:08:03.2]} 16... Nxe5 {[%clk 0:07:02.1]} 17. Nxe5 {[%clk 0:08:00.7]} 17... dxe5 {[%clk 0:07:00.1]} 18. c4 {[%clk 0:07:56.8]} 18... bxc4 {[%clk 0:06:54.1]} 19. Qxc4 {[%clk 0:07:53.9]} 19... Bxf2+ {[%clk 0:06:52.8]} 20. Kxf2 {[%clk 0:07:51.5]} 20... Kg7 {[%clk 0:06:23.3]} 21. Qg4+ {[%clk 0:07:50]} 21... Ng6 {[%clk 0:06:18.4]} 22. Rab1 {[%clk 0:07:28.2]} 22... Rfd8 {[%clk 0:06:15.3]} 23. Rgd1 {[%clk 0:07:22.3]} 23... f6 {[%clk 0:06:06.2]} 24. Rb7 {[%clk 0:07:11.4]} 24... Rf8 {[%clk 0:05:50.1]} 25. Rxc7+ {[%clk 0:07:08.8]} 25... Rf7 {[%clk 0:05:44.3]} 26. Be4 {[%clk 0:06:59.3]} 26... Rxc7 {[%clk 0:05:38.3]} 27. Bxa8 {[%clk 0:06:57.9]} 27... Rf7 {[%clk 0:05:30.4]} 28. Rd8 {[%clk 0:06:48.8]} 28... f5 {[%clk 0:05:26.1]} 29. Qc4 {[%clk 0:06:32.4]} 29... Rf6 {[%clk 0:05:11.9]} 30. Qc7+ {[%clk 0:06:29.7]} 30... Rf7 {[%clk 0:05:07.6]} 31. Bd5 {[%clk 0:06:22.2]} 31... Rxc7 {[%clk 0:05:02.2]} 32. Ra8 {[%clk 0:06:06.6]} 32... Rc2+ {[%clk 0:04:56.9]} 33. Ke3 {[%clk 0:06:03.7]} 33... Rxh2 {[%clk 0:04:54.1]} 34. Ra7+ {[%clk 0:05:56.1]} 34... Kf6 {[%clk 0:04:50.9]} 35. Rf7+ {[%clk 0:05:53.7]} 35... Kg5 {[%clk 0:04:47.2]} 36. Rxh7 {[%clk 0:05:48.7]} 36... f4+ {[%clk 0:04:44.6]} 37. gxf4+ {[%clk 0:05:46.1]} 37... exf4+ {[%clk 0:04:43.5]} 38. Ke4 {[%clk 0:05:43.3]} 38... f3 {[%clk 0:04:41.5]} 39. Bc4 {[%clk 0:05:33.7]} 39... Rh4+ {[%clk 0:04:25.4]} 40. Kxf3 {[%clk 0:05:32]} 40... Rxc4 {[%clk 0:04:23.5]} 41. Ra7 {[%clk 0:05:23.6]} 41... Ra4 {[%clk 0:04:19.8]} 42. Ke3 {[%clk 0:05:09.4]} 42... Rxa2 {[%clk 0:04:16.8]} 43. Ke4 {[%clk 0:05:02.8]} 43... h5 {[%clk 0:04:11.9]} 44. Re7 {[%clk 0:04:50.9]} 44... h4 {[%clk 0:04:09.7]} 45. Rh7 {[%clk 0:04:15.3]} 45... Kg4 {[%clk 0:03:59.1]} 46. Rg7 {[%clk 0:04:12.6]} 46... Kg5 {[%clk 0:03:55.3]} 47. Kd5 {[%clk 0:04:08.8]} 47... h3 {[%clk 0:03:49.4]} 48. Rh7 {[%clk 0:04:07.2]} 48... Kg4 {[%clk 0:03:47.2]} 49. Kc6 {[%clk 0:04:03.8]} 49... a5 {[%clk 0:03:44.2]} 50. Kd6 {[%clk 0:04:01.9]} 50... a4 {[%clk 0:03:42.8]} 51. Ke6 {[%clk 0:04:01.4]} 51... a3 {[%clk 0:03:39.5]} 52. Kf6 {[%clk 0:04:01]} 52... Rh2 {[%clk 0:03:27.7]} 53. Kxg6 {[%clk 0:04:00.9]} 53... a2 {[%clk 0:03:26.8]} 54. Rh5 {[%clk 0:03:58.2]} 54... a1=Q {[%clk 0:03:22]} 55. Rg5+ {[%clk 0:03:57.6]} 55... Kf3 {[%clk 0:03:17.2]} 56. Kh5 {[%clk 0:03:57.2]} 56... Rg2 {[%clk 0:03:10.8]} 57. Rf5+ {[%clk 0:03:53.8]} 57... Kg3 {[%clk 0:03:05.4]} 58. Rg5+ {[%clk 0:03:50.6]} 58... Kh2 {[%clk 0:03:03.8]} 59. Kh4 {[%clk 0:03:43.8]} 59... Rxg5 {[%clk 0:02:58.5]} 60. Kxg5 {[%clk 0:03:42.6]} 60... Qa4 {[%clk 0:02:55.6]} 61. Kf5 {[%clk 0:03:41.4]} 61... Kg2 {[%clk 0:02:54.7]} 62. Kg5 {[%clk 0:03:40.5]} 62... h2 {[%clk 0:02:54.3]} 63. Kf5 {[%clk 0:03:39]} 63... h1=Q {[%clk 0:02:52.5]} 64. Kg5 {[%clk 0:03:38.7]} 64... Qhh4+ {[%clk 0:02:48]} 65. Kg6 {[%clk 0:03:37.3]} 65... Qa5 {[%clk 0:02:45.6]} 0-1\n',
    pgn_json: {},
    rated: true,
    rules: ChessRules.Chess,
    time_class: TimeClass.Rapid,
    time_control: '600',
    url: 'https://www.chess.com/game/live/12448586317',
    white: {
      rating: 661,
      result: GameResult.Resigned,
      '@id': 'https://api.chess.com/pub/player/n8rzz',
      username: 'n8rzz',
    },
  },
];

export const gameWithDailyTimeClass = {
  ...gameListForDate[0],
  time_class: TimeClass.Daily,
};

export const gameListWithMixedTimeClass = [...gameListForDate, gameWithDailyTimeClass];
